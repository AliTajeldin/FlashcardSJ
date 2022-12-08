import { Component, createEffect, createResource, createSignal, Show, on } from 'solid-js';

import styles from './App.module.css';
import { Card } from './cards/card';
import { CardMgr } from './cards/card-mgr';
import { cardSetConfigs } from './cards/cardset-config';
import { Options, appOptions } from './Options';

const App: Component = () => {
  const [cardSetId, setCardSetId] = createSignal("sp-en");
  const [cardMgr] = createResource(cardSetId, CardMgr.create);
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

  const Header: Component = () => {
    return (
      <div class={styles.Header}>
        <select name="cardset" id="cardset" class={styles.CardSetSelect}>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="opel">Opel</option>
          <option value="audi">Audi</option>
        </select>
      </div>
    );
  }

  const Footer: Component = () => {
    return (
      <div class={styles.Answers}>
        <button class={styles.AnswerOpt} onClick={() => setShowOptions(!showOptions())}>⚙</button>
        <button class={styles.AnswerNo} disabled={!showAnswer()} onClick={answerYes}>✖︎</button>
        <button class={styles.AnswerYes} onClick={answerYes}>✔︎</button>
      </div>
    );
  }

  const OptionsModal: Component = () => {
    return (
      <Show when={showOptions()}>
        <Options onExit={() => setShowOptions(false)} />
      </Show>
    );
  }

  return (
    <div class={styles.App}>
      <div class={styles.Narrow}>
        <Show when={card()} fallback={<div>Loading...</div>} keyed>
          {(c: Card) => (<>
            <Header />
            <Item label={c.item1Label} value={c.item1} show={true} />
            <Item label={c.item2Label} value={c.item2} show={showAnswer()} />
            <Footer />
            <OptionsModal />
          </>)}
        </Show>
      </div>
    </div>
  );
};

export default App;
