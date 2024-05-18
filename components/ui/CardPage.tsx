'use client'
import React from "react";
import styles from "../../styles/CardPage.module.css";

const CardPage = () => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src=""
          alt="CRED"
          className={styles.image}
        />
      </div>
      <div className={styles.details}>
        <h2 className={styles.title}>Title</h2>
        <p className={styles.owner}>Owner</p>
        <p className={styles.description}>
          Description 
        </p>
      </div>
    </div>
  );
};

export default CardPage;
