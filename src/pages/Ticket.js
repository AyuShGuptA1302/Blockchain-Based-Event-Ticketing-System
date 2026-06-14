import { useState,FunctionComponent,ChangeEvent  } from "react";
import Mid from "../components/Mid";
import styles from "./Ticket.module.css";

var img="QmePRKEPR4DEt8d2JYjxcG8rD8z2HSbPcZ1aiMAwknSgy9";
const Ticket = () => {
  const imageUrl = `https://gateway.pinata.cloud/ipfs/${img}`;
  return (
    <div>
      
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
  
};

export default Ticket;
