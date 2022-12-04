import { Component, createSignal } from 'solid-js';

import styles from './App.module.css';
import { Card, CardMgr } from './cards';

//  ✓ ✔︎ ✕ ✖︎ 

const App: Component = () => {
  const cardMgr = new CardMgr();
  const [ card, setCard ] = createSignal<Card>(cardMgr.getNextCard());
  const [ showAnswer, setShowAnswer ] = createSignal(false);

  const answerYes = () => {
    if (showAnswer()) {
      setCard(cardMgr.getNextCard())
    }
    setShowAnswer(!showAnswer());
  }

  return (
    <div class={styles.App}>
      <div class={styles.Narrow}>
        <div class={styles.Item}>{card().item1}</div>
        <div class={styles.Item}>{showAnswer() ? card().item2 : ""}</div>
        <div class={styles.Answers}>
          <button class={styles.AnswerNo} disabled={!showAnswer()} onClick={answerYes}>✖︎</button>
          <button class={styles.AnswerYes} onClick={answerYes}>✔︎</button>
        </div>
        
      </div>
    </div>
  );
};

export default App;
