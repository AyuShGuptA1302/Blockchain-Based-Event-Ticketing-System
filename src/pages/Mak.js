import React, { useEffect ,useState , useMemo} from 'react';

import Txt5 from "../components/Txt5";
import F00ter from "../components/F00ter";
import styles from "./Mak.module.css";
import HeaderNav5 from '../components/HeaderNav5';
import Web3 from "web3";
import Tickets from "./Tickets.json";
import Events from "./Events.json"
import SecNav4 from "../components/SecNav4";
const Mak = () => {
  const [contractData, setContractData] = useState([]);
const [eventData, setEventData] = useState([]);

useEffect(() => {
  const fetchContractData = async () => {
    try {
      // Connect to the Ethereum provider injected by MetaMask
      await window.ethereum.enable();
      const web3 = new Web3(window.ethereum);

      // Create a contract instance
      const contractAddress = '0xE888398a4BB89b96CBf6daa5bCF6FCF65bDAEA18';
      const contract = new web3.eth.Contract(Tickets.abi, contractAddress);

      // Call the smart contract's getAllTicketsLocked function
      const result = await contract.methods.getEveryTicketsLocked().call();
      const filteredTicketIds = result.map((ticket) => ticket.ticketId);
      setContractData(result.reverse());
    } catch (error) {
      console.error('Error fetching contract data:', error);
    }
  };

  fetchContractData();
}, []);

useEffect(() => {
  const fetchEventData = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      let eventIds = [];
      for (let i = 0; i < contractData.length; i++) {
        const eventId = contractData[i].eventId;
        eventIds.push(eventId);
        const contractAddress1 = '0x3daA6Ce4916A3652782A531Cdf6b13eea0dEE336';
        const contract1 = new web3.eth.Contract(Events.abi, contractAddress1);
        const eventResult = await contract1.methods.getEvent1Locked(eventId).call();
        setEventData((prevEventData) => [...prevEventData, eventResult]);
      }
    } catch (error) {
      console.error('Error fetching event data:', error);
    }
  };

  fetchEventData();
}, [contractData]);
 console.log(contractData);
  console.log(eventData);
  
  async function onSubmit(ticketid,e) {
    try{
    
    const web3 = new Web3(window.ethereum);
    const accounts = await window.ethereum.enable();
    const selectedAddress = accounts[0];
   
    

    const contractAddress = '0xE888398a4BB89b96CBf6daa5bCF6FCF65bDAEA18';
    const contract = new web3.eth.Contract(Tickets.abi, contractAddress);
    const res = await contract.methods.resellTicketLocked(selectedAddress,ticketid).send({
      from: selectedAddress,
      gas: 5000000, 
    });
    
      console.log("success in resell")
    }catch(e){
      console.log("error",e);

    }
  }

  return (
    <div className={styles.mak}>
      <section className={styles.logoContainer}>
        <HeaderNav5/>
        <div className={styles.txt}>
          <div className={styles.txtInner}>
            <div className={styles.frameParent}>
              <div className={styles.homeParent}>
                <div className={styles.home} >
                  Home
                </div>
                <div className={styles.vectorWrapper}>
                  <img
                    className={styles.frameChild}
                    loading="lazy"
                    alt=""
                    src="/vector-17.svg"
                  />
                </div>
                <div className={styles.thriftShop}>Thrift Shop</div>
              </div>
              <div className={styles.thriftShopWrapper}>
                <div className={styles.thriftShop1}>Thrift Shop</div>
              </div>
            </div>
          </div>
          <div className={styles.wereHereToContainer}>
            <p className={styles.wereHereTo}>
              This is were you can find ticket which are up for resell
            </p>
            <p className={styles.p}></p>
          </div>
        </div>
        <SecNav4 />
        <div>
      {contractData .filter((ticketId) => parseInt(ticketId.resellPrice) !== 0)
      .map((ticketId, index) => (
        <div key={index}><main className={styles.resellInner}>
        {eventData[index] && (
         
      
<div className={styles.tr}>
     
      <div className={styles.tiket}>
      <img
        className={styles.typeInstanceIcon}
        loading="lazy"
        alt=""
        src="/frame.svg" 
        
      />
      <div className={styles.tiketInner}>
        <div className={styles.parent}>
          <div className={styles.div}>12</div>
          <div className={styles.marWrapper}>
            <div className={styles.mar}>Mar</div>
          </div>
        </div>
      </div>
      <div className={styles.concertParent}>
        <div className={styles.concert}>{eventData[index].eventType}</div>
        <div className={styles.liveInMillenniumHallParent}>
          <h3
            className={styles.liveInMillennium}
          >{`Live in Millennium Hall  `}</h3>
          <div className={styles.frameWrapper}>
            <div className={styles.frameParent}>
              <div className={styles.frameContainer}>
                <div className={styles.priceLabelInstanceParent}>
                  <div className={styles.priceLabelInstance}>
                    <div className={styles.typeLabelInstance}>
                      <div className={styles.seat}>Seat :</div>
                      <div className={styles.wrapper}>
                        <div className={styles.div1}>{parseInt( ticketId.resellPrice)}</div>
                      </div>
                    </div>
                    <div className={styles.priceParent}>
                      <div className={styles.price}>Price :</div>
                      <div className={styles.container}>
                        <div className={styles.div2}>1500</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.typeParent}>
                    <div className={styles.type}>Type :</div>
                    <div className={styles.vipWrapper}>
                      <div className={styles.vip}>VIP</div>
                    </div>
                  </div>
                </div>
              </div>
              <button className={styles.buybtns} onClick={() => onSubmit(ticketId.ticketId)} >
                <h3 className={styles.buy}>Buy</h3>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    )}
    </main>
    </div>
      ))}
      </div>


      </section>
<F00ter/>
     
    </div>
  );
};

export default Mak;