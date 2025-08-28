import { finalizeEvent, SimplePool, type EventTemplate, type VerifiedEvent } from "nostr-tools";
import { RELAYS, SK_UA } from "./config.ts";

const pool = new SimplePool()

export async function replyToUser(content: string, root_id: string, recipient: string): Promise<VerifiedEvent> {
    const reply: EventTemplate = {
        content: content,
        created_at: Math.floor(Date.now() / 1000),
        kind: 1,
        tags: [
            ["e", root_id, "", "root"],
            ["p", recipient]
        ]
    }

    const signedEvent = finalizeEvent(reply, SK_UA)
    try {
        await Promise.any(pool.publish(RELAYS, signedEvent))
        console.log(signedEvent)
    } catch (err) {
        console.log("error")
    }

    return signedEvent;
}

