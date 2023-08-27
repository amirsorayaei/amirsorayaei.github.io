import React from "react";

import styles from "./index.module.scss";

interface Props {
  id: string;
  className?: string;
  children: React.ReactNode | React.ReactNode[];
}

/**
 * Page component for displaying every section
 *
 * @returns
 */
const Page = ({ id, className, children }: Props) => {
  return (
    <div id={id} className={`${styles.pageContainer} ${className}`}>
      {children}
    </div>
  );
};

export default Page;
