import { Card } from "./card";
// import fooCSV from "@/assets/foo.csv";

let count = 0;

export class CardMgr {
  cards: Array<any>;

  private constructor(cards: Array<any>) {
    this.cards = cards;
  }

  static async create(cardSet: string) {
    // await new Promise(r => setTimeout(r, 500));

    // @ts-ignore
    const cards = (await import('@/assets/sp-en.csv')).default;    
    return new CardMgr(cards);
  }

  getNextCard() {
    count = count + 1;
    const idx = count % this.cards.length;
    return new Card(idx, "Espanol", this.cards[idx].sp, "English", this.cards[idx].en, 0);
  }
}
