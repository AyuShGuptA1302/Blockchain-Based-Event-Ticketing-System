import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Txt4.module.css";

const Txtevent = () => {
  const navigate = useNavigate();

  const onHomeText3Click = useCallback(() => {
    navigate("/events");
  }, [navigate]);

  return (
    <div className={styles.txt}>
      <div className={styles.ifStatementWrapper}>
        <div className={styles.ifStatement}>
          <div className={styles.elseStatement}>
            <div className={styles.home} onClick={onHomeText3Click}>
              Events
            </div>
            <div className={styles.forEachLoop}>
              <img
                className={styles.constantValueIcon}
                loading="lazy"
                alt=""
                src="/vector-17.svg"
              />
            </div>
            <div className={styles.thriftShop}>Event details</div>
          </div>
          <div className={styles.variableHolder}>
            <div className={styles.assignmentOperator}>
              <h2 className={styles.thriftShop1}>Event</h2>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.logicalOperator}>
        <div className={styles.wereHereToContainer}>
          <p className={styles.wereHereTo}>
            We're here to assist you. Contact us by email, chat, or phone if you
            have any questions.
          </p>
          <p className={styles.p}></p>
        </div>
      </div>
    </div>
  );
};

export default Txtevent;
