import * as splToken from '@solana/spl-token'
import {PublicKey, Transaction} from '@solana/web3.js';
const TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL")

/**
 * @remarks 
 * A utility function to create the associative account
 * @param {*} connection // connection to the cluster
 * @param {*} payer // payer of the transaction, if any takes place
 * @param {*} mintPubKey // public key of the mint authority, with whom the associative accounts needs to be mapped
 * @param {*} ownerPubkey // owner public key, most of the time minPubkey will be same
 * @param {*} associatedTokenPubkey // the account which needs to be mapped/created as an associative account
 * @returns 
 */
export const createAssociateAccountFromMintKey = async (connection, payer, mintPubkey, ownerPubkey, associatedTokenPubkey) => {  
  
  if(!associatedTokenPubkey){
    /**
     * If no Associated account passed, then we need to create one.
     */
    associatedTokenPubkey = await findAssociatedTokenAddress(ownerPubkey, mintPubkey)
  }

  /**
   * Check if the user's wallet already has a associative account with the mintPubKey
   * 
   */
  const doesAccountExist = await connection.getAccountInfo(associatedTokenPubkey)

  /**
   * if doesAccountExist is false, that means there is no associative account exists yet for the wallet with the mintPubkey,
   * Hence an associative needs to be created by mapping it with mintPubkey, so that the custom SPL token can be transferred of the mintPubkey type
   * 
   * Once we map the associative account, then we will be able to transfer or mint the custom tokens on the associative account
   */
  if(!doesAccountExist){
    const transaction = new Transaction().add(
      splToken.Token.createAssociatedTokenAccountInstruction(
        SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        mintPubkey,
        associatedTokenPubkey,
        ownerPubkey,
        payer.publicKey
      )
    );
    transaction.feePayer = payer.publicKey;
    console.log('Getting recent blockhash');
    transaction.recentBlockhash = (
      await connection.getRecentBlockhash()
    ).blockhash;
    let signed = await payer.signTransaction(transaction);
    let signature = await connection.sendRawTransaction(signed.serialize());
    let confirmed = await connection.confirmTransaction(signature);
    
    return {status: true, signature: confirmed, associatedTokenPubkey};
  }else{
    return {status: true, associatedTokenPubkey}
  }

}


async function findAssociatedTokenAddress(
  walletAddress,
  tokenMintAddress
) {
    return (await PublicKey.findProgramAddress(
        [
            walletAddress.toBuffer(),
            TOKEN_PROGRAM_ID.toBuffer(),
            tokenMintAddress.toBuffer(),
        ],
        SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    ))[0];
}