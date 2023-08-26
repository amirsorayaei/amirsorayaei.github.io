"use client";

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import ExperiencesData from "@/src/db/experiences.json";
import { Experience } from "@/src/types/types";
import styles from "./index.module.scss";

const Experiences = () => {
  const listsRef = useRef<any[]>([]);
  const [timelines, setTimelines] = useState<number[]>([]);

  const data: Experience[] = ExperiencesData.data;

  useEffect(() => {
    const _timelines: number[] = [];
    listsRef.current.forEach((el) => {
      const elementHeight: number = el.getElementHeight?.();

      _timelines.push(elementHeight);
    });

    setTimelines(_timelines);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.listWrapper}>
        {data.map((item, index) => {
          return (
            <ExperienceItem
              key={item.id}
              item={item}
              ref={(ref) => (listsRef.current[index] = ref)}
            />
          );
        })}
      </div>
    </div>
  );
};

/**
 *
 * @returns
 */
const ExperienceItem = forwardRef(({ item }: { item: Experience }, ref) => {
  const elementRef = useRef<any>();

  useImperativeHandle(ref, () => ({
    getElementHeight() {
      return elementRef.current.offsetHeight;
    },
  }));

  return (
    <div ref={elementRef} className={styles.itemWrapper}>
      <div className={styles.arrow} />
      <h4>
        {item.role} <span> at {item.company}</span>
      </h4>
      <span>
        {item.startDate} - {item.currentlyWorking ? "Present" : item.endDate}
        &nbsp;({item.location})
      </span>
      {item.descriptions.map((description, index) => {
        return (
          <p key={index} className={styles.description}>
            {description}
          </p>
        );
      })}
    </div>
  );
});

ExperienceItem.displayName = "ExperienceItem";

export default Experiences;
