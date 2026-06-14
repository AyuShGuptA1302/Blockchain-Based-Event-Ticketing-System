import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Txt5.module.css";

const Txt5 = () => {
  const navigate = useNavigate();

  const onHomeText3Click = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  return (
    <div className={styles.txt}>
      <div className={styles.secondaryNav}>
        <div className={styles.homePageParent}>
          <div className={styles.homePage}>
            <div className={styles.home} onClick={onHomeText3Click}>
              Home
            </div>
            <div className={styles.homePageInner}>
              <img
                className={styles.frameChild}
                loading="lazy"
                alt=""
                src="/vector-17.svg"
              />
            </div>
            <div className={styles.thriftShop}>Venue Setup</div>
          </div>
          <div className={styles.socialLinksContainerWrapper}>
            <div className={styles.socialLinksContainer}>
              <h1 className={styles.thriftShop1}>Venue Setup</h1>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.wereHereToAssistYouContWrapper}>
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

export default Txt5;
