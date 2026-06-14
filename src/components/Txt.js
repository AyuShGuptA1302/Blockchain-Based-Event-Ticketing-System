import { useCallback } from "react";
import "./Txt.css";

const Txt = () => {
  const onHomeText3Click = useCallback(() => {
    // Please sync "Home" to the project
  }, []);

  return (
    <div className="txt2">
      <div className="txt-inner">
        <div className="frame-parent2">
          <div className="home-parent">
            <div className="home11" onClick={onHomeText3Click}>
              Home
            </div>
            <div className="vector-wrapper">
              <img
                className="frame-child1"
                loading="lazy"
                alt=""
                src="/vector-17.svg"
              />
            </div>
            <div className="thrift-shop4">Thrift Shop</div>
          </div>
          <div className="thrift-shop-frame">
            <h1 className="thrift-shop5">Thrift Shop</h1>
          </div>
        </div>
      </div>
      <div className="were-here-to-container2">
        <p className="were-here-to2">
          We're here to assist you. Contact us by email, chat, or phone if you
          have any questions.
        </p>
        <p className="p2"></p>
      </div>
    </div>
  );
};

export default Txt;
