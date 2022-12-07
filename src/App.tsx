import { Component, createEffect, createResource, createSignal, Show, on } from 'solid-js';

import styles from './App.module.css';
import { Card, CardMgr } from './cards';
import { Options, appOptions } from './Options';

const App: Component = () => {
  const [cardSet, setCardSet] = createSignal("sp-en");
  const [cardMgr] = createResource(cardSet, CardMgr.create);
  const [card, setCard] = createSignal<Card | null>(null);
  const [showAnswer, setShowAnswer] = createSignal(false);
  const [showOptions, setShowOptions] = createSignal(false);

  const loadNextCard = () => {
    if (cardMgr.state === 'ready') {
      setCard(cardMgr().getNextCard(appOptions().invert))
    }
  }

  // loads a new card when card manager changes or becomes ready.
  createEffect(on(cardMgr, (cm) => loadNextCard()));

  // Always show answers if click-one option is set.
  createEffect(on(appOptions, (opts) => opts.clickOnce && setShowAnswer(true)));

  const answerYes = () => {
    showAnswer() && loadNextCard();
    appOptions().clickOnce || setShowAnswer(!showAnswer());
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
          <Item label={card()!.item1Label} value={card()!.item1} show={true} />
          <Item label={card()!.item2Label} value={card()!.item2} show={showAnswer()} />
          <div class={styles.Answers}>
            <button class={styles.AnswerOpt} onClick={() => setShowOptions(!showOptions())}>⚙</button>
            <button class={styles.AnswerNo} disabled={!showAnswer()} onClick={answerYes}>✖︎</button>
            <button class={styles.AnswerYes} onClick={answerYes}>✔︎</button>
          </div>
          <Show when={showOptions()}>
            <Options onExit={() => setShowOptions(false)} />
          </Show>
        </Show>
      </div>
    </div>
  );
};

export default App;
