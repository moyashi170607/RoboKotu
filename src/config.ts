import { hexToBytes } from "nostr-tools/utils";
import dotenv from "dotenv"

dotenv.config();

//取得、投稿に用いるリレー一覧
export const RELAYS: string[] = [
    //"wss://relay.nostr.band",
    //"wss://nos.lol",
    //"wss://relay.damus.io",
    "wss://yabu.me",
    "wss://r.kojira.io",
    //"wss://nrelay-jp.c-stellar.net",
    "wss://nostr-relay.nokotaro.com",
    //"wss://relay.snort.social",
    "wss://kotukonostr.onrender.com",
    "wss://relay-jp.nostr.wirednet.jp/"
]

//秘密鍵を環境変数から取得
if (!process.env.SEC_KEY) {
    throw new Error("SEC_KEY environment variable is not defined");
}
export const SK_UA: Uint8Array<ArrayBufferLike> = hexToBytes(process.env.SEC_KEY);

//公開鍵(HEX形式)を環境変数から取得
if (!process.env.PUB_KEY) {
    throw new Error("SEC_KEY environment variable is not defined");
}
export const PK_HEX: string = process.env.PUB_KEY