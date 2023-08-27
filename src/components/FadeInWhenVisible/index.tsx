"use client";

import React from "react";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

const FadeInWhenVisible = ({ children, className }: Props) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeInWhenVisible;
