import { useCallback } from "react";
import "./Txt1.css";

const Txt1 = () => {
  const onHomeText3Click = useCallback(() => {
    // Please sync "Home" to the project
  }, []);

  return (
    <header className="txt4">
      <div className="facebook-link">
        <div className="instagram-link">
          <div className="twitter-link">
            <div className="home19" onClick={onHomeText3Click}>
              Home
            </div>
            <div className="privacy-policy4">
              <img
                className="privacy-policy-child"
                loading="lazy"
                alt=""
                src="/vector-17.svg"
              />
            </div>
            <div className="thrift-shop6">Venue Setup</div>
          </div>
          <div className="instagram-link-inner">
            <div className="thrift-shop-wrapper1">
              <h1 className="thrift-shop7">Venue Setup</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="were-here-to-assist-you-cont-frame">
        <div className="were-here-to-container4">
          <p className="were-here-to4">
            We're here to assist you. Contact us by email, chat, or phone if you
            have any questions.
          </p>
          <p className="p4"></p>
        </div>
      </div>
    </header>
  );
};

export default Txt1;
