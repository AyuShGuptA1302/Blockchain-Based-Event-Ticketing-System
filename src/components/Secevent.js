import styles from "./Secevent.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback } from "react";
const Secevent = () => {
  const navigate = useNavigate();
  const onCreate = useCallback(() => {
    navigate("/ev");
  }, [navigate]);
   const Venue = useCallback(() => {
    navigate("/dv");
  }, [navigate]);
   const Eventmanage = useCallback(() => {
    navigate("/eventmanage");
  }, [navigate]);
    const Events = useCallback(() => {
    navigate("/dd");
  }, [navigate]);
 const  onAccount = useCallback(() => {
    navigate("/u");
  }, [navigate]);
  return (
    <div className={styles.secNavWrapper}>
        <div className={styles.secNav}>
          <button className={styles.secNav1} onClick={onCreate}>
            <div className={styles.createEvent}>Create Event</div>
            <img
              className={styles.ghbkfdjcsxIcon}
              alt=""
              src="/ghbkfdjcsx3@2x.png"
            />
          </button>
          <button className={styles.secNav2} onClick={Venue}>
            <img
              className={styles.ghbkfdjcsxIcon1}
              alt=""
              src="/ghbkfdjcsx-11@2x.png"
            />
            <div className={styles.venue}>Venue</div>
          </button>
          <button className={styles.secNav3} onClick={Eventmanage}>
            <img
              className={styles.ghbkfdjcsxIcon2}
              alt=""
              src="/ghbkfdjcsx-21@2x.png"
            />
            <div className={styles.eventManagment}>Event Managment</div>
          </button>
          <button className={styles.secNav4} onClick={Events}>
            <img
              className={styles.ghbkfdjcsxIcon3}
              alt=""
              src="/ghbkfdjcsx-31@2x.png"
            />
            <div className={styles.concert}>Events</div>
          </button>
          <button className={styles.secNav5} onClick={onAccount}>
            <img
              className={styles.ghbkfdjcsxIcon4}
              alt=""
              src="/ghbkfdjcsx4@2x.png"
            />
            <div className={styles.account}>Account</div>
          </button>
        </div>
      </div>
  );
};

export default Secevent;
