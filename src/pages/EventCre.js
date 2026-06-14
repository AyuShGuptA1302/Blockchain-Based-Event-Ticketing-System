
import Txt2 from "../components/Txt2";

import Secevent from "../components/Secevent";
import F00ter from "../components/F00ter";
import styles from "./EventCre.module.css";
import HeaderNav5 from "../components/HeaderNav5";
import React, { useState, useMemo,useEffect } from 'react';

import { format } from 'date-fns';
import moment from 'moment';


//import { useState } from "react";

import Mid from "../components/Mid";
import { useNavigate, useParams } from "react-router-dom";


import Web3 from "web3";
import Events from "./Events.json"
import axios from "axios";
import Venues from "./Venues.json"

const EventCre = () => {
  const [eventType, setEventType] = useState('');
  const [year,setYear] = useState()
  const [yearconverted,setYearconverted] = useState()
  const [yearconverted2,setYearconverted2] = useState()
const web3 = new Web3(window.ethereum);
const contractAddress = '0x3daA6Ce4916A3652782A531Cdf6b13eea0dEE336';
const reg = new web3.eth.Contract(Events.abi, contractAddress);
/////////////////////FOR VENUE//////////////////////////////////

const contractAddress1 = '0xddBE48d8605F85Ef074EbeCCd23592C147356831';
const reg1 = new web3.eth.Contract(Venues.abi, contractAddress1);

  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
const venueId = queryParams.get('venueId');
//const [venue, setVenueID] = useState("");
//setVenueID(venueId);
   // Generate a random alphanumeric string
   const generateEventId = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 6;
    let eventId = "";
    for (let i = 0; i < length; i++) {
      eventId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return eventId;
  };
  //For image upload tp pinata
  const uploadPhotoToIPFS = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
  
    try {
      const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          pinata_api_key: '5b612227fda9b177bba2',
          pinata_secret_api_key: '11bd106eb9798b1c269b38e319ee56ea59d1143f2406744b8481a27ab68164a4',
        },
      });
      const photoAddress = response.data.IpfsHash;
      console.log('ipfs CID:', response.data.IpfsHash);
      return photoAddress;
    } catch (error) {
      console.error('Error uploading image:', error);
    }//////////////////////////////////////////////
   
     
  };
