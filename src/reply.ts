import { finalizeEvent, SimplePool, type EventTemplate, type VerifiedEvent } from "nostr-tools";
import { RELAYS, SK_UA } from "./config.ts";

const pool = new SimplePool()

/**
 * ユーザーに返信イベントを送信します。
 * この関数は、指定されたコンテンツ、元のイベントID、および受信者の公開鍵を使用して、Nostrの返信イベントを作成します。
 * イベントに署名し、定義済みのリレーのリストに公開します。
 * 公開後、署名されたイベントを返します。
 *
 * @param {string} content 返信イベントのテキストコンテンツ。
 * @param {string} root_id 返信の対象となる元のイベントID。
 * @param {string} recipient 返信イベントの宛先となるユーザーの公開鍵。
 * @returns {Promise<VerifiedEvent>} 公開後に署名されたイベント。
 */
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

