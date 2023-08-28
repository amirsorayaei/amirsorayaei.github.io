import React from "react";

import styles from "./index.module.scss";
import Emails from "../Socials/Emails";
import Socials from "../Socials/SocialLinks";
import FadeInWhenVisible from "../FadeInWhenVisible";

interface Props {
  orientation: "left" | "right";
}

const Sidebar = ({ orientation }: Props) => {
  const left = orientation === "left" ? "20px" : "auto";
  const right = orientation === "right" ? "20px" : "auto";

  return (
    <FadeInWhenVisible initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ left, right }} className={styles.container}>
        {orientation === "right" ? <Emails /> : <Socials />}
      </div>
    </FadeInWhenVisible>
  );
};

export default Sidebar;
