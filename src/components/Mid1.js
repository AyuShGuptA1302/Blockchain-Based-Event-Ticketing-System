import { FunctionComponent } from "react";
import styles from "./Mid1.module.css";

const Mid1 = () => {
  return (
    <section className={styles.mid}>
      <div className={styles.homeTicketScannerFrameParent}>
        <div className={styles.homeTicketScannerFrame}>
          <div className={styles.home}>
            <span>Home</span>
            <span className={styles.span}>{` `}</span>
          </div>
          <div className={styles.vector}>
            <img
              className={styles.scanTextIcon}
              loading="lazy"
              alt=""
              src="/vector-14.svg"
            />
          </div>
          <div className={styles.ticketScanner}>
            <span>Ticket Scanner</span>
            <span className={styles.span1}>{` `}</span>
          </div>
        </div>
        <h1 className={styles.ticketScanner1}>Ticket Scanner</h1>
      </div>
      <div className={styles.wereHereToContainer}>
        <p className={styles.wereHereTo}>
          We're here to assist you. Contact us by email, chat, or phone if you
          have any questions.
        </p>
        <p className={styles.p}></p>
      </div>
    </section>
  );
};

export default Mid1;
