import React from "react";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

import styles from "./index.module.scss";

interface Props {
  orientation: "left" | "right";
}

const Sidebar = ({ orientation }: Props) => {
  const left = orientation === "left" ? "20px" : "auto";
  const right = orientation === "right" ? "20px" : "auto";

  const iconSize = 20;

  return (
    <div style={{ left, right }} className={styles.container}>
      {orientation === "right" ? (
        <a href="mailto:amir.s1377@gmail.com" className={styles.text}>
          amir.s1377@gmail.com
        </a>
      ) : (
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
      )}
    </div>
  );
};

export default Sidebar;
