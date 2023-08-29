"use client";

import React, { useEffect, useContext, useState } from "react";

import { SidebarContext } from "@/src/contexts/SidebarContext";

const SidebarMenu = () => {
  const { toggleSidebar, sidebarToggle } = useContext(SidebarContext);

  useEffect(() => {
    changeScrollBehavior(sidebarToggle ? "hidden" : "unset");
  }, [sidebarToggle]);

  const changeScrollBehavior = (overflow: "hidden" | "unset") => {
    document.body.style.overflow = overflow;
  };

  const onClickLink = () => {
    changeScrollBehavior("unset");
    toggleSidebar();
  };

  const opacity = sidebarToggle ? 1 : 0;
  const transform = sidebarToggle ? "translateX(0%)" : "translateX(110%)";

  return (
    <div style={{ opacity, transform }} className="sidebar-menu">
      <div className="menu-list">
        <li onClick={onClickLink}>
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
      </div>
    </div>
  );
};

export default SidebarMenu;
