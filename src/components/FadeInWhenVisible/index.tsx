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
      transition={{ duration: 0.7 }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0.7 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeInWhenVisible;
