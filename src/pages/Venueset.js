
import Txt4 from "../components/Txt4";
import SecNav2 from "../components/SecNav2";

import F00ter from "../components/F00ter";
import styles from "./Venueset.module.css";
import HeaderNav5 from "../components/HeaderNav5";
import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import Mid from "../components/Mid";


import Web3 from "web3";
import Events from "./Events.json"
import axios from "axios";
import Venues from "./Venues.json"
const web3 = new Web3(window.ethereum);
const contractAddress = '0xddBE48d8605F85Ef074EbeCCd23592C147356831';
const reg = new web3.eth.Contract(Venues.abi, contractAddress);

const Venueset = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [checkbox1Value, setCheckbox1Value] = useState('default');
  const [checkbox2Value, setCheckbox2Value] = useState('default');
  const [checkbox3Value, setCheckbox3Value] = useState('default');
  const [checkbox4Value, setCheckbox4Value] = useState('default');
  const [checkbox5Value, setCheckbox5Value] = useState('default');
  const [checkbox6Value, setCheckbox6Value] = useState('default');
 
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  }
  const handleCheckbox1Change = (event) => {
    setCheckbox1Value(event.target.checked ? 'catering' : 'default');
  };

  const handleCheckbox2Change = (event) => {
    setCheckbox2Value(event.target.checked ? 'parking' : 'default');
  };

  const handleCheckbox3Change = (event) => {
    setCheckbox3Value(event.target.checked ? 'bar' : 'default');
  };

  const handleCheckbox4Change = (event) => {
    setCheckbox4Value(event.target.checked ? 'staffing' : 'default');
  };

  const handleCheckbox5Change = (event) => {
    setCheckbox5Value(event.target.checked ? 'decore' : 'default');
  };
  const handleCheckbox6Change = (event) => {
    setCheckbox6Value(event.target.checked ? 'audiovisual' : 'default');
  };
/*
  console.log('Checkbox 1 Value:', checkbox1Value);
  console.log('Checkbox 2 Value:', checkbox2Value);
  console.log('Checkbox 3 Value:', checkbox3Value);
  console.log('Checkbox 4 Value:', checkbox4Value);
  console.log('Checkbox 5 Value:', checkbox5Value);
  console.log('Checkbox 6 Value:', checkbox6Value);*/
        // Generate a random alphanumeric string
   const generateVenueId = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 6;
    let VenueId = "";
    for (let i = 0; i < length; i++) {
        VenueId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return VenueId;
  };

  const generated= generateVenueId();
  
  const [id, setid] = useState(generated);
    const [VenueDetails, setVenueDetails] = useState({
        venueId:  generated,
        venueName: "",
        venueType: "",
        location: "",
        description: "",
        venuePhoneNo: "",
        maxCapacity: ""  
      });
      const [VenuePay, setVenuePay] = useState({
        venueId1: generated,
        price: "",
        telebirrAccount: "",
        chapaAccount: "",
        cbeAccount: ""
      });
      const [venuePhoto, setVenuePhoto] = useState({
        venueId2: generated,
        VenuePhotoAddress1: "",
        VenuePhotoAddress2: "",
        VenuePhotoAddress3: ""
      });
      const onChangeVenueDetails= (e) =>{
        const name= e.target.name;
        const value= e.target.value;
        if (name === 'selectedOption') {
          setSelectedOption(value);
        } else {
          setVenueDetails((prev) => ({
            ...prev,
            [name]: value
          }));
        }
        setVenueDetails((prev) =>{
          return{...prev, [name]: value }
        });
       
      };
