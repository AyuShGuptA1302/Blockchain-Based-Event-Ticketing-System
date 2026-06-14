import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./FrameContainer.module.css";
import UserLogin, {isloggedin} from "../pages/UserLogin";

const FrameContainer = (props) => {
  const navigate = useNavigate();
  const location = useLocation();


  //console.log(UserLogin.arguments.isloggedin)
  //var log ="false";
  //log= toString(UserLogin.log);
    const onSigninTextClick = useCallback(() => {
    navigate("/user-reg");
  }, [navigate]);

  const onHomeTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onAboutTextClick = useCallback(() => {
    navigate("/about");
  }, [navigate]);
  const onContactTextClick = useCallback(() => {
    navigate("/contact");
  }, [navigate]);
  
  //{location.state && location.state.id ? location.state.id : 'Sign up'}
  return (
    <div className={styles.frame}>
      <img className={styles.log1Icon} alt="" src="/log-1@2x.png" />
      <div className={styles.frame1}>
        <div className={styles.frameInner}>
          <div className={styles.homeParent}>
            <div className={styles.home} onClick={onHomeTextClick}>
              Home
            </div>
            <div className={styles.home} onClick={onAboutTextClick}>
              About
            </div>
            <div className={styles.home} onClick={onContactTextClick}>
          contact
            </div>
            <div className={styles.home} onClick={onSigninTextClick}>
            {location.state && location.state.id ? location.state.id : 'Sign up'}
            </div>
          </div>
         
        </div>
      </div>
      <div className={styles.frame2}>
       
      </div>
    </div>
  );
};

export default FrameContainer;
