"use client";

import React from "react";
import { useScroll, motion, useTransform } from "framer-motion";

import FadeInWhenVisible from "@/src/components/FadeInWhenVisible";
import { isMobile } from "@/src/utils/helpers";
import styles from "./index.module.scss";

const Title = () => {
  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.7]);
  const translateX = useTransform(scrollYProgress, [0, 0.8], ["0%", "-30%"]);

  const style = { scale, translateX };

  return (
    <FadeInWhenVisible className={styles.sticky}>
      <motion.div
        id="title"
        className={styles.wrapper}
        style={!isMobile() ? style : {}}
      >
        <p>Hi, this is</p>
        <h1>Amir Sorayaei</h1>
        <h2>
          Frontend Developer at&nbsp;
          <a href="https://www.roomvu.com" target="blank">
            Roomvu
          </a>
        </h2>
      </motion.div>
    </FadeInWhenVisible>
  );
};

export default Title;
