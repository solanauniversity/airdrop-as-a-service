import { createAssociateAccountFromMintKey } from "./createAssociateAccountFromMintKey";
import { mintTokenToAssociatedAccount } from "./mintTokenToAssociatedAccount";


export const createAssociatedAccountFromMintKeyAndMint = async (connection, provider, mintPubkey, ownerPubkey, associatedTokenPubkey, tokensToMint, tokenDenomination) => {
    const result = await createAssociateAccountFromMintKey(connection, provider, mintPubkey, ownerPubkey, associatedTokenPubkey)

    if(!result.status){
        return { status: false, error:"Error in creating the associated account"}
    }

    const tokenMintingResult = await mintTokenToAssociatedAccount(provider,connection,tokensToMint,mintPubkey,result.associatedTokenPubkey,provider, tokenDenomination)
    if(!tokenMintingResult.signature){
        return {status: false, error: `Error in minting the associated account ${result.associatedTokenPubkey}`}
    }
    return {
        status: true,
        transactionSignature: tokenMintingResult.signature
    }
}
 