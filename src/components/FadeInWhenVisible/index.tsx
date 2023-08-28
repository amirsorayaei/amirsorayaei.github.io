"use client";

import React from "react";
import { AnimationProps, motion } from "framer-motion";

interface Props extends AnimationProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

const FadeInWhenVisible = ({ children, className, ...props }: Props) => {
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
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default FadeInWhenVisible;
