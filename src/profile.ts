import { finalizeEvent, SimplePool, type EventTemplate } from "nostr-tools";
import { SK_UA } from "./config.ts";

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


const ProfileJson = {
    picture: "https://cdn.nostrcheck.me/908aecabefa8964640cc868d00d0b1d92fbe7436599f0b3749de37f62215c8eb/a23943c0a643a563bdc9080b305bce123b180ab8aa927d4c8ec8da1d52f068c0.webp",
    banner: "",
    name: "RoboKotu",
    display_name: "ロボコツ",
    about: "KotukoHumibanaが作成したbotです。",
    bot: true
}

const EventTemp: EventTemplate = {
    content: JSON.stringify(ProfileJson),
    created_at: Math.floor(Date.now() / 1000),
    kind: 0,
    tags: []
}

const signedEvent = finalizeEvent(EventTemp, SK_UA)

await Promise.any(pool.publish(RELAYS, signedEvent))

console.log(signedEvent)