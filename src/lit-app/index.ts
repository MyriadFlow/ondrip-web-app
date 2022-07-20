import { ethers } from "ethers";
import LitJsSdk from "lit-js-sdk";
import { OnDripMarketPlace__factory, OnDripNFT__factory } from "../contracts";
import { getAccessControlConditions } from "./access-control";
import { chain } from "./config"
type SmartContractCreds = {
    excryptedKey: string, //hex
    excrypedtedData: string //hex
}

export async function litEncrypt(tokenId: number, username: string, password: string): Promise<string> {
    const litClient = new LitJsSdk.LitNodeClient()
    await litClient.connect()
    const accessControlConditions = getAccessControlConditions(tokenId)
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
        accessControlConditions,
        symmetricKey,
        authSig,
        chain,
    });

    const encryptedSymmetricKeyHex = Buffer.from(encryptedSymmetricKey).toString("hex")

    const litEncryptedPayload: SmartContractCreds = {
        excrypedtedData: encryptedStringAsHex,
        excryptedKey: encryptedSymmetricKeyHex
    }

    return JSON.stringify(litEncryptedPayload)
}