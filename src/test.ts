import { SimplePool } from "nostr-tools";
import { RELAYS } from "./config.ts";

let pool = new SimplePool()

const sub = pool.subscribe(
    RELAYS,
    {
        kinds: [30009], // テキスト投稿
        limit: 10,  // 古い投稿を10件取得
    },
    {
        // 新しいイベントが届くたびに実行
        async onevent(event) {
            console.log(event);
        },
        // リレーが既存のイベントをすべて送信し終えたときに実行
        oneose() {
            console.log('End of stored events.');
            // 購読を終了したい場合はここで sub.close() を呼び出す
            // sub.close();
        },
    }
);