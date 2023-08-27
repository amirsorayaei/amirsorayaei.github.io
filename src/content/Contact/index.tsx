"use client";

import React, { useState } from "react";

import styles from "./index.module.scss";

const Contact = () => {
  const [fullname, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  return (
    <div id="contact" className={styles.wrapper}>
      <div className={styles.form}>
        <h1>Contact Me</h1>
        <h4>Let me know what you need!</h4>
        <div className={styles.inputContainer}>
          <span>Fullame</span>
          <input
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Fullname"
          />
        </div>
        <div className={styles.inputContainer}>
          <span>Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ex: you@company.com"
          />
        </div>
        <div className={styles.inputContainer}>
          <span>Message</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`How can I help you?\nWrite it down here ...`}
          />
        </div>
        <button>Submit</button>
      </div>
    </div>
  );
};

export default Contact;
