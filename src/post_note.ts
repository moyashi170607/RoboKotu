//テスト投稿用のスクリプト

import { finalizeEvent, SimplePool, type EventTemplate } from "nostr-tools";
import { RELAYS, SK_UA } from "./config.ts";

const pool = new SimplePool()

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