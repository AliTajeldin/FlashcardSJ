import type { Component } from 'solid-js';

import styles from './App.module.css';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <div class={styles.Narrow}>
        <div class={styles.Item}>Spanish</div>
        <div class={styles.Item}>English</div>
        <div class={styles.Answer}>Yay/Nay</div>
        
      </div>
    </div>
  );
};

export default App;
