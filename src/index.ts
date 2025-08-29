import { finalizeEvent, generateSecretKey, getPublicKey, type VerifiedEvent } from 'nostr-tools/pure'
import { SimplePool } from 'nostr-tools/pool'
import { PK_HEX, RELAYS, SK_UA } from "./config.ts";
import { gacha } from "./gacha/gacha.ts";
import { replyToUser } from "./reply.ts";

const pool = new SimplePool()

//botが投稿を取得する
const sub = pool.subscribe(
    RELAYS,
    {
        kinds: [1], // テキスト投稿
        limit: 0,  // 古い投稿を10件取得
        "#p": [PK_HEX] //自分がメンションされているものを取得
    },
    {
        // 新しいイベントが届くたびに実行
        async onevent(event) {
            if (!event.tags.some(tag => tag[0] === 'e')){
                if(event.content.includes("ガチャ")){
                    //ガチャを実行
                    await gacha(event.id,event.pubkey);
                }else{
                    //何にも該当しないもの
                    const sign:VerifiedEvent = await replyToUser("こんにちは！",event.id,event.pubkey)
                    console.log(sign);
                }
                
            }
        },
        // リレーが既存のイベントをすべて送信し終えたときに実行
        oneose() {
            console.log('End of stored events.');
            // 購読を終了したい場合はここで sub.close() を呼び出す
            // sub.close();
        },
    }
);

// let's query for more than one event that exists
// const event = await pool.querySync(
//     RELAYS,
//     {
//         kinds: [1],
//         limit: 3,
//         "#p": ["e5d2f335b34aa39e6127ccec96caadceef0db56f431e2ac2f7dc53be8ddd7d64"]
//     },
// )
// if (event) {
//     console.log('profile:', event)
    
// }

// let's query for more than one event that exists
// const events = await pool.querySync(
//     RELAYS,
//     {
//         kinds: [1],
//         limit: 10
//     },
// )
// if (events) {
//     console.log('it exists indeed on this relay:', events)
// }
