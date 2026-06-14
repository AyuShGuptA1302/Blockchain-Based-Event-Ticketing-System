import { FunctionComponent } from "react";
import "./Mid.css";

const Mid: FunctionComponent = () => {
  return (
    <div className="mid">
      <div className="were-here-to-container">
        <p className="were-here-to">
          We're here to assist you. Contact us by email, chat, or phone if you
          have any questions.
        </p>
        <p className="were-here-to"></p>
      </div>
      <div className="create-event2">Create Event</div>
      <div className="frame">
        <div className="home12">
          <span>Home</span>
          <span className="span">{` `}</span>
        </div>
        <div className="create-event3">Create Event</div>
        <div className="div2">{`>`}</div>
      </div>
    </div>
  );
};

export default Mid;
