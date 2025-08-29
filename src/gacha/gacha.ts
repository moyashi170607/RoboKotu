import { finalizeEvent, SimplePool, type VerifiedEvent } from "nostr-tools";
import { generateBadgeAwardEventTemplate } from "nostr-tools/nip58";
import { PK_HEX, RELAYS, SK_UA } from "../config.ts";
import { replyToUser } from "../reply.ts";


const pool = new SimplePool()

/**
 * ユーザーのガチャ（くじ引き）を実行します。
 * * この非同期関数は、1%の確率で当選するランダムな抽選を行います。
 * 結果に応じて、当選者には特定のバッジを授与し、返信メッセージを送信します。
 * ユーザーが当選した場合は `true`、落選した場合は `false` を返します。
 * * @param {string} root_id 返信の送信先となる元のイベントID。
 * @param {string} recipient ガチャに参加するユーザーの公開鍵。
 * @returns {Promise<boolean>} ユーザーが当選した場合は `true`、それ以外の場合は `false` に解決されるPromise。
 */
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

/**
 * 受信者にNostrバッジを授与します。
 * この関数は、NIP-58のバッジ授与イベントを作成し、署名し、リレーのリストに公開します。
 *
 * @param {string} name 授与するバッジの名前（例: "RoboKotuGacha_Win"）。
 * @param {string} recipient バッジを受け取るユーザーの公開鍵（pubkey）。
 * @returns {Promise<void>} バッジ授与イベントが公開されたときに解決されるPromise。エラーが発生した場合は拒否されます。
 */
async function badgeAward(name: string, recipient: string): Promise<void> {
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
