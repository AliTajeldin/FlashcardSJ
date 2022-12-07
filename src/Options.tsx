import { Component, createEffect, createResource, createSignal, Show } from 'solid-js';

import styles from './Options.module.css';

export interface OptionsT {
  clickOnce: boolean,
  invert: boolean,
}

const [opts, setOpts] = createSignal<OptionsT>({
  clickOnce: true,
  invert: false,
});

export { opts as appOptions };

export const Options: Component<{ onExit: () => void }> = (props) => {
  const { onExit } = props;

  const updateOption = (optName: string, optValue: boolean) => {
    setOpts((prevOpts) => {
      return { ...prevOpts, [optName]: optValue };
    })
  };

  const BoolOption: Component<{ name: keyof OptionsT, label: string }> = (props) => {
    const { name, label } = props;
    return (
      <div class={styles.Option}>
        <input type="checkbox" id={name} name={name}
          checked={opts()[name]} onChange={(e) => updateOption(name, e.currentTarget.checked)} />
        <label for={name}>{label}</label>
      </div>
    )
  }

  return (
    <>
      {/* <div class={styles.Overlay}></div> */}
      <div class={styles.OptionsModal}>
        <div class={styles.Header}>
          <div><button class={styles.Exit} onClick={() => (onExit?.())}>X</button>
          </div>
          <div class={styles.Title}>Options</div>
        </div>

        <hr style="width: 100%"></hr>

        <div class={styles.OptionsArea}>
          <BoolOption name="clickOnce" label="1-click Q/A" />
          <BoolOption name="invert" label="invert Q/A" />
        </div>
      </div>
    </>
  );
}