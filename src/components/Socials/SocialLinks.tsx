import React from "react";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

import styles from "./Socials.module.scss";

const Socials = () => {
  const iconSize = 20;

  return (
    <div className={styles.socials}>
      <li>
        <a href="https://github.com/amirsorayaei" target="_blank">
          <FiGithub size={iconSize} />
        </a>
        <a href="https://www.linkedin.com/in/amir-sorayaei/" target="_blank">
          <FiLinkedin size={iconSize} />
        </a>
        <a href="https://twitter.com/amirsorayaei" target="_blank">
          <FiTwitter size={iconSize} />
        </a>
      </li>
    </div>
  );
};

export default Socials;
