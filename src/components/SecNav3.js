import styles from "./SecNav3.module.css";

const SecNav3 = () => {
  return (
    <div className={styles.secNav}>
      <div className={styles.secNav1}>
        <img
          className={styles.ghbkfdjcsxIcon}
          alt=""
          src="/ghbkfdjcsx1@2x.png"
        />
        <div className={styles.concert}>Event Hosting</div>
      </div>
      <div className={styles.secNav2}>
        <img
          className={styles.ghbkfdjcsxIcon1}
          alt=""
          src="/ghbkfdjcsx-1@2x.png"
        />
        <div className={styles.concert1}>Venue</div>
      </div>
      <button className={styles.secNav3}>
        <div className={styles.concert2}>Venue Setup</div>
        <img
          className={styles.ghbkfdjcsxIcon2}
          alt=""
          src="/ghbkfdjcsx-41@2x.png"
        />
      </button>
      <div className={styles.secNav4}>
        <img
          className={styles.ghbkfdjcsxIcon3}
          alt=""
          src="/ghbkfdjcsx-3@2x.png"
        />
        <div className={styles.concert3}>Account</div>
      </div>
      <div className={styles.secNav5}>
        <img
          className={styles.ghbkfdjcsxIcon4}
          alt=""
          src="/ghbkfdjcsx-4@2x.png"
        />
        <div className={styles.concert4}>Other</div>
      </div>
    </div>
  );
};

export default SecNav3;
