import styles from "./SecNav1.module.css";

const SecNav1 = () => {
  return (
    <div className={styles.secNav}>
      <button className={styles.secNav1}>
        <div className={styles.concert}>Concert</div>
        <img
          className={styles.ghbkfdjcsxIcon}
          alt=""
          src="/ghbkfdjcsx3@2x.png"
        />
      </button>
      <div className={styles.secNav2}>
        <img
          className={styles.ghbkfdjcsxIcon1}
          loading="lazy"
          alt=""
          src="/ghbkfdjcsx-1@2x.png"
        />
        <div className={styles.concert1}>Sport</div>
      </div>
      <div className={styles.secNav3}>
        <img
          className={styles.ghbkfdjcsxIcon2}
          loading="lazy"
          alt=""
          src="/ghbkfdjcsx-2@2x.png"
        />
        <div className={styles.concert2}>E_sports</div>
      </div>
      <div className={styles.secNav4}>
        <img
          className={styles.ghbkfdjcsxIcon3}
          loading="lazy"
          alt=""
          src="/ghbkfdjcsx-3@2x.png"
        />
        <div className={styles.concert3}>{`Food & Drink`}</div>
      </div>
      <div className={styles.secNav5}>
        <img
          className={styles.ghbkfdjcsxIcon4}
          loading="lazy"
          alt=""
          src="/ghbkfdjcsx-4@2x.png"
        />
        <div className={styles.concert4}>Other</div>
      </div>
    </div>
  );
};

export default SecNav1;
