import { Component, createSignal } from 'solid-js';

import styles from './App.module.css';
import { Card, CardMgr } from './cards';

const App: Component = () => {
  const cardMgr = new CardMgr();
  const [ card, setCard ] = createSignal<Card>(cardMgr.getNextCard());

  const nextCard = () => {
    setCard(cardMgr.getNextCard())
  }
  return (
    <div class={styles.App}>
      <div class={styles.Narrow}>
        <div class={styles.Item}>{card().item1}</div>
        <div class={styles.Item}>{card().item2}</div>
        <div class={styles.Answer}>
          <button onClick={nextCard}>Button</button>
        </div>
        
      </div>
    </div>
  );
};

export default App;
