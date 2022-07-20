import { ethers } from "ethers";
import LitJsSdk from "lit-js-sdk";
import { OnDripMarketPlace__factory, OnDripNFT__factory } from "../contracts";
import { getAccessControlConditions } from "./access-control";
import { chain } from "./config"
type LitEncryptedPayload = {
    excryptedKey: string,
    excrypedtedData: string
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

    const encryptedSymmetricKey = await litClient.saveEncryptionKey({
        accessControlConditions,
        symmetricKey,
        authSig,
        chain: "ethereum",
    });

    const litEncryptedPayload: LitEncryptedPayload = {
        excrypedtedData: encryptedString,
        excryptedKey: encryptedSymmetricKey
    }

    return JSON.stringify(litEncryptedPayload)
}