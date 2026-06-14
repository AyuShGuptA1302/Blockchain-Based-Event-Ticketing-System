import HeaderNav8 from "../components/HeaderNav5";
import Txt6 from "../components/Txt6";


import NavSettings from "../components/NavSettings";
import F00ter2 from "../components/F00ter";
import styles from "./Evhost.module.css";
//import styles from "./Displayevent.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import Events from "./Events.json";
import { Link } from "react-router-dom";
import FrameContainer from "../components/FrameContainer";
import SecNav2 from "../components/SecNav2";
import Venues from "./Venues.json"
const Evhost =  () => {


  ///////////////////////////////////////////////////////////////////
  const web3 = new Web3('http://localhost:7550');
  const contractAddress = '0x3daA6Ce4916A3652782A531Cdf6b13eea0dEE336';
  const contract = new web3.eth.Contract(Events.abi, contractAddress);
  const [contractData, setContractData] = useState([]);
  const [venueData, setvenueData] = useState([]);
  const [buttonText, setButtonText] = useState('Accept');
 
  useEffect(() => {
    const fetchData = async () => {
      try {
       
      
        // Call the smart contract's getAllEventsLocked function
        const result = await contract.methods.getAllEvents1Locked().call();
        
       
        setContractData(result.reverse());
       
      } catch (error) {
        console.error('Error fetching data from the contract:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchvenue = async () => {
      try {
        await window.ethereum.enable();
        const web33 = new Web3(window.ethereum);
        const contractAddress1 = '0xddBE48d8605F85Ef074EbeCCd23592C147356831'; 
        const contract1 = new web33.eth.Contract(Venues.abi, contractAddress1);
        const accounts = await web33.eth.getAccounts();
      const senderAddress = accounts[0];
      
        // Call the smart contract's getAllEventsLocked function
        const result = await contract1.methods.getOwnedVenues().call({from : senderAddress });
        
       
        setvenueData(result);
       
      } catch (error) {
        console.error('Error fetching data from the contract:', error);
      }
    };

    fetchvenue();
  }, []);
  
 
  console.log(venueData);
  console.log(contractData)

  const handleAccepted = async (event, eventid) => {
      try{
    await window.ethereum.enable();
        const web33 = new Web3(window.ethereum);
        const contractAddress = '0x3daA6Ce4916A3652782A531Cdf6b13eea0dEE336';
  const contract = new web3.eth.Contract(Events.abi, contractAddress);
        const accounts = await web33.eth.getAccounts();
      const senderAddress = accounts[0];
    await contract.methods.eventPay(
      eventid,
      "ACCEPTED",
    ).send({
      from: senderAddress,
      gas: 5000000, // Increase the gas limit if needed
      
    });
    console.log("successfully changed status");
    event.setButtonText = 'ACCEPTED';
    
    setContractData(prevData => prevData.filter(item => item.id !== eventid));
  }catch(event){
    console.log("error", event);
  }
  }
  let venueid="";
  if (venueData.length > 0) {
    for(var i=0; i< venueData.length; i++ ){
  venueid = venueData[i].venueId;
  }
}
 
  //console.log(contractData);
  return (
    <div className={styles.container}>
      <div>
     <div className={styles.evhost}>
      
      <HeaderNav8 />
      <Txt6 />
      <SecNav2/>
    <main className={styles.main}>
      <ul className={styles.eventGrid}>
        {contractData
          .filter((event) => event.venueId === venueid && event.status === 'Unavailable')
          .map((event, index) => (
            <li key={index} className={styles.eventItem}>
          
  
      <section className={styles.eventHost}>
      <div className={styles.eventName}>
        <div className={styles.abebeChalaParent}>
          <div className={styles.abebeChala}>{event.eventName}</div>
          <div className={styles.evhostWrapper}>
            <div className={styles.evhost}>{event.eventPhoneNo}</div>
          </div>
          <div className={styles.abebechalgmailcomWrapper}>
            <div className={styles.abebechalgmailcom}>{event.description}</div>
          </div>
        </div>
      
          <div className={styles.frameWrapper}>
            <div className={styles.frameGroup}>
              <div className={styles.eventTypeParent}>
                <div className={styles.eventType}>Event type :</div>
                <div className={styles.concertWrapper}>
                  <div className={styles.concert}>{event.eventType}</div>
                </div>
              </div>
              <div className={styles.statusParent}>
                <div className={styles.status}>Status :</div>
                <div className={styles.pendingWrapper}>
                  <div className={styles.pending}>{venueData[0].status}</div>
                </div>
              </div>
            </div>
          </div>
          <button className={styles.acceptWrapper}  onClick={() => handleAccepted(event, event.eventId)}>
            <div className={styles.accept}>{buttonText}</div>
          </button>
        
      </div>
    </section>
   
             
              <div className={styles.eventContent}>
               
              </div>
            </li>
          ))}
          
      </ul>
    </main>
    </div>
      <F00ter2 />
    </div>
  </div>
  );
};

/* <div>
    <div className={styles.evhost}>
      
      <HeaderNav8 />
      <Txt6 />
      <FrameComponent14 />
      <section className={styles.eventHost}>
      <div className={styles.eventName}>
        <div className={styles.abebeChalaParent}>
          <div className={styles.abebeChala}>Abebe Chala</div>
          <div className={styles.evhostWrapper}>
            <div className={styles.evhost}>+251123456789</div>
          </div>
          <div className={styles.abebechalgmailcomWrapper}>
            <div className={styles.abebechalgmailcom}>AbebeChal@gmail.com</div>
          </div>
        </div>
      
          <div className={styles.frameWrapper}>
            <div className={styles.frameGroup}>
              <div className={styles.eventTypeParent}>
                <div className={styles.eventType}>Event type :</div>
                <div className={styles.concertWrapper}>
                  <div className={styles.concert}>Concert</div>
                </div>
              </div>
              <div className={styles.statusParent}>
                <div className={styles.status}>Status :</div>
                <div className={styles.pendingWrapper}>
                  <div className={styles.pending}>Pending</div>
                </div>
              </div>
            </div>
          </div>
          <button className={styles.acceptWrapper}>
            <div className={styles.accept}>Accept</div>
          </button>
        
      </div>
    </section>
     </div>
      <F00ter2 />
    </div>*/

export default Evhost;
