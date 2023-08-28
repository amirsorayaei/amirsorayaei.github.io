"use client";

import React, { useState } from "react";
import emailjs from "@emailjs/browser";

import Loading from "@/src/components/Loading";
import { Result } from "@/src/types/types";

import styles from "./index.module.scss";
import Page from "@/src/components/Page";

const Contact = () => {
  const [fullname, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<Partial<Result>>();

  /**
   * Function to send email to the site owner
   */
  const submit = async () => {
    const data = {
      from_name: fullname,
      from_email: email,
      message,
    };

    setLoading(true);
    /**
     * Send the message and get a callback with an error or details of the message that was sent
     */
    emailjs
      .send("service_1scq7hk", "template_bnzlyfl", data, "beNkgA60nsq3eMwYk")
      .then(
        () => {
          setResult({
            message:
              "Your message has been sent successfully!\nI will reach out to you ASAP.",
            type: "success",
          });
        },
        () => {
          setResult({
            message: "Error to sending message. :(",
            type: "error",
          });
        }
      )
      .finally(() => setLoading(false));
  };

  const renderContent = () => {
    /**
     * Display success message
     */
    if (result?.type === "success") {
      return <h2 style={{ color: "#4caf50" }}>{result.message}</h2>;
    }

    /**
     * Display error message
     */
    if (result?.type === "error") {
      return <h2 style={{ color: "#f44336" }}>{result.message}</h2>;
    }

    /**
     * Form content
     */
    return (
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
            type="email"
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
        <button disabled={loading} onClick={submit}>
          {loading ? <Loading /> : "Submit"}
        </button>
      </div>
    );
  };

  return (
    <Page id="contact" className={styles.wrapper}>
      {renderContent()}
    </Page>
  );
};

export default Contact;
