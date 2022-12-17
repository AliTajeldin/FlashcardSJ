import { Card } from "./card";
import { cardSetConfigById, loadCards } from "./cardset-config";

export class CardMgr {
  cardSetId: string;
  cards: Array<any>;
  config: typeof cardSetConfigById[string];

  private constructor(cardSetId: string, cards: Array<any>) {
    this.cardSetId = cardSetId;
    this.cards = cards;
    this.config = cardSetConfigById[cardSetId];
  }

  static async create(cardSetId: string) {
    console.log("Loading a new CardMgr!");
    
    // await new Promise(r => setTimeout(r, 300));

    const cards = (await loadCards(cardSetId)).default;    
    return new CardMgr(cardSetId, cards);
  }

  getNextCard(invert: boolean) : Card {
    
    const idx = Math.floor(Math.random() *  this.cards.length);
    const a = this.cards[idx].a;
    const b = this.cards[idx].b;
    // clean this up so it uses the cardset config instead of hardcoding / duplicating!
    if (invert) {
      return { idx, item1Label: this.config.bLabel, item1:b, item2Label:this.config.aLabel, item2:a, level:0};
    }
    return { idx, item1Label:this.config.aLabel, item1:a, item2Label: this.config.bLabel, item2:b, level:0};
  }

  markCorrect(card: Card) {
  }

  markIncorrect(card: Card) {
  }
}
