import styles from "./SecNav2.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback } from "react";
const SecNav4 = () => {
  const navigate = useNavigate();
  const onEventHosting = useCallback(() => {
    navigate("/events");
  }, [navigate]);
   const Venue = useCallback(() => {
    navigate("/qrmanage");
  }, [navigate]);
   const onVenueSetup = useCallback(() => {
    navigate("/mak");
  }, [navigate]);
 const  onAccount = useCallback(() => {
    navigate("/u");
  }, [navigate]);
  return (
    <div className={styles.secNav}>
      <button className={styles.secNav1} onClick={onEventHosting}>
        <img
          className={styles.ghbkfdjcsxIcon}
          alt=""
          src="/ghbkfdjcsx1@2x.png"
        />
        <div className={styles.concert}>Events</div>
      </button>
      <button className={styles.secNav2} onClick={Venue}>
        <img
          className={styles.ghbkfdjcsxIcon1}
          alt=""
          src="/ghbkfdjcsx-1@2x.png"
        />
        <div className={styles.concert1}>Tickets</div>
      </button>
      <button className={styles.secNav3} onClick={onVenueSetup}>
        <div className={styles.concert2}>Trift Shop</div>
        <img
          className={styles.ghbkfdjcsxIcon2}
          alt=""
          src="/ghbkfdjcsx-41@2x.png"
        />
      </button>
      <button className={styles.secNav4} onClick={onAccount}>
        <img
          className={styles.ghbkfdjcsxIcon3}
          alt=""
          src="/ghbkfdjcsx-3@2x.png"
        />
        <div className={styles.concert3}>Account</div>
      </button>
      
    </div>
  );
};

export default SecNav4;
