'use client'
import React from "react";
import styles from "../../styles/Card.module.css";
import { Credentials } from "./CredCards";

const Card = ({credentials}: {credentials: Credentials}) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
        height={100}
        width={100}
          src={`https://coinviseco.infura-ipfs.io/ipfs/${credentials.image_cid }`}
          alt="CRED"
          className={styles.image}
        />
      </div>
      <div className={styles.details}>
        <h2 className={styles.title}>{credentials.title}</h2>
        <p className={styles.owner}>{credentials.recipient_address.substring(0, 5)}...{credentials.recipient_address.substring(16, 20)}</p>
        <p className={styles.description}>
          {credentials.description} 
        </p>
      </div>
    </div>
  );
};

export default Card;
