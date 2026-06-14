import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Web3 from "web3";
import Events from "./Events";
import Tickets from "./Tickets.json";
import styles from "./Event.module.css";
import FrameContainer from "../components/FrameContainer";
import HeaderNav5 from "../components/HeaderNav5";
import Txtevent from "../components/Txtevent";
const web3 = new Web3(window.ethereum);
const Event = () => {
  const queryParams = new URLSearchParams(window.location.search);
const ticketId = queryParams.get('ticketId');
console.log(ticketId);
  const navigate = useNavigate();
  const [eventLocked, setEventLocked] = useState(null);
  const [eventLockedd, setEventLockedd] = useState(null);
  const { eventId } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const contractAddress1 = '0x425a0b610e9422605aB4Ed782ab75abB14b01F25';
  const contract1 = new web3.eth.Contract(Tickets.abi, contractAddress1);

  const handleButtonClick = () => {
    setShowPopup(true);
  };
  //generate ticket id
  const generateTicketId = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 6;
    let TicketId = "";
    for (let i = 0; i < length; i++) {
      TicketId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return TicketId;
  };
  /////////////ticket identifier
  const generateTicketIdentifier = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 10;
    let TicketIdent = "";
    for (let i = 0; i < length; i++) {
      TicketIdent += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return TicketIdent;
  };
  const handlePopupClose =  () => {
   
    setShowPopup(false);
  };

  const handleVipButton = async(e) => {
   try{
  //  const accounts = await web3.eth.getAccounts();
    const accounts = await window.ethereum.enable();
    const senderAddress = accounts[0];
    const TicketId = generateTicketId();
    const TicketIdent =generateTicketIdentifier();
    await contract1.methods.createTicketLocked(
      TicketId,
      TicketIdent,
      eventId,
      "VIP"
    ).send({
      from: senderAddress,
      gas: 5000000, 
    });
    console.log(TicketId);
  console.log("success");
  navigate(`/qrmanage`);
  }catch(e){
    console.log("error", e);
  }
    setShowPopup(false);
  };

  const handleNormalButton = async() => {
    const accounts = await window.ethereum.enable();
    const senderAddress = accounts[0];
    const TicketId = generateTicketId();
    const TicketIdent =generateTicketIdentifier();
    await contract1.methods.createTicketLocked(
      TicketId,
      TicketIdent,
      eventId,
      "Normal"
    ).send({
      from: senderAddress,
      gas: 5000000, 
    });
    navigate(`/qrmanage`);
    setShowPopup(false);
  };
  useEffect(() => {
    const fetchEventLocked = async () => {
      try {
       
       
        const web3 = new Web3(window.ethereum);

        // Create a contract instance
        const contractAddress = '0x3daA6Ce4916A3652782A531Cdf6b13eea0dEE336';
        const contract = new web3.eth.Contract(Events.abi, contractAddress);

        const result = await contract.methods.getEvent1Locked(eventId).call();
        const result2 = await contract.methods.getEvent2Locked(eventId).call();
        
        setEventLocked(result);
        setEventLockedd(result2);
      
      } catch (error) {
        console.error('Error fetching event details from the contract:', error);
      }
    };

    fetchEventLocked();
  }, [eventId]);

console.log(eventLockedd);
//const vip= parseInt(eventLockedd.vipPrice);
  if (!eventLocked) {
    return <div>Loading...</div>;
  }


  return (
    <div className={styles.eventContainer}>
    <HeaderNav5/>
    <Txtevent/>
    <h1 className={styles.eventTitle}>Event Details</h1>
    <div className={styles.eventItem}>
      <img
        className={styles.eventImage}
        src={`https://gateway.ipfs.io/ipfs/${eventLocked.eventPhotoAddress}`}
        alt="Event Preview"
      />
      
      <h2 className={styles.eventInfo}>Event Name: {eventLocked.eventName}</h2>
      <h2 className={styles.eventInfo}>Event Type: {eventLocked.eventType}</h2>
      <h2 className={styles.eventInfo}>Event Description: {eventLocked.description}</h2>
     <h2 className={styles.eventInfo}>VIP Price: {parseInt(eventLockedd.vipPrice)}</h2>
     <h2 className={styles.eventInfo}>Regular Price: {parseInt(eventLockedd.normalPrice)}</h2>
     <h2 className={styles.eventInfo}>paymnetdetail: {eventLockedd.paymentDetail}</h2>
    
     
    </div>
    <button className={styles.button} onClick={handleButtonClick}>
      Buy
    </button>
    {showPopup && (
      <div className={styles.popup}>
        <div className={styles.popupcontent}>
          <h3>Select ticket type</h3>
          <div className={styles.buttoncontainer}>
            <button className={styles.popupbutton} onClick={handleVipButton}>
              Vip
            </button>
            <button className={styles.popupbutton} onClick={handleNormalButton}>
              Normal
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

export default Event;