console.log(selectedOption)
   
      const onChangeVenuePay = (e) => {
        const { name, value } = e.target;
        setVenuePay(prevState => ({ ...prevState, [name]: value }));
      };
      const uploadPhotoToIPFS = async (imageFile) => {
        const formData = new FormData();
        formData.append('file', imageFile);
    
        try {
          const response = await axios.post(
            'https://api.pinata.cloud/pinning/pinFileToIPFS',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                pinata_api_key: '5b612227fda9b177bba2',
                pinata_secret_api_key: '11bd106eb9798b1c269b38e319ee56ea59d1143f2406744b8481a27ab68164a4'
              }
            }
          );
          const photoAddress = response.data.IpfsHash;
          console.log('ipfs CID:', response.data.IpfsHash);
          return photoAddress;
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      };
      const handleImageSelect = async (event, photoIndex) => {
        const file = event.target.files[0];
        if (file) {
          try {
            const photoAddress = await uploadPhotoToIPFS(file);
            setVenuePhoto((prevsetVenuePhoto) => ({
              ...prevsetVenuePhoto,
              [`VenuePhotoAddress${photoIndex}`]: photoAddress
            }));
          } catch (error) {
            // Handle error
          }
        }
      };
       
      async function onSubmit(e){
        const accounts = await window.ethereum.enable();
        const senderAddress = accounts[0];
        e.preventDefault();
        try {
          const {
            venueId,
            venueName,
            location,
            description,
            venuePhoneNo,
            maxCapacity,
        } = VenueDetails;
     
        
          
            await reg.methods.createVenueLocked(
              venueId,
              venueName,
              selectedOption,
              location,
              description,
              parseInt(venuePhoneNo),
              parseInt(maxCapacity),
            ).send({
              from: senderAddress,
              gas: 5000000, 
            });
            console.log('Venue details submitted successfully');
      //////////////////////////////////////////////////
      const {
        venueId1,
        price,
        telebirrAccount,
        chapaAccount,
        cbeAccount
    } = VenuePay;
    await reg.methods.addPaymentDetails(
      venueId1,
      2,
      telebirrAccount,
      chapaAccount,
      cbeAccount,
      
    ).send({
      from: senderAddress,
      gas: 5000000, 
    });
    console.log('Venue pay submitted successfully');
    /////////////////////////////////////////////////////////////////////////////////
    const {
      venueId2,
      VenuePhotoAddress1,
      VenuePhotoAddress2,
      VenuePhotoAddress3
  } = venuePhoto;
  await reg.methods.addVenuePhotoLocked(
    venueId2,
    VenuePhotoAddress1,
    VenuePhotoAddress2,
    VenuePhotoAddress3
    
  ).send({
    from: senderAddress,
    gas: 5000000, 
  });
            console.log('Venue photo submitted successfully');
            /////////////////////////////////////////////////
          const venid=id;
      const catering= checkbox1Value;
      const parking= checkbox2Value;
      const bar= checkbox3Value;
      const staffing= checkbox4Value;
      const decore= checkbox5Value;
      const audiovisual= checkbox6Value;
       
          await reg.methods.addVenueService(
            venid,
            catering,
            parking,
            bar,
            staffing,
            decore,
            audiovisual
          ).send({
            from: senderAddress,
            gas: 5000000, 
          });
                    console.log('Venue service submitted successfully');
                    navigate(`/dv`);
      }catch (error) {
        console.error('Submission failed:', error);
      }
    }
  
