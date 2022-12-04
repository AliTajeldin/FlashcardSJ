import { Card } from "./card";

let count = 0;

export class CardMgr {
  getNextCard() {
    count = count + 1;
    return new Card(count, `spanish ${count}`, `english ${count}`, 0);
  }
}