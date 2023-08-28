"use client";

import React, { useContext } from "react";
import Image from "next/image";
import { CgMenuRightAlt } from "react-icons/cg";
import { MdClose } from "react-icons/md";

import Logo from "@/src/assets/logo.png";
import { SidebarContext } from "@/src/contexts/SidebarContext";

const Header = () => {
  const { toggleSidebar, sidebarToggle } = useContext(SidebarContext);

  const MenuIcon = sidebarToggle ? MdClose : CgMenuRightAlt;

  return (
    <header>
      <a href="#">
        <Image src={Logo} alt="logo" width={80} height={80} />
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
      <MenuIcon size={30} className="hamburger-menu" onClick={toggleSidebar} />
    </header>
  );
};

export default Header;
