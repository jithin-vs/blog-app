import React from "react";
import styles from "./Like.module.css";

const Like = () => {
  return (
    <button className={styles.likeButton}>
      <i className="fas fa-thumbs-up" />
      <span>Like</span>
    </button>
  );
};

export default Like;