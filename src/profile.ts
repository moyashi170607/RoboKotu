import { finalizeEvent, SimplePool, type EventTemplate } from "nostr-tools";
import { RELAYS, SK_UA } from "./config.ts";

const pool = new SimplePool()

//kind0のcontentに入るJSON
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