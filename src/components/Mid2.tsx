import { FunctionComponent } from "react";
import styles from "./Mid2.module.css";

const Mid2: FunctionComponent = () => {
  return (
    <section className={styles.mid}>
      <div className={styles.homeParent}>
        <div className={styles.home}>
          <span>Home</span>
          <span className={styles.span}>{` `}</span>
        </div>
        <div className={styles.vectorLine}>
          <div className={styles.div}>{`>`}</div>
        </div>
        <div className={styles.vectorLine1}>
          <div className={styles.createEvent}>Create Event</div>
        </div>
      </div>
      <h1 className={styles.createEvent1}>Create Event</h1>
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

export default Mid2;
