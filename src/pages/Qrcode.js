import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from 'react-qr-code';
import Mid from "../components/Mid";
import HeaderNav8 from "../components/HeaderNav5";
import FrameContainer from "../components/FrameContainer";
import Web3 from "web3";
import Tickets from "./Tickets.json";
import styles from "./Resell.module.css";
import Events from "./Events";
import Venues from "./Venues.json"
import SecNav4 from "../components/SecNav4";
/*
0xf16A8b63550c689eAB051AD3C8eCd3B03c0E39E6  venue
0x978cB6847e3FD46C12FdCf2189FA994116666441  ticket
0x148B4551b0f2b0Aa2B6a3777c24fFf22baaa8E4D  event
0x087B95B536e3C908bb32b39971F47FdbA295AbeD  user
*///
const Qrcode =  () => {
  const navigate = useNavigate();
  const[eventinfo,seteventinfo] = useState([]);
  const [ticketIds, setTicketIds] = useState([]);
  const [eventIds, seteventIds] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [PopupTicketId, setPopupTicketId] = useState("");
  const [address, setaddress] = useState("");
  const[venue,setvenue] = useState("");
  const contractAddress = '0xE888398a4BB89b96CBf6daa5bCF6FCF65bDAEA18';
          const web3 = new Web3(window.ethereum);
          const contract = new web3.eth.Contract(Tickets.abi, contractAddress);
          
          useEffect(() => {
            const fetchTicketIds = async () => {
              try {
                if (window.ethereum && window.ethereum.isMetaMask) {
                  const accounts = await window.ethereum.enable();
                  const selectedAddress = accounts[0];
                  setaddress(selectedAddress);
          
                  const result = await contract.methods.getAllTicketsLocked(selectedAddress).call({ from: selectedAddress });
                  const filteredTicketIds = result;
                  setTicketIds(result);
                }
              } catch (error) {
                console.error('Error fetching ticket IDs:', error);
              }
            };
  
            fetchTicketIds();
          }, []);
          
          useEffect(() => {
            const fetchEventIds = async () => {
              try {
                const eventIds = [];
                for (let i = 0; i < ticketIds.length; i++) {
                  const eventId = ticketIds[i].eventId;
                  eventIds.push(eventId);
          
                  const contractAddress1 = '0x3daA6Ce4916A3652782A531Cdf6b13eea0dEE336';
                  const contract1 = new web3.eth.Contract(Events.abi, contractAddress1);
                  const resultevent = await contract1.methods.getEvent2Locked(eventId).call();
                  const resultevent1 = await contract1.methods.getEvent1Locked(eventId).call();
                  seteventinfo((preveventIds) => [...preveventIds, resultevent1]);
                  seteventIds((preveventId) => [...preveventId, resultevent]);
                  
                
                }
              } catch (error) {
                console.error('Error fetching event IDs:', error);
              }
            };
          
            fetchEventIds();
          }, [ticketIds]);
          useEffect(() => {
            const fetchvenueIds = async () => {
              try {
                const venueid = [];
                for (let i = 0; i < eventinfo.length; i++) {
                  const venueids = eventinfo[i].venueId;
                  venueid.push(venueids);
          
               
                       
                const web3 = new Web3(window.ethereum);
                const contractAddress = '0xddBE48d8605F85Ef074EbeCCd23592C147356831';
                const reg = new web3.eth.Contract(Venues.abi, contractAddress);
                const res = await reg.methods.getVenueLocked(venueids).call();
                
                setvenue((prevres) => [...prevres, res]);
                }
                }
               catch (error) {
                console.error('Error fetching event IDs:', error);
              }
            };
          
            fetchvenueIds();
          }, [eventinfo]);
           console.log(eventinfo);
  console.log(ticketIds);
  console.log(eventIds);
    const onSubmit =(ticketid) =>{
      
      setShowPopup(true);
      setPopupTicketId(ticketid);

    }
    
  const handlePopupClose =  () => {
   
    setShowPopup(false);
  };
 
  var price="";
/*
  if (ticketIds.length > 0) {
    if (ticketIds[0].ticketLevel=="VIP"){
   price=eventIds.vipPrice;
    }
    else{
      price=eventIds.normalPrice;
    }
  }*/
  //////////////////

  const handle5 = async (id,e) =>{
    const accounts= await window.ethereum.enable();
    const senderAddress = accounts[0];
    if (ticketIds.length > 0) {
      for(var i=0; i<ticketIds.length; i++){
      
        if(ticketIds[i].ticketId===id){
          if (ticketIds[i].ticketLevel=="VIP"){
          price=eventIds[i].vipPrice;
          console.log(eventIds[i].eventId);
          }
          else if(ticketIds[i].ticketLevel=="normal"){
            price=eventIds[i].normalPrice;
          console.log(eventIds[i].eventId);
          }
          break;
        }
      }
    }
   try{
       await contract.methods.setTicketResellPrice(
        id,
        parseInt(price),
        5
      ).send({
        from: senderAddress,
        gas: 5000000, 
      });
      console.log("Successfully posted to resell");
      setShowPopup(false);
    }catch(e){
      console.log("error in 5",e)
    }
  }
  const handle10 = async(id,e) =>{
    const accounts= await window.ethereum.enable();
    const senderAddress = accounts[0];
    if (ticketIds.length > 0) {
      for(var i=0; i<ticketIds.length; i++){
      
        if(ticketIds[i].ticketId===id){
          if (ticketIds[i].ticketLevel=="VIP"){
          price=eventIds[i].vipPrice;
          console.log(eventIds[i].eventId);
          }
          else if(ticketIds[i].ticketLevel=="normal"){
            price=eventIds[i].normalPrice;
          console.log(eventIds[i].eventId);
          }
          break;
        }
      }
    }
    try{
      await contract.methods.setTicketResellPrice(
       id,
       parseInt(price),
       10
     ).send({
       from: senderAddress,
       gas: 5000000, 
     });
     console.log("Successfully posted to resell");
     setShowPopup(false);
   }catch(e){
     console.log("error in 10",e)
   }
  }
  const handle15 = async(id,e) =>{
    const accounts= await window.ethereum.enable();
    const senderAddress = accounts[0];
    if (ticketIds.length > 0) {
      for(var i=0; i<ticketIds.length; i++){
      
        if(ticketIds[i].ticketId===id){
          if (ticketIds[i].ticketLevel=="VIP"){
          price=eventIds[i].vipPrice;
          console.log(eventIds[i].eventId);
          }
          else if(ticketIds[i].ticketLevel=="normal"){
            price=eventIds[i].normalPrice;
          console.log(eventIds[i].eventId);
          }
          break;
        }
      }
    }
    try{
      await contract.methods.setTicketResellPrice(
       id,
       parseInt(price),
       15
     ).send({
       from: senderAddress,
       gas: 5000000, 
     });
     console.log("Successfully posted to resell");
     setShowPopup(false);
   }catch(e){
     console.log("error in 5",e)
   }
  }
  
  function onQRcode(id){
    navigate("/qr");
  }
   return (
    <div className={styles.back}>
   <HeaderNav8 />
   <SecNav4 />
    <div>
    {ticketIds
       .map((ticketId, index) => (
        <div key={index}><main className={styles.resellInner}>
          {eventIds[index] && venue[index] &&(
           
         <section className={styles.t1Parent}>
          
          <div className={styles.t5}>
            <div className={styles.names}>
              <div className={styles.evName}>
                <div className={styles.event} >Event :</div>
                <div className={styles.bermellWrapper}>
                  <div className={styles.bermell}>{eventinfo[index].eventName}</div>
              </div>
              </div>
              <div className={styles.vename}>
                <div className={styles.venue}>Venue :</div>
                <div className={styles.kanaVillageWrapper}>
                  <div className={styles.kanaVillage}>{venue[index].venueName}</div>
                </div>
              </div>
              <div className={styles.date}> 
              <div className={styles.date1} style={{ marginLeft: '0px' }}>Date:</div> 
              <div className={styles.may122024Wrapper}> 
              <div className={styles.may122024} > May 12, 2024 </div>
                </div>
              </div>
            </div>
            <div className={styles.t5Inner} style={{ marginLeft: '0px' }}>
              <div className={styles.sitParent} >
              
                <div className={styles.priceWrapper}>
                  <div className={styles.price}>
                
                    <div className={styles.price1}>Price :</div>
                      <div className={styles.div1}>
                        {ticketId.ticketLevel === "VIP" ? parseInt(eventIds[index].vipPrice) : parseInt(eventIds[index].normalPrice)}</div>
                 
                  </div>
                </div>
                <div className={styles.typeWrapper}>
                  <div className={styles.type}>
                    <div className={styles.type1}>Type :</div>
                   
                      <div className={styles.vip}>{ticketId.ticketLevel}</div>
                    
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.buybtnWrapper}>
              <button className={styles.buybtn} style={{ marginLeft: '470px' }} onClick={() => onSubmit(ticketId.ticketId)} >
                <div className={styles.buy}>Resell</div>
              </button>
              <button className={styles.buybtn1} style={{ marginLeft: '470px'}} onClick={() => onQRcode(ticketId.ticketId)} >
                <div className={styles.buy}>QRcode</div>
              </button>
             
            </div>
            
            <div className={styles.t5Child} />
            <div className={styles.t5Item} />
          </div>

          
        </section>
          )}
      </main>
      </div>
      ))}
      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupcontent}>
            <h3>Select ticket type</h3>
            <div className={styles.buttoncontainer}>
              <button className={styles.popupbutton} onClick={() => handle5(PopupTicketId)}>
                5%
              </button>
              <button className={styles.popupbutton} onClick={() => handle10(PopupTicketId)}>
                10%
              </button>
              <button className={styles.popupbutton} onClick={() => handle15(PopupTicketId)}>
                15%
              </button>
            </div>
          </div>
       
        </div>
      )}
    </div>
  </div>
  );
};
export default Qrcode;