//

  return (
    <div className={styles.venueset}>
      <HeaderNav5 />
      <Txt4 />
      <SecNav2 />
      <main className={styles.ancestorMerger}>
      <section className={styles.descendantMerger}>
       <div className={styles.pics}>

       <input className="VenuePhotoAddress1" type="file" onChange={(e) => handleImageSelect(e, 1)} />
      <input className="VenuePhotoAddress2" type="file" onChange={(e) => handleImageSelect(e, 2)} />
      <input className="VenuePhotoAddress3" type="file" onChange={(e) => handleImageSelect(e, 3)} />
            </div>
      <div className={styles.leafMerge}>
        <div className={styles.rootMerge}>
        
          <div className={styles.functionCall}>
           
              
           
          </div>
        </div>
      </div>
      <div className={styles.dataAggregator}>
        <div className={styles.dataAggregatorInner}>
          <div className={styles.logicGateParent}>
            <div className={styles.logicGate}>
           
              
              <div className={styles.imageBank1}>
              <div className={styles.phoneWrapper}>
                  <div className={styles.phone}>Venue Name</div>
                </div>
                <input className={styles.imageBankChild} type="text" placeholder="Venue Name"
                onChange={onChangeVenueDetails} name="venueName"
                
              />
              </div>
              <div className={styles.imageBank1}>
                <div className={styles.phoneWrapper}>
                  <div className={styles.phone}>Phone</div>
                </div>
                <input className={styles.imageBankChild} type="tel" onChange={onChangeVenueDetails} name="venuePhoneNo" />
              </div>
            </div>
            <div className={styles.imageBank1}>
                <div className={styles.phoneWrapper}>
                  <div className={styles.location}>location</div>
                </div>
                <input className={styles.location1} type="text" onChange={onChangeVenueDetails}  name="location" />
              </div>

            
            <div className={styles.geometryManipulator}>
              <div className={styles.positionArranger}>
                <div className={styles.valueSplitter}>
                  <div className={styles.propertyProcessor}>
                    <div className={styles.effectEngine}>
                      <div className={styles.seats}>Seats</div>
                    </div>
                    <input className={styles.seats1} type="number" onChange={onChangeVenueDetails}  name="maxCapacity"/>
                  </div>
                </div>
                <div className={styles.valueSplitter1}>
                  <div className={styles.priceWrapper}>
                    <div className={styles.price}>Price</div>
                  </div>
                  <input className={styles.price1} type="number" onChange={onChangeVenueDetails} name="price" />
                  <div className={styles.alignmentAligner}>
                    <div className={styles.payment}>Payment</div>
                  </div>
                </div>
                <div className={styles.expressionExpander}>
                <div className={styles.shapeEffects}>
              <div className={styles.description}>Description</div>
            </div>
                  <textarea
                    className={styles.description1}
                    rows={8}
                    cols={22}
                    onChange={onChangeVenueDetails}
                    name="description"
                  />
                </div>
              </div>
              <div className={styles.transitionTransitor}>
                <div className={styles.eventName2}>
                  <div className={styles.cbe}>
                    <div className={styles.interactionHandler}>
                      <div className={styles.cbc}>CBC</div>
                    </div>
                    <input className={styles.cbe1} type="text" onChange={onChangeVenuePay} name="cbeAccount"/>
                  </div>
                  <div className={styles.telebirr}>
                    <div className={styles.telebirrWrapper}>
                      <div className={styles.telebirr1}>TeleBirr</div>
                    </div>
                    <input className={styles.telebirr2} type="text" name="telebirrAccount"  onChange={onChangeVenuePay} />
                  </div>
                  <div className={styles.chapa}>
                    <div className={styles.chapaWrapper}>
                      <div className={styles.chapa1}>Chapa</div>
                    </div>
                    <input className={styles.chapa2} type="text"  onChange={onChangeVenuePay} name="chapaAccount"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.responseReceiver}>
          <div className={styles.connectionCreator}>
            <div className={styles.relationshipRegulator}>
              <div className={styles.parentagePreserver}>
                <div className={styles.venueType}>Venue Type</div>
              </div>
              <div className={styles.accessControl}>
                <div className={styles.venueType1}>
                  <div className={styles.lockLiberator}>
                    <div className={styles.hotel}>
                      <div className={styles.gridGeneratorWrapper}>
                        <input className={styles.gridGenerator} type="radio" value="Hotel" name="selectedOption" checked={selectedOption === 'Hotel'} onChange={onChangeVenueDetails} />
                      </div>
                      <div className={styles.hotel1}>Hotel</div>
                    </div>
                    <div className={styles.stadium}>
                      <div className={styles.stadiumInner}>
                        <input className={styles.frameChild} type="radio"  value="Stadium" name="selectedOption" checked={selectedOption === 'Stadium'} onChange={onChangeVenueDetails}/>
                      </div>
                      <div className={styles.stadium1}>Stadium</div>
                    </div>
                    <div className={styles.outdoorVenue}>
                      <div className={styles.outdoorVenueInner}>
                        <input className={styles.frameItem} type="radio"  value="Outdoor venue" name="selectedOption" checked={selectedOption === 'Outdoor venue'} onChange={onChangeVenueDetails}/>
                      </div>
                      <div
                        className={styles.outdoorVenue1}
                      >{`Outdoor  venue `}</div>
                    </div>
                    <div className={styles.concertHall}>
                      <input className={styles.contentContainer} type="radio" value="Concert Hall" name="selectedOption" checked={selectedOption === 'Concert Hall'} onChange={onChangeVenueDetails}/>
                      <div className={styles.concertHall1}>Concert Hall</div>
                    </div>
                    <div className={styles.theater}>
                      <div className={styles.theaterInner}>
                        <input className={styles.frameInner} type="radio" value="Theater" name="selectedOption" checked={selectedOption === 'Theater'} onChange={onChangeVenueDetails}/>
                      </div>
                      <div className={styles.theater1}>Theater</div>
                    </div>
                    <div className={styles.conferenceCenter}>
                      <div className={styles.conferenceCenterInner}>
                        <input className={styles.ellipseInput} type="radio"  value="Conference center" name="selectedOption" checked={selectedOption === 'Conference center'} onChange={onChangeVenueDetails}/>
                      </div>
                      <div className={styles.conferenceCenter1}>
                        Conference center
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.styleStylizer}>
                  <button className={styles.btn2}  onClick={onSubmit}>
                    <h2 className={styles.post}>Post</h2>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.linkLiberator}>
            <div className={styles.collisionControllers}>
              <div className={styles.venueService}>Venue Service</div>
            </div>
            <div className={styles.venueSercice}>
              <div className={styles.filterFactoryBuilder}>
                <div className={styles.catering}>
                  <input className={styles.frameInput} type="checkbox"   checked={checkbox1Value === 'catering'}
          onChange={handleCheckbox1Change}/>
                  <div className={styles.catering1}>Catering</div>
                </div>
                <div className={styles.parking}>
                  <input className={styles.frameInput1} type="checkbox" checked={checkbox2Value === 'parking'}
          onChange={handleCheckbox2Change}/>
                  <div className={styles.parking1}>Parking</div>
                </div>
                <div className={styles.bar}>
                  <input className={styles.frameInput2} type="checkbox"  checked={checkbox3Value === 'bar'}
          onChange={handleCheckbox3Change} />
                  <div className={styles.bar1}>{`Bar `}</div>
                </div>
                <div className={styles.staffing}>
                  <input className={styles.frameInput3} type="checkbox"checked={checkbox4Value === 'staffing'}
          onChange={handleCheckbox4Change} />
                  <div className={styles.staffing1}>Staffing</div>
                </div>
                <div className={styles.decor}>
                  <input className={styles.frameInput4} type="checkbox" checked={checkbox5Value === 'decore'}
          onChange={handleCheckbox5Change}/>
                  <div className={styles.decor1}>Decor</div>
                </div>
                <div className={styles.audiovisual}>
                  <input className={styles.frameInput5} type="checkbox"  checked={checkbox6Value === 'audiovisual'}
          onChange={handleCheckbox6Change}/>
                  <div className={styles.audiovisual1}>{`Audiovisual `}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
      </main>
      <F00ter />
    </div>
  );
};

export default Venueset;
