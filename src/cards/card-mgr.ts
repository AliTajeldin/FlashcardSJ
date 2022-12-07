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

  getNextCard(invert: boolean) {
    count = count + 1;
    const idx = count % this.cards.length;
    // clean this up so it uses the cardset config instead of hardcoding / duplicating!
    if (invert) {
      return new Card(idx, "English", this.cards[idx].en, "Espanol", this.cards[idx].sp, 0);
    }
    return new Card(idx, "Espanol", this.cards[idx].sp, "English", this.cards[idx].en, 0);
  }
}
