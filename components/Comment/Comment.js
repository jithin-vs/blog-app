import React from "react";
import styles from "./Comment.module.css";

const Comment = () => {
  return (
    <div className={styles.comment}>
      <i className="fas fa-comment" />
      <span className={styles.count}>4</span>
    </div>
  );
};

export default Comment;