import { useCallback } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import Events from "./Events.json";
import { Link } from "react-router-dom";
import FrameContainer from "../components/FrameContainer";
import styles from "./DisplayVenues.module.css";
import Venues from "./Venues.json"
import HeaderNav5 from "../components/HeaderNav5";
import Txt4 from "../components/Txt4";
import SecNav2 from "../components/SecNav2";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
const Displayvenue = () => {
  
  const [venuePhotos, setVenuePhotos] = useState([]);
const [venueNames, setVenueNames] = useState([]);

useEffect(() => {
    const fetchData = async () => {
      try {
        await window.ethereum.enable();
const web3 = new Web3(window.ethereum);
const contractAddress = '0xddBE48d8605F85Ef074EbeCCd23592C147356831'; 
const contract = new web3.eth.Contract(Venues.abi, contractAddress);
const options = {
  gas: 8000000, 
};
        const photoAddresses = await contract.methods.getAllPhotoAddress().call(options);
        const venuesLocked = await contract.methods.getAllVenuesLocked().call(options);
    
        // Extract the venue photos and names from the returned data
        const photos = photoAddresses.map((address) => address.photo1);
        const names = venuesLocked.map((venue) => venue.venueName);
    
        setVenuePhotos(photoAddresses);
        setVenueNames(venuesLocked);
      } catch (error) {
        console.error(error);
      }
    };
    
      fetchData();
    }, []);
 
 
 console.log(venueNames)
 //const id = contractDataa[0].venueId;
  return (
    <div className={styles.container}>
        <HeaderNav5 />
      <Txt4 />
      <SecNav2 />
      <header className={styles.header}>
        
      </header>
      <main className={styles.main}>
        <ul className={styles.eventGrid}>
       
  <li >
 
  {venuePhotos.map((event, index) => (
  <div key={index} className={styles.eventItem}>
    <div className="carousel-container">
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        autoPlay={true}
        interval={4000}
        showStatus={false}
        showThumbs={false}
      >
        {event.photo1 && (
          <Link to={`/Venue/${event.venueId}`}>
            <img src={`https://gateway.ipfs.io/ipfs/${event.photo1}`} alt="Event Preview" style={{ width: '1634px', height: '642px' }} />
          </Link>
        )}
        {event.photo2 && (

          <Link to={`/Venue/${event.venueId}`}>
            <img src={`https://gateway.ipfs.io/ipfs/${event.photo2}`} alt="Event Preview" style={{ width: '1634px', height: '642px' }} />
          </Link>
        )}
        {event.photo3 && (

<Link to={`/Venue/${event.venueId}`}>
  <img src={`https://gateway.ipfs.io/ipfs/${event.photo3}`} alt="Event Preview" style={{ width: '1634px', height: '642px' }} />
</Link>
)}
      </Carousel>
    
    </div>
   
    <div className={styles.eventContent}></div>
   
    {venueNames[index] && <h2 className={styles.hh}> Venue Name:   {venueNames[index].venueName}</h2>}
    <Link to={`/Venue/${event.venueId}`}><button className={styles.but}> Details</button> </Link>
  
  </div>
))}
 


  </li>

        </ul>
        
       
      </main>
    </div>
  );
  };

export default Displayvenue;