import React from "react";
import styles from "./Loader.module.css";

const Loader: React.FC = () => {
  return (
    <div className={styles["banter-loader"]}>
      <div className={styles["banter-loader__box"]}></div>
      <div className={styles["banter-loader__box"]}></div>
      <div className={styles["banter-loader__box"]}></div>
      <div className={styles["banter-loader__box"]}></div>
      <div className={styles["banter-loader__box"]}></div>
      <div className={styles["banter-loader__box"]}></div>
      <div className={styles["banter-loader__box"]}></div>
      <div className={styles["banter-loader__box"]}></div>
      <div className={styles["banter-loader__box"]}></div>
    </div>
  );
};

export default Loader;
