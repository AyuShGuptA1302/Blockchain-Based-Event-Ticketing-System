import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FrameComponent21.module.css";

const FrameComponent21 = () => {
  const navigate = useNavigate();

  const onHomeText3Click = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  return (
  
      <div className={styles.txt}>
        <div className={styles.txtInner}>
          <div className={styles.frameParent}>
            <div className={styles.homeParent}>
              <div className={styles.home} onClick={onHomeText3Click}>
                Home
              </div>
              <div className={styles.vectorWrapper}>
                <img
                  className={styles.frameChild}
                  loading="lazy"
                  alt=""
                  src="/vector-17.svg"
                />
              </div>
              <div className={styles.thriftShop}>Manage</div>
            </div>
            <div className={styles.frameWrapper}>
              <div className={styles.thriftShopWrapper}>
                <h2 className={styles.thriftShop1}>Manage</h2>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.wereHereToAssistYouContWrapper}>
          <div className={styles.wereHereToContainer}>
            <p className={styles.wereHereTo}>
              We're here to assist you. Contact us by email, chat, or phone if
              you have any questions.
            </p>
            <p className={styles.p}></p>
          </div>
        </div>
      </div>

  );
};

export default FrameComponent21;
