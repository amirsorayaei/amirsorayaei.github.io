import React from "react";
import Image from "next/image";

import Logo from "@/src/assets/logo.jpg";

const Header = () => {
  return (
    <header>
      <a href="#">
        <Image
          src={Logo}
          alt="logo"
          width={60}
          height={60}
          style={{ borderRadius: "50%" }}
        />
      </a>
      <li>
        <a href="#about">About</a>
        <a href="#experinces">Experiences</a>
        <a href="#contact">Contact</a>
        <a
          href="https://docs.google.com/document/d/e/2PACX-1vQ_xahUvKDUoGX0qSZiMfjKvp3TzSX0c1mYScl3aZqhIObYw7gjowt3oRTDdTZu6eORUNJaXL1fuTpw/pub"
          target="_blank"
        >
          Resume
        </a>
      </li>
    </header>
  );
};

export default Header;
