'use client'
import React from "react";
import styles from "../../styles/Card.module.css";
import { Credentials } from "./CredCards";
import Link from "next/link";

const Card = ({ credentials }: { credentials: Credentials }) => {

  let expiry = credentials.metadata?.expiryDate
  let expiryTimeStamp = new Date(expiry).getTime()
  let currentTimeStamp = new Date().getTime()

  return (
    <div className={(currentTimeStamp > expiryTimeStamp) ? `${styles.card} grayscale` : styles.card}>

      <div className={styles.imageContainer}>
        <img
          height={100}
          width={100}
          src={`https://coinviseco.infura-ipfs.io/ipfs/${credentials.image_cid}`}
          alt="CRED"
          className={styles.image}
        />
      </div>
      <div className={styles.details}>
        <h2 className={styles.title}>{credentials.title}</h2>
        <p className={styles.owner}>owned by <Link href={`/profile/${credentials.recipient_address}`}>{credentials.recipient_name} ({credentials.recipient_address.substring(0, 5)}...{credentials.recipient_address.substring(16, 20)})</Link></p>
        <p className={styles.description}>
          {credentials.description}
        </p>
        <p className='text-slate-500 mt-5'>issued by <Link href={`/profile/${credentials.issuer_address}`}>{credentials.issuer_name} ({credentials.issuer_address.substring(0, 5)}...{credentials.issuer_address.substring(16, 20)})</Link></p>
      </div>
    </div>
  );
};

export default Card;
