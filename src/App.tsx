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

  const Item = (props: any) => {
    return <div class={styles.Item}>
      <div class={styles.ItemLabel}>
        {props.label}
      </div>
      <Show when={props.show}>
        <div class={styles.ItemValue}>
          <p>{props.value}</p>
        </div>
      </Show>
    </div>
  }

  return (
    <div class={styles.App}>
      <div class={styles.Narrow}>
        <Show when={card()} fallback={<div>Loading...</div>}>
          <Item label={card()!.item1Label} value={card()!.item1} show={true}/>
          <Item label={card()!.item2Label} value={card()!.item2} show={showAnswer()}/>
          <div class={styles.Answers}>
            <button class={styles.AnswerOpt}>⚙</button>
            <button class={styles.AnswerNo} disabled={!showAnswer()} onClick={answerYes}>✖︎</button>
            <button class={styles.AnswerYes} onClick={answerYes}>✔︎</button>
          </div>
        </Show>
      </div>
    </div>
  );
};

export default App;
