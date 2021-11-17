import { TransactionInstruction, Transaction } from "@solana/web3.js";
import * as BufferLayout from 'buffer-layout';
import { TOKEN_PROGRAM_ID } from "./programIds";

const LAYOUT = BufferLayout.union(BufferLayout.u8('instruction'));
LAYOUT.addVariant(
  7,
  BufferLayout.struct([BufferLayout.nu64('amount')]),
  'mintTo',
);

/**
 * @why : This function will enable you to mint new tokens to user's associated account
 * 
 * @Remarks: mintTokenToAssociatedAccount 
 * A utility which can mint new custom SPL token to the existing associative token account, 
 * which will directly increase the total supply of the custom SPL token.
 * @param {*} wallet //wallet provider, to sign the transaction in case mintOwner is not same as wallet provider
 * @param {*} connection //connection instance to the Solana Cluster
 * @param {*} tokensToMint //Number of custom SPL tokens to mint
 * @param {*} mintPubkey //Mint's public Key i.e custom SPL token's public key which was created by new createNewMintAuthority process.
 * @param {*} associatedAccountPubkey //Public key of the account mapped to Mint's public key which was created by the user or SPL token mint authority.
 * @param {*} mintOwner  //mintOwner is the mint authority of the mint i.e. custom token, mostly it will be same as wallet provider who is going to make the transaction.
 * @returns 
 *  {status: false, error:message } //in case of any failure
 *  {status: true, signature} //in case of transaction success
 * 
 */
export const mintTokenToAssociatedAccount = async (wallet, connection, tokensToMint, mintPubkey, associatedAccountPubkey, mintOwner, tokenDenomination) =>{

    if(!tokensToMint){
        return {status: false, error:"You can't mint 0 tokens"}
    }
    //tokenDenomination -> default is 9 ie. 1000000000
    const tokensToMintInLamports = tokensToMint * tokenDenomination;
    const signature = await mintToken({
        connection,
        owner: wallet,
        mintOwner,
        amount: tokensToMintInLamports,
        mintPubkey,
        associatedAccountPubkey
      })
      
    console.log("Waiting for the signature confirmation")
    await connection.confirmTransaction(signature);
    console.log("Signature confirmed")
    return {signature};
}

async function signAndSendTransaction(
  connection,
  transaction,
  wallet,
  signers,
  skipPreflight = false,
) {
  transaction.recentBlockhash = (
    await connection.getRecentBlockhash('max')
  ).blockhash; // As solana works on proof of history, hence every transaction in the solana blockchain requires the latest blockhash to be associated
              // Without the getRecentBlockhash, the validators will not be able to verify the transaction
  transaction.setSigners(
    // fee payed by the wallet owner
    wallet.publicKey,
    ...signers.map((s) => s.publicKey), // we will add all the intermediate signers required for the transaction, in our case mint keypair is also required.
                                        // Hence we have added the mint signer from the signers array.
  );


  transaction = await wallet.signTransaction(transaction);
  const rawTransaction = transaction.serialize();  //Serialization is the process of converting an object into a stream of bytes, 
                                                  //which can be used by on-chain programs to again de-serialize it to read the instructions 
                                                  //and perform actions on it.
  return await connection.sendRawTransaction(rawTransaction, {
    skipPreflight,  //preflight transaction check checks for the available methods before sending the transaction, which involves a very little latency
    //that is why skipPreflight is generally kept false, to save the network bandwidth. 
    preflightCommitment: 'single', 
    //For preflight checks and transaction processing, 
    //Solana nodes choose which bank state to query based on a commitment requirement set by the client. 
    //The commitment describes how finalized a block is at that point in time. When querying the ledger state, 
    //it's recommended to use lower levels of commitment to report progress and higher levels to ensure the state will not be rolled back.
    //For processing many dependent transactions in series, it's recommended to use "confirmed" commitment, 
    //which balances speed with rollback safety. For total safety, it's recommended to use"finalized" commitment.
  });
}

async function mintToken({
    connection,
    owner,
    mintOwner, // Account to hold token information
    amount, // Number of tokens to issue
    mintPubkey,
    associatedAccountPubkey, // Account to hold newly issued tokens, if amount > 0
  }) {
    let transaction = new Transaction();
    let signers = [mintOwner];
      transaction.add(
        mintTo({
  
          //when sending for the first time where mint is derived for the first time
          mintPubkey,
  
          //when sending for the first time where initialAccount is derived for the first time to receive the newly created SPL token
          destination: associatedAccountPubkey,
          amount,
          mintAuthorityPubkey: owner.publicKey,
        }),
      );
  
    return  await signAndSendTransaction(connection, transaction, mintOwner, signers);
  }

  

  function mintTo({ mintPubkey, destination, amount, mintAuthorityPubkey }) {
    let keys = [
      { pubkey: mintPubkey, isSigner: false, isWritable: true },
      { pubkey: destination, isSigner: false, isWritable: true },
      { pubkey: mintAuthorityPubkey, isSigner: true, isWritable: false },
    ];
    return new TransactionInstruction({
      keys,
      data: encodeTokenInstructionData({
        mintTo: {
          amount,
        },
      }),
      programId: TOKEN_PROGRAM_ID,
    });
  }

  const instructionMaxSpan = Math.max(
    ...Object.values(LAYOUT.registry).map((r) => r.span),
  );
  
  function encodeTokenInstructionData(instruction) {
    let b = Buffer.alloc(instructionMaxSpan);
    let span = LAYOUT.encode(instruction, b);
    return b.slice(0, span);
  }