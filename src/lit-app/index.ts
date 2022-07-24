import LitJsSdk from "lit-js-sdk";
import { getEvmContractConditions } from "./access-control";
import { chain } from "../env"
type SmartContractCreds = {
    encryptedKey: string, //hex
    encrypedtedData: string //hex
}

export async function litEncrypt(tokenId: string, username: string, password: string): Promise<string> {
    const litClient = new LitJsSdk.LitNodeClient()
    await litClient.connect()
    const evmContractConditions = getEvmContractConditions(tokenId)
    const authSig = await LitJsSdk.checkAndSignAuthMessage({
        chain,
    });

    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
        JSON.stringify({
            username,
            password,
        })
    );
    let encryptedStringAsArrayBuffer = await (encryptedString as Blob).arrayBuffer()
    let encryptedStringAsHex = Buffer.from(encryptedStringAsArrayBuffer).toString("hex")
    const encryptedSymmetricKey = await litClient.saveEncryptionKey({
        evmContractConditions,
        symmetricKey,
        authSig,
        chain,
    });

    const encryptedSymmetricKeyHex = Buffer.from(encryptedSymmetricKey).toString("hex")

    const litEncryptedPayload: SmartContractCreds = {
        encrypedtedData: encryptedStringAsHex,
        encryptedKey: encryptedSymmetricKeyHex
    }

    return JSON.stringify(litEncryptedPayload)
}