import { Card } from "./card";
// import fooCSV from "@/assets/foo.csv";

let count = 0;

export class CardMgr {
  cards: Array<any>;

  private constructor(cards: Array<any>) {
    this.cards = cards;
  }

  static async create(cardSet: string) {
    console.log('CardMgrFactory:', cardSet);

    // await new Promise(r => setTimeout(r, 200));

    // @ts-ignore
    // const cards = (await import('./sp-en.csv')).default;
    const cards = (await import('@/assets/sp-en.csv')).default;
    console.log("cards", cards);
    // console.log("fooCSV: ", fooCSV);
    
    return new CardMgr(cards);
  }

  getNextCard() {
    count = count + 1;
    const idx = count % this.cards.length;
    return new Card(idx, this.cards[idx].sp, this.cards[idx].en, 0);
  }
}
