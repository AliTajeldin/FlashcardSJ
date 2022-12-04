export class Card {
  idx: number;
  item1: string;
  item2: string;
  level: number;

  constructor(
    idx: number,
    item1: string,
    item2: string,
    level: number
  ) {
    this.idx = idx
    this.item1 = item1
    this.item2 = item2
    this.level = level
  }

  markCorrect() {
    this.level = this.level + 1;
  }

  markIncorrect() {
    this.level = this.level / 2;
  }
}