///////////////////////////////////////////////////////////////////  
  function handleChange(event){
    var inputdateinms= Math.floor(new Date(event.target.value)/1000)
    var outputdate= (new Date(inputdateinms*1000))
    console.log( inputdateinms)

    console.log(outputdate)
    setYear(inputdateinms);
    //setYearconverted2(moment(yearconverted).format('YYYY/MM/DD HH:mm:ss'))
  }
  

  const handleImageSelect = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const photoAddress = await uploadPhotoToIPFS(file);
        setEventDetails(prevEventDetails => ({
          ...prevEventDetails,
          eventPhotoAddress: photoAddress
        }));
      } catch (error) {
        // Handle error
      }
    }
  };
    const val=generateEventId();
    const [pay, setpay] = useState({
   cbe: "",
   tele: "",
   chapa: ""
    });
  const [eventDetails, setEventDetails] = useState({
    eventId:  val,
    venueId: venueId,
    eventName: "",
    description: "",
    eventPhoneNo: "",
    eventPhotoAddress: "",
  });

  const [ticketDetails, setTicketDetails] = useState({
    eventId1: val,
    normalPrice: "",
    vipPrice: "",
    vipTickets:"",
    ticketNo: "",
    age: ""
  });
  const onChangeEventDetails = (e) => {
    const { name, value } = e.target;
    setEventDetails(prevState => ({ ...prevState, [name]: value }));
  };

  const onChangeTicketDetails = (e) => {
    const { name, value } = e.target;
    setTicketDetails(prevState => ({ ...prevState, [name]: value }));
  };
  const onpay = (e) => {
    const { name, value } = e.target;
    setpay(prevState => ({ ...prevState, [name]: value }));
  };
 
  async function onSubmit(e){
    e.preventDefault();
    const accounts = await window.ethereum.enable();
    const senderAddress = accounts[0];
    try {
      
      const {
        eventId,
        venueId,
        eventName,
        description,
        eventPhoneNo,
        eventPhotoAddress
      } = eventDetails;
const eventtype =eventType;
const ven = venueId;
await reg1.methods.addBookedDate(
  ven,
  year,
).send({
  from: senderAddress,
  gas: 5000000, // Increase the gas limit if needed
});

      await reg.methods.createEventLocked(
        eventId,
        venueId,
        eventName,
        eventtype,
        description,
        parseInt(eventPhoneNo),
        12,
        eventPhotoAddress
      ).send({
        from: senderAddress,
        gas: 5000000, 
      });

      console.log('Event details submitted successfully');

      const {
        eventId1,
     
        normalPrice,
        vipPrice,
        vipTickets,
        ticketNo,
        age
      } = ticketDetails;
     
      
      await reg.methods.createEvent2Locked(
        eventId1,
        parseInt(normalPrice),
        parseInt(vipPrice),
        parseInt(vipTickets),
        parseInt(ticketNo),
        parseInt(age)
      ).send({
        from: senderAddress,
        gas: 5000000, // Increase the gas limit if needed
      });


      console.log('Ticket details submitted successfully');

console.log(ven);
const {cbe,tele,chapa}=pay
await reg.methods.addPaymentDetails(
  eventId1,
 cbe,
 tele,
 chapa
).send({
  from: senderAddress,
  gas: 5000000, 
});


      await reg1.methods.updateStatusVenueLocked(
        ven,
        "Pending",
      ).send({
        from: senderAddress,
        gas: 5000000, 
      });
      console.log('Venue status submitted successfully');

           navigate(`/eventmanage`);
    
    
    } catch (error) {
      console.error('Submission failed:', error);
    }


  };

 

  const handleEventTypeChange = (event) => {
    // Handle the selected event type here
    setEventType(event.target.value);
  };

  const propMarginTop = '2px';
const propWidth = '221px';
const propMinWidth = '100px';
const eventTypeAlignSelf = 'center';
const eventTypeWidth = '221%';
const eventTypeFlex = '50';

  const eventTypeStyle = useMemo(() => {
    return {
      marginTop: propMarginTop,
      alignSelf: eventTypeAlignSelf,
      width: eventTypeWidth,
      flex: eventTypeFlex,
    };
  }, [propMarginTop, eventTypeAlignSelf, eventTypeWidth, eventTypeFlex]);

  const helpResourcesButtonStyle = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  const eventType1Style = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);
  
  return (
    <div className={styles.eventCre}>
      <HeaderNav5 />
      <Txt2 />
      <Secevent/>
      <section className={styles.eventCreInner}>
        <div className={styles.frameParent}>
          <div className={styles.frameWrapper}>
            <div className={styles.eventNameParent}>
              <div className={styles.eventName}>
                <input className={styles.eventName1} type="text" onChange={onChangeEventDetails} name="eventName" />
                <button className={styles.eventName2}>
                  <div className={styles.eventName3}>Event Name</div>
                </button>
              </div>
              <div className={styles.frameContainer}>
                <div className={styles.frameGroup}>
                  <div className={styles.venueNameWrapper}>
                    <div className={styles.venueName}>
                    <input type="datetime-local" name= "year"  onChange={handleChange}/>
                     
                        <div className={styles.venueName2}>Date</div>
                     
                    </div>
                  </div>
                  <div className={styles.phone}>
                    <input className={styles.privacyPolicyLabel} type="tel" onChange={onChangeEventDetails} name="eventPhoneNo"/>
                    <button className={styles.phone1}>
                      <div className={styles.phone2}>Phone</div>
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles.frameDiv}>
                <div className={styles.frameParent1}>
                  <div className={styles.eventTypeWrapper}>
                  <div className={styles.eventType} style={eventTypeStyle}>
      <select
        className={styles.helpResourcesButton}
        style={helpResourcesButtonStyle}
        onChange={handleEventTypeChange}
      >
        <option value=""></option>
        <option value="concert">Concert</option>
        <option value="sport">Sport</option>
        <option value="esport">E-Sports</option>
        <option value="food">Food & Drinks</option>
        <option value="other">Other</option>
        {/* Add more options as needed */}
      </select>
      <label className={styles.eventType1}>
            <div className={styles.eventType2} >
              Event type
            </div>
          </label>
    </div>

                  </div>
                  <div className={styles.vipPrice}>
                    <input className={styles.vipPriceChild} type="text" onChange={onChangeTicketDetails} name="vipPrice" />
                    <button className={styles.vipPrice1}>
                      <div className={styles.vipPrice2}>VIP Price</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>



          <div className={styles.frameParent2}>
            <div className={styles.frameParent3}>
              <div className={styles.photoParent}>
                <input className={styles.photo} type="file" onChange={handleImageSelect} />
                <div className={styles.descriptionWrapper}>
                  <textarea
                    className={styles.description}
                    placeholder="Description"
                    rows={8}
                    cols={22}
                    onChange={onChangeEventDetails}
                    name="description"
                  />
                </div>
              </div>
              <div className={styles.ageWrapper}>
                <div className={styles.age}>
                  <input className={styles.ageChild} type="text" onChange={onChangeTicketDetails} name="age"/>
                  <button className={styles.age1}>
                    <div className={styles.age2}>Age</div>
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.frameParent4}>
              <div className={styles.frameParent5}>
                <div className={styles.frameParent6}>
                  <div className={styles.numberOfSitsWrapper}>
                    <div className={styles.numberOfSits}>
                      <input className={styles.fAQLabel} type="number" onChange={onChangeTicketDetails} name="vipTickets" />
                      <button className={styles.numberOfSits1}>
                        <div className={styles.numberOfSits2}>
                          VIP Seats
                        </div>
                      </button>
                    </div>
                  </div>

                  
                  
                  <div className={styles.npWrapper}>
                <div className={styles.np}>
                  <input className={styles.npChild} type="text" onChange={onChangeTicketDetails} name="normalPrice" />
                  <button className={styles.np1}>
                    <div className={styles.np2}>Normal price</div>
                    </button>
                    </div>
                      </div>
                       </div>

                       <div className={styles.vpWrapper}>
                <div className={styles.vp}>
                  <input className={styles.vpChild} type="number"  onChange={onChangeTicketDetails} name="ticketNo"/>
                  <button className={styles.vp1}>
                    <div className={styles.vp2}>Normal Seats</div>
                    </button>
                    </div>
                      </div>
                       

                <div className={styles.paymentWrapper}>
                  <div className={styles.payment}>
                    <div className={styles.eventName4}>
                      <div className={styles.cbe}>
                        <div className={styles.cbcWrapper}>
                          <div className={styles.cbc}>CBE</div>
                        </div>
                        <input className={styles.cbe1} type="text"  name= "cbe"onChange={onpay}/>
                      </div>
                      <div className={styles.telebirr}>
                        <div className={styles.telebirrWrapper}>
                          <div className={styles.telebirr1}>TeleBirr</div>
                        </div>
                        <input className={styles.telebirr2} type="text" name= "tele" onChange={onpay}/>
                      </div>
                      <div className={styles.chapa}>
                        <div className={styles.chapaWrapper}>
                          <div className={styles.chapa1}>Chapa</div>
                        </div>
                        <input className={styles.chapa2} type="text" name= "chapa" onChange={onpay} />
                      </div>
                    </div>
                    <div className={styles.payment1}>
                      <div className={styles.payment2}>Payment</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.postWrapper}>
                <button className={styles.post} onClick={onSubmit}>
                  <div className={styles.post1}>Post</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={styles.eventCreChild} />
      <div className={styles.eventCreItem} />
     
      <F00ter />
    </div>
  );
};

export default EventCre;
