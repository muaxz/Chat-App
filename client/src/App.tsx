import React from 'react';
import logo from './logo.svg';
import styles from "./app.module.css"
import LeftSide from "./components/leftSide/leftSide"
import MiddleSide from "./components/middleSide/middleSide"
import RightSide from "./components/rightSide/rightSide"

function App() {
  return (
    <div className={styles.outerdiv}>
      <div className={styles.innerdiv}>
          <LeftSide></LeftSide>
          <MiddleSide></MiddleSide>
          <RightSide></RightSide>
      </div>
    </div>
  );
}

export default App;
