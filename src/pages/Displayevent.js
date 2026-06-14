import { useCallback } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import HeaderNav5 from "../components/HeaderNav5";
import Txt2 from "../components/Txt2";
import Secevent from "../components/Secevent";
import Events from "./Events.json";
import { Link } from "react-router-dom";
import FrameContainer from "../components/FrameContainer";
import styles from "./Displayevent.module.css";
const Displayevent = () => {
    const [contractData, setContractData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Connect to the Ethereum provider injected by MetaMask
        await window.ethereum.enable();
        const web3 = new Web3(window.ethereum);

        // Create a contract instance
        const contractAddress = '0x3daA6Ce4916A3652782A531Cdf6b13eea0dEE336';
        const contract = new web3.eth.Contract(Events.abi, contractAddress);

        // Call the smart contract's getAllEventsLocked function
        const result = await contract.methods.getAllEvents1Locked().call();
        
        setContractData(result.reverse());
        
      } catch (error) {
        console.error('Error fetching data from the contract:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className={styles.container}>
    <HeaderNav5 />
    <Txt2/>
    <Secevent/>
    <header className={styles.header}>
      <h1>Event Gallery</h1>
    </header>
    <main className={styles.main}>
      <ul className={styles.eventGrid}>
        {contractData
          .filter((event) => event.status === 'available')
          .map((event, index) => (
            <li key={index} className={styles.eventItem}>
              {event.eventPhotoAddress && (
                <Link to={`/Event/${event.eventId}`}>
                  <img src={`https://gateway.ipfs.io/ipfs/${event.eventPhotoAddress}`} alt="Event Preview" />
                </Link>
              )}
              <h2>{event.eventName}</h2>
              <div className={styles.eventContent}>
                {/* Additional event details */}
              </div>
            </li>
          ))}
      </ul>
    </main>
  </div>
  );
  };

export default Displayevent;