import { finalizeEvent, SimplePool, type VerifiedEvent } from "nostr-tools";
import { generateBadgeAwardEventTemplate, type BadgeAward } from "nostr-tools/nip58";
import { hexToBytes } from "nostr-tools/utils";
import dotenv from "dotenv";
import { PK_HEX, RELAYS, SK_UA } from "../config.ts";
import { replyToUser } from "../reply.ts";

dotenv.config();

const pool = new SimplePool()



export async function gacha(root_id: string, recipient: string): Promise<boolean> {
    let result: boolean;

    let random: number = Math.floor(Math.random() * 100);

    let sign: VerifiedEvent;

    if (random == 0) {
        result = true;
        await badgeAward("RoboKotuGacha_Win", recipient);
        sign = await replyToUser("大当たり！NIP-58に対応したクライアントでバッジを受け取ろう！", root_id, recipient);
    } else {
        result = false;
        await badgeAward("RoboKotuGacha_Lose", recipient);
        sign = await replyToUser("残念...。NIP-58に対応したクライアントでバッジを受け取ろう。", root_id, recipient);
    }

    console.log(sign)

    return result;
}

async function badgeAward(name: string, recipient: string) {
    const AwardJson = generateBadgeAwardEventTemplate({
        a: "30009:" + PK_HEX + ":" + name,
        p: [[recipient]]
    })

    const signedEvent = finalizeEvent(AwardJson, SK_UA);

    try {
        await Promise.any(pool.publish(RELAYS, signedEvent))
    } catch (err) {
        console.log("error:" + err);
    }
}
