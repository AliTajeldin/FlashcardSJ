import { Card } from "./card";
import { loadCards } from "./cardset-config";

let count = 0;

export class CardMgr {
  cardSetId: string;
  cards: Array<any>;

  private constructor(cardSetId: string, cards: Array<any>) {
    this.cardSetId = cardSetId;
    this.cards = cards;
  }

  static async create(cardSetId: string) {
    console.log("Loading a new CardMgr!");
    
    // await new Promise(r => setTimeout(r, 300));

    const cards = (await loadCards(cardSetId)).default;    
    return new CardMgr(cardSetId, cards);
  }

  getNextCard(invert: boolean) : Card {
    count = count + 1;
    const idx = count % this.cards.length;
    const a = this.cards[idx].a;
    const b = this.cards[idx].b;
    // clean this up so it uses the cardset config instead of hardcoding / duplicating!
    if (invert) {
      return { idx, item1Label: "English", item1:b, item2Label:"Espanol", item2:a, level:0};
    }
    return { idx, item2Label: "English", item2:b, item1Label:"Espanol", item1:a, level:0};
  }

  markCorrect(card: Card) {
  }

  markIncorrect(card: Card) {
  }
}
