import { Component, createEffect, createResource, createSignal, Show } from 'solid-js';

import styles from './App.module.css';
import { Card, CardMgr } from './cards';

const App: Component = () => {
  const [cardSet, setCardSet] = createSignal("sp-en");
  const [cardMgr] = createResource(cardSet, CardMgr.create);
  const [card, setCard] = createSignal<Card | null>(null);
  const [showAnswer, setShowAnswer] = createSignal(false);

  const loadNextCard = () => {
    if (cardMgr.state === 'ready') {
      setCard(cardMgr().getNextCard())
    }
  }

  createEffect(() => {
    console.log('Effect to init first card of set!');
    loadNextCard();
  });

  const answerYes = () => {
    if (showAnswer()) {
      loadNextCard();
    }
    setShowAnswer(!showAnswer());
  }

  return (
    <div class={styles.App}>
      <div class={styles.Narrow}>
        <Show when={card()} fallback={<div>Loading...</div>}>
          <div class={styles.Item}>{card()!.item1}</div>
          <div class={styles.Item}>{showAnswer() ? card()!.item2 : ""}</div>
          <div class={styles.Answers}>
            <button class={styles.AnswerNo} disabled={!showAnswer()} onClick={answerYes}>✖︎</button>
            <button class={styles.AnswerYes} onClick={answerYes}>✔︎</button>
          </div>
        </Show>
      </div>
    </div>
  );
};

export default App;
