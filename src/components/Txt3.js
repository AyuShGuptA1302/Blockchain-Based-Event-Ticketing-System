import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Txt3.css";

const Txt3 = () => {
  const navigate = useNavigate();

  const onHomeText3Click = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  return (
    <section className="txt11">
      <div className="home-parent6">
        <div className="home81" onClick={onHomeText3Click}>
          Home
        </div>
        <div className="vector-wrapper6">
          <img
            className="frame-child23"
            loading="lazy"
            alt=""
            src="/vector-17.svg"
          />
        </div>
        <div className="venue-name10">
          <div className="venue10">Venue</div>
        </div>
      </div>
      <div className="sub-nav-links">
        <div className="venue-wrapper">
          <h1 className="venue11">Venue</h1>
        </div>
        <div className="were-here-to-container23">
          <p className="were-here-to23">
            We're here to assist you. Contact us by email, chat, or phone if you
            have any questions.
          </p>
          <p className="p26"></p>
        </div>
      </div>
    </section>
  );
};

export default Txt3;
