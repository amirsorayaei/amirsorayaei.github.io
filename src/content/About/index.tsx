import React from "react";

import FadeInWhenVisible from "@/src/components/FadeInWhenVisible";
import styles from "./index.module.scss";

const About = () => {
  return (
    <FadeInWhenVisible>
      <div id="about" className={styles.wrapper}>
        <p>
          {`An experienced React developer with 4+ years of industrial experience in developing and maintaining web applications and dashboard panels. I’ve worked on various platforms and have successfully delivered products with 50k active users. My expertise lies in creating user-friendly, responsive and interactive web applications using React JS. I’m also well-versed in debugging, troubleshooting and optimizing the performance of the applications.`}
        </p>
      </div>
    </FadeInWhenVisible>
  );
};

export default About;
