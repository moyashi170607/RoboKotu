import { finalizeEvent, SimplePool, type EventTemplate } from "nostr-tools";
import { generateBadgeDefinitionEventTemplate, type BadgeDefinition } from "nostr-tools/nip58"
import { RELAYS, SK_UA } from "../config.ts";

const pool = new SimplePool();

/*
{
  content: '',
  created_at: 1756371008,
  kind: 30009,
  tags: [
    [ 'd', 'RoboKotuGacha_Win' ],
    [ 'name', 'ロボコツガチャ 大当たり' ],
    [ 'description', 'ロボコツガチャ　大当たり獲得者を称えるバッジ' ],
    [
      'image',
      'https://cdn.nostrcheck.me/908aecabefa8964640cc868d00d0b1d92fbe7436599f0b3749de37f62215c8eb/1e13dfe7e5958976b9bd35ccd3b1f4f430575bd4abdbbee0cdee161f5befa3b5.webp',
      '1024x1024'
    ]
  ],
  pubkey: 'e5d2f335b34aa39e6127ccec96caadceef0db56f431e2ac2f7dc53be8ddd7d64',
  id: '80484266188eca786ec2fef8af76939e06012b86ddac0fe8da43c4179a397b13',
  sig: 'd94d20e9549978c30baaff1dafe571d5d30f9f9d04c0b3a1d91421f3050cd333a2382be83ec40176783200eecee4fea43addbb96c0e44257afc6d66ad5e21e75',
  [Symbol(verified)]: true
}
 */

const WIN_BADGE: BadgeDefinition = {
  d: "RoboKotuGacha_Win",
  name: "ロボコツガチャ 大当たり",
  description: "ロボコツガチャ　大当たり獲得者を称えるバッジ",
  image: ["https://cdn.nostrcheck.me/908aecabefa8964640cc868d00d0b1d92fbe7436599f0b3749de37f62215c8eb/1e13dfe7e5958976b9bd35ccd3b1f4f430575bd4abdbbee0cdee161f5befa3b5.webp", "1024x1024"],
}


/*
{
  content: '',
  created_at: 1756371008,
  kind: 30009,
  tags: [
    [ 'd', 'RoboKotuGacha_Lose' ],
    [ 'name', 'ロボコツガチャ ナイストライ' ],
    [ 'description', 'ロボコツガチャに挑戦したものを称えるバッジ' ],
    [
      'image',
      'https://cdn.nostrcheck.me/908aecabefa8964640cc868d00d0b1d92fbe7436599f0b3749de37f62215c8eb/e1c6956718f41f649b4a7f26c7c8d24d8f5ef6dca66dce85a5c78c2d99b43a98.webp',
      '1024x1024'
    ]
  ],
  pubkey: 'e5d2f335b34aa39e6127ccec96caadceef0db56f431e2ac2f7dc53be8ddd7d64',
  id: '55718476d58fa45d504b9f5b0eedd0eaa93019e7992e3039b9478beff6934e83',
  sig: '252d7370281e6cfbcac2cd377e88b127503043d3c3b82ce5d875ac87c1bade69b39eee355369312fa1c24501d17b402e50d530533ebb326ddbf7c4044ab9e121',
  [Symbol(verified)]: true
}
 */

const LOSE_BADGE: BadgeDefinition = {
  d: "RoboKotuGacha_Lose",
  name: "ロボコツガチャ ナイストライ",
  description: "ロボコツガチャに挑戦したものを称えるバッジ",
  image: ["https://cdn.nostrcheck.me/908aecabefa8964640cc868d00d0b1d92fbe7436599f0b3749de37f62215c8eb/e1c6956718f41f649b4a7f26c7c8d24d8f5ef6dca66dce85a5c78c2d99b43a98.webp", "1024x1024"]
}

async function defineGachaBadge(temlate: BadgeDefinition) {
  const BadgeJson: EventTemplate = generateBadgeDefinitionEventTemplate(temlate);
  const signedEvent = finalizeEvent(BadgeJson, SK_UA);

  try {
    await Promise.any(pool.publish(RELAYS, signedEvent))
    console.log(signedEvent)
  } catch (err) {
    console.log("error")
  }

}

defineGachaBadge(WIN_BADGE);
defineGachaBadge(LOSE_BADGE);
