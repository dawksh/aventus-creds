'use client'
import React from "react";
import styles from "../../styles/CardPage.module.css";
import { Credentials } from "./CredCards";

const CardPage = ({credential}:{credential:Credentials}) => {

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={`https://coinviseco.infura-ipfs.io/ipfs/${credential.image_cid }`}
          alt="CRED"
          className={styles.image}
        />
      </div>
      <div className={styles.details}>
        <h2 className={styles.title}>{credential.title}</h2>
        <p className={styles.owner}>{credential.recipient_address?.substring(0,5)}...{credential.recipient_address?.substring(credential.recipient_address?.length-5,credential.recipient_address?.length)}</p>
        <p className={styles.description}>
          {credential.description}
        </p>
      </div>
    </div>
  );
};

export default CardPage;
