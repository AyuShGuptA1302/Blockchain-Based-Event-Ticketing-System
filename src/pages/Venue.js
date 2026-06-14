import React,{ useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Web3 from "web3";
import Events from "./Events";
import Tickets from "./Tickets.json";
import styles from "./Venue.module.css";
import FrameContainer from "../components/FrameContainer";
import Venues from "./Venues.json"
import HeaderNav5 from "../components/HeaderNav5";
import Txt4 from "../components/Txt4";
import SecNav2 from "../components/SecNav2";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { format } from 'date-fns';
const Venue = () => {

  const navigate = useNavigate();
  const [photo, setphoto] = useState(null);
  const [service, setservice] = useState(null);
  const [venue, setvenue] = useState(null);
  const [payment, setpayment] = useState(null);
  const [datess, setdate] = useState([]);
  const { venueId } = useParams();
 
  const handleButtonClick = () => {
    navigate(`/ev?venueId=${venueId}`);
  };
//
  useEffect(() => {
    const fetchEventLocked = async () => {
      try {
       
        await window.ethereum.enable();
        const web3 = new Web3(window.ethereum);

        // Create a contract instance
        const contractAddress = '0xddBE48d8605F85Ef074EbeCCd23592C147356831';
        const contract = new web3.eth.Contract(Venues.abi, contractAddress);

        const venuesLocked = await contract.methods.getVenueLocked(venueId).call();
        const payment = await contract.methods.getPaymentDetails(venueId).call();
        const venueservice = await contract.methods.getVenueService(venueId).call();
        const photoAddresses = await contract.methods.getPhotoAddress(venueId).call();
        const dates = await contract.methods.getBookedDates(venueId).call();
        setphoto(photoAddresses);
        setservice(venueservice);
        setpayment(payment);
        setvenue(venuesLocked);
        setdate(dates);
      } catch (error) {
        console.error('Error fetching event details from the contract:', error);
      }
    };
  
    fetchEventLocked();
  }, [venueId]);

  var output = [];
  for (let i = 0; i < datess.length; i++) {
    const out = new Date(parseInt(datess[i].date) * 1000);
    output.push(out.toString());
  }

  if (!venue) {
    return <div>Loading...</div>;
  }
  console.log(datess);
  const dateElements = output.map((date, index) => (
    <React.Fragment key={index}>
      {date}
      <br/>
    </React.Fragment>
  ));
  
  return (
    <div className={styles.eventContainer}>
    <HeaderNav5 />
      <Txt4 />
      <SecNav2 />
    <h1 className={styles.eventTitle}>Venue Details</h1>
    <div className={styles.eventItem}>
    <div className="carousel-container">
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        autoPlay={true}
        interval={4000}
        showStatus={false}
        showThumbs={false}
      >
      <img
        className={styles.eventImage}
        src={`https://gateway.ipfs.io/ipfs/${photo.photo1}`}
        alt="Event Preview"
      />
       <img
        className={styles.eventImage}
        src={`https://gateway.ipfs.io/ipfs/${photo.photo2}`}
        alt="Event Preview"
      />
       <img
        className={styles.eventImage}
        src={`https://gateway.ipfs.io/ipfs/${photo.photo3}`}
        alt="Event Preview"
      />
       </Carousel>
    </div>
      <h2 className={styles.eventInfo}>Venue Name: {venue.venueName}</h2>
      <h2 className={styles.eventInfo}>Venue Type: {venue.venueType}</h2>
      <h2 className={styles.eventInfo}>Venue location: {venue.location}</h2>
      <h2 className={styles.eventInfo}>Venue Description: {venue.description}</h2>
      <h2 className={styles.eventInfo}>Venue Phone Number: {parseInt(venue.venuePhoneNo)}</h2>
      <h2 className={styles.eventInfo}>Venues maxCapacity: {parseInt(venue.maxCapacity)}</h2>

      <h2 className={styles.eventInfo}>Venue is Booked on:</h2>
      <h2>{dateElements}</h2>
      <h2 className={styles.eventInfo}>
  Venue services provided: {service.parking && service.parking !== 'default' && <span>{service.parking} </span>}
  {service.catering && service.catering !== 'default' && <span>{service.catering} </span>}
  {service.bar && service.bar !== 'default' && <span>{service.bar} </span>}
  {service.bar && service.bar !== 'default' && <span>{service.staffing}, </span>}
  {service.bar && service.bar !== 'default' && <span>{service.decore}, </span>}
  {service.bar && service.bar !== 'default' && <span>{service.audiovisual}</span>}
</h2> 
<h2 className={styles.eventInfo}>Venue Price: {parseInt(payment.price)}</h2>
<h2 className={styles.eventInfo}>CBE Account: {parseInt(payment.cbeAccount)}</h2>
<h2 className={styles.eventInfo}>TeleBirr Number: {parseInt(payment.telebirrAccount)}</h2>
<h2 className={styles.eventInfo}>Chapa Account: {parseInt(payment.chapaAccount)}</h2>   
    </div>
    <button className={styles.button} onClick={handleButtonClick} >
      Select Venue
    </button>
   
  </div>
  );
};

export default Venue;