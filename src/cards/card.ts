export class Card {
  idx: number;
  item1Label: string;
  item1: string;
  item2Label: string;
  item2: string;
  level: number;

  constructor(
    idx: number,
    item1Label: string,
    item1: string,
    item2Label: string,
    item2: string,
    level: number
  ) {
    this.idx = idx
    this.item1Label = item1Label
    this.item1 = item1
    this.item2Label = item2Label
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