import React from "react";

import styles from "./index.module.scss";

const Main = () => {
  return (
    <main>
      <div className={styles.main}>
        <p>Hi, this is</p>
        <h1>Amir Sorayaei</h1>
        <h2>
          Frontend Developer at&nbsp;
          <a href="https://www.roomvu.com" target="blank">
            Roomvu
          </a>
        </h2>
      </div>
    </main>
  );
};

export default Main;
