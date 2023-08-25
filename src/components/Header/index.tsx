import React from "react";
import Image from "next/image";

import Logo from "@/src/assets/logo.jpg";

const Header = () => {
  return (
    <header>
      <Image
        src={Logo}
        alt="logo"
        width={60}
        height={60}
        style={{ borderRadius: "50%" }}
      />
      <li>
        <a href="#about">About</a>
        <a href="#experinces">Experiences</a>
        <a href="#contact">Contact</a>
        <a href="#resume">Resume</a>
      </li>
    </header>
  );
};

export default Header;
