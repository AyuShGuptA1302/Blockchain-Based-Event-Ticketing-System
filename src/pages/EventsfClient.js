import { useState, useEffect } from "react";
import "./EventsfClient.css";
import HeaderNav5 from "../components/HeaderNav5";
import { useNavigate } from "react-router-dom";
import Events from "./Events.json";
import Web3 from "web3";
import { Link } from "react-router-dom";
import SecNav4 from "../components/SecNav4";
const EventsfClient = () => {
  const navigate = useNavigate();
   function onHomeTextClick() {
    navigate("/event");
  }
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
    <div className="EventsfClient">
    <HeaderNav5/>
       
    <div className="txt1">
      <div className="home-parent">
      
        
       
      </div>
      <div className="frame-parent5">
        <div className="concert-container">
          <h1 className="concert6">Concert</h1>
        </div>
        <div className="were-here-to-container1">
          <p className="were-here-to1">
            We're here to assist you. Contact us by email, chat, or phone if you
            have any questions.
          </p>
          <p className="p1"></p>
          
        </div>
      </div>
    </div>
          <SecNav4/>
       <div className="sec-nav">
      <div className="sec-nav1">
        <img
          className="ghbkfdjcsx-icon"
          loading="lazy"
          alt=""
          src="/ghbkfdjcsx@2x.png"
        />
        <div className="concert">Concert</div>
      </div>
      <div className="sec-nav2">
        <img
          className="ghbkfdjcsx-icon1"
          loading="lazy"
          alt=""
          src="/ghbkfdjcsx-1@2x.png"
        />
        <div className="concert1">Sport</div>
      </div>
      <div className="sec-nav3">
        <img
          className="ghbkfdjcsx-icon2"
          loading="lazy"
          alt=""
          src="/ghbkfdjcsx-2@2x.png"
        />
        <div className="concert2">E_sports</div>
      </div>
      <div className="sec-nav4">
        <img
          className="ghbkfdjcsx-icon3"
          loading="lazy"
          alt=""
          src="/ghbkfdjcsx-3@2x.png"
        />
        <div className="concert3">{`Food & Drink`}</div>
      </div>
      <div className="sec-nav5">
        <img
          className="ghbkfdjcsx-icon4"
          loading="lazy"
          alt=""
          src="/ghbkfdjcsx-4@2x.png"
        />
        <div className="concert4">Other</div>
      </div>
    </div>
    <div className="flex-row-container">
        {contractData
          .filter((event) => event.status === 'available')
          .map((event, index) => (
            <div key={index} >
         
        <div>
       <div className="flex-item">
       
            
            <div className="wrapper">
            <div className="banner-image">
           
               
                  <img src={`https://gateway.ipfs.io/ipfs/${event.eventPhotoAddress}`} alt="" className="banner-image__img"/>
                </div>
            </div>
            <div className="button-wrapper"> 
            <h2  className="h2"> {event.eventName}</h2>
            <Link to={`/Event/${event.eventId}`}>
              <button className="btn fill" >BUY NOW</button>
             </Link>
            </div>
          
          </div>
       
          
        
          
           

          </div>
          </div>
          ))}
      </div>
        </div>
       


       
      
        

      
  );
};

export default EventsfClient;
