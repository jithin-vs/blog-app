import React from "react";
import styles from "./home.module.css";
// import Like from "@/components/Like/Like.js";

const Home = () => {
    return (
    <div className={styles.card}>
      <div className={styles.cardImage}></div>
      <div className={styles.category}> Illustration </div>
      <div className={styles.heading}>
        {" "}
        A heading that must span over two lines
        <div className={styles.author}>
          {" "}
          By <span className={styles.name}>Abi</span> 4 days ago
        </div>
          </div>
            </div>
  );
};

export default Home;
