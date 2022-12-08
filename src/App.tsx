import { Component, createEffect, createResource, createSignal, Show, on, For } from 'solid-js';

import styles from './App.module.css';
import { Card } from './cards/card';
import { CardMgr } from './cards/card-mgr';
import { cardSetConfigs } from './cards/cardset-config';
import { Options, appOptions } from './Options';

const App: Component = () => {
  const [cardSetId, setCardSetId] = createSignal(cardSetConfigs[0].id);
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
  createEffect(on(cardMgr, (cm) => { loadNextCard() }));

  // Always show answers if click-one option is set.
  createEffect(on(appOptions, (opts) => opts.clickOnce && setShowAnswer(true)));

  const answerYes = () => {
    showAnswer() && loadNextCard();
    appOptions().clickOnce || setShowAnswer(!showAnswer());
  }

  const Item = (props: any) => {
    return <div class={styles.Item}>
      <div class={styles.ItemLabel}>
        {props.label} - {props.idx}
      </div>
      <Show when={props.show}>
        <div class={styles.ItemValue}>
          <p>{props.value}</p>
        </div>
      </Show>
    </div>
  }

  const handleCardSetChange = (newCardSetId: string) => {
    setCard(null);
    setCardSetId(newCardSetId);
  }

  const Header: Component = () => {
    return (
      <div class={styles.Header}>
        <select name="cardset" id="cardset" class={styles.CardSetSelect} onChange={(e) => handleCardSetChange(e.currentTarget.value)}>
          <For each={cardSetConfigs}>
            {(config) => <option value={config.id} selected={config.id === cardSetId()}>{config.title}</option> }
          </For>
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
            <Item label={c.item1Label} value={c.item1} idx={c.idx} show={true} />
            <Item label={c.item2Label} value={c.item2} idx={c.idx} show={showAnswer()} />
            <Footer />
            <OptionsModal />
          </>)}
        </Show>
      </div>
    </div>
  );
};

export default App;
