'use client'
import React, { useEffect, useState } from "react";
import styles from "../../styles/CardPage.module.css";
import { Credentials } from "./CredCards";

const CardPage = ({ credential }: { credential: Credentials }) => {

  let expiry = credential.metadata?.expiryDate
  let expiryTimeStamp = new Date(expiry).getTime()
  let currentTimeStamp = new Date().getTime()
  const expired = (expiryTimeStamp < currentTimeStamp)
  // styles.card+' '+expired ? 'grayscale': ' '

  return (
    <div className={expired ? styles.card + ' grayscale' : styles.card} >

      <div className={styles.imageContainer}>
        <img
          src={`https://coinviseco.infura-ipfs.io/ipfs/${credential.image_cid}`}
          alt="CRED"
          className={styles.image}
        />
      </div>
      <div className={styles.details}>
        <h2 className={styles.title}>{credential.title}</h2>
        <p className={styles.owner}>Owner: {credential.recipient_address?.substring(0, 5)}...{credential.recipient_address?.substring(credential.recipient_address?.length - 5, credential.recipient_address?.length)}</p>
        <p className={styles.owner}>Issuer: {credential.issuer_address?.substring(0, 5)}...{credential.issuer_address?.substring(credential.issuer_address?.length - 5, credential.issuer_address?.length)}</p>
        <p className={styles.description}>
          {credential.description}
        </p>
        <br />
        {
          credential.metadata?.expiryDate ?
            <p className="text-slate-600 font-bold">
              Expire{expired ? "d" : "s"} on: {credential.metadata.expiryDate}
            </p> : null
        }
      </div>
    </div>
  );
};

export default CardPage;
