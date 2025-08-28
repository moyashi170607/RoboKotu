import dotenv from "dotenv";
import { finalizeEvent, SimplePool, type EventTemplate } from "nostr-tools";
import { hexToBytes } from "nostr-tools/utils";
import { SK_UA } from "./config.ts";


dotenv.config();

const pool = new SimplePool()

const RELAYS: string[] = [
    //"wss://relay.nostr.band",
    //"wss://nos.lol",
    //"wss://relay.damus.io",
    //"wss://nos.lol",
    "wss://yabu.me",
    "wss://r.kojira.io",
    //"wss://nrelay-jp.c-stellar.net",
    //"wss://nostr-relay.nokotaro.com",
    //"wss://relay.snort.social",
    "wss://kotukonostr.onrender.com",
    "wss://relay-jp.nostr.wirednet.jp/"
]

const CONTENT = "botのテスト投稿です。";

const EventTemp: EventTemplate = {
    content: CONTENT,
    created_at: Math.floor(Date.now() / 1000),
    kind: 1,
    tags: []
}

const signedEvent = finalizeEvent(EventTemp, SK_UA)

await Promise.any(pool.publish(RELAYS, signedEvent))

console.log(signedEvent)