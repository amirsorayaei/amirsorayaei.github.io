import React from "react";

import styles from "./Socials.module.scss";

const Emails = () => {
  return (
    <div className={styles.socials}>
      <a
        href="mailto:amir.s1377@gmail.com"
        style={{ writingMode: "vertical-rl" }}
      >
        {"amir.s1377@gmail.com"}
      </a>
    </div>
  );
};

export default Emails;
