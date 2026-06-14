import HeaderNav10 from "../components/HeaderNav5";
import { useEffect,useCallback } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FrameComponent21 from "../components/FrameComponent21";

import F00ter4 from "../components/F00ter";
import styles from "./Userman.module.css";
import Web3 from "web3";
import Users from "./Users.json"
import SecNav2 from "../components/SecNav2";
const Userman = () => {
  const navigate = useNavigate();
  const web3 = new Web3('http://localhost:7550');
  const contractAddress = '0x29a510Fb7a917368294cd64032AcAEdEF4eC4550';
  const reg = new web3.eth.Contract(Users.abi, contractAddress);
  const  [details, setdetails]=useState({
    Firstnameinput : "",
    Lastnameinput : "",
    phonenumberinput : "",
    emailinput : "",
    username : "",
    passwordinput : "",
  });
  const onChangehandle= (e) =>{
    const name= e.target.name;
    const value= e.target.value;
      setdetails((prev) => ({
        ...prev,
        [name]: value
      }));
     
  };
  function handleImageSelect(){
    
  }
  async function onSubmit(e){
   
    const accounts = await window.ethereum.enable();
    const senderAddress = accounts[0];
    console.log(senderAddress);
  
     const { Firstnameinput, Lastnameinput, emailinput, username,passwordinput,phonenumberinput } = details;
     const convertedFirstnameinput = web3.utils.utf8ToHex(Firstnameinput);
     const convertedLastnameinput = web3.utils.utf8ToHex(Lastnameinput);
     const convertedemailinput = web3.utils.utf8ToHex(emailinput);
     const convertedpasswordinput = web3.utils.utf8ToHex(passwordinput);
     const convertedusername = web3.utils.utf8ToHex(username);
     const convertedphonenumberinput = web3.utils.utf8ToHex(phonenumberinput);
   

 
     try {
       console.log(convertedpasswordinput);
       // Call the contract function to register the user
       await reg.methods
         .updateUserLocked(senderAddress,convertedFirstnameinput, convertedLastnameinput, convertedemailinput, convertedusername
           ,convertedpasswordinput,convertedphonenumberinput)
           .send({
             from: senderAddress,
             gas: 6000000 , // Increase the gas limit to a higher value
           });
       // Registration successful
    console.log("success")
    
     } catch (error) {
       // Handle error
       console.error('Registration failed:', error);
     }
    
     }
   
 
   const onLoginTextClick = useCallback(() => {
     navigate("/user-login");
   }, [navigate]);
 
  
  return (
    <div className={styles.userman}>
      <HeaderNav10 />
      <FrameComponent21 />
      <SecNav2/>
      <main className={styles.usermanInner}>
        <section className={styles.frameParent}>
         <div className={styles.frameParent}>
      <div className={styles.frameWrapper}>
        <div className={styles.fitstNameParent}>
         
         
         
        </div>
      </div>
      
      <div className={styles.roleField}>
        <div className={styles.fitstNameGroup}>
        <div className={styles.fitstName}>First Name</div>
          <input className={styles.fitstName1} type="text" onChange={onChangehandle} name="Firstnameinput"/>
          <div >
            <div >Age</div>
            <input className={styles.age} type="text" />
          </div>
        </div>
        <div className={styles.EmailGroup}>
        <div className={styles.Email}>Email</div>
        <input className={styles.Email1} type="text" onChange={onChangehandle}name="emailinput" style={{width: '340px', }}/></div>
        <div className={styles.termsAndConditions}>
          <div className={styles.privacyPolicy}>
          <div className={styles.lastNameLabel}>
            <div className={styles.lastName}>Last Name</div>
          </div>
            <input className={styles.lastName1} type="text" onChange={onChangehandle} name="Lastnameinput" />
            <div className={styles.roleLabel}>
              
            </div>
          </div>
        </div>
        <div className={styles.roleFieldInner}>
          <div className={styles.usernameParent}>
        
            <div className={styles.username}>Username</div>
          
            <input className={styles.username1} type="text" onChange={onChangehandle} name="username"/>

          </div>
        </div>
      </div>
    </div>
          <div className={styles.buttonPostWrapper}>
            <div className={styles.buttonPost}>
              
              <div className={styles.passwordWrapper}>
              <div className={styles}>Password</div>
                <input className={styles.password} type="password" onChange={onChangehandle} name="passwordinput"/>
              </div>
              <div className={styles.confirmPassword2}>Confirm Password</div>
              <input className={styles.confirmPassword1} type="password" style={{width: '340px' ,height:'77px'}}  />
            </div>
          </div>
          <div className={styles.frameWrapper}>
            <div className={styles.frameGroup}>
              <div className={styles.contactUsButtonParent}>
                <div className={styles.contactUsButton}>
                  <div className={styles.phone}>Phone</div>
                </div>
                <input className={styles.photo} type="file" onChange={handleImageSelect} />
                <div className={styles.clientOrganizerVenueContain}>
                  <input
                    className={styles.clientOrganizerVenueContainChild}
                    type="tel"
                    onChange={onChangehandle}
                    name="phonenumberinput"
                  />
                </div>
                <div className={styles.btnPost}>
                  <div className={styles.roleWrapper}>
                    <div className={styles.role}>Role</div>
                  </div>
                  <div className={styles.venueType}>
                    <div className={styles.hotelParent}>
                      <div className={styles.hotel}>
                        <div className={styles.hotelInner}>
                          <input
                            className={styles.frameChild}
                            checked={true}
                            disabled={true}
                            type="radio"
                            onChange={onChangehandle}
                          />
                        </div>
                        <div className={styles.client}>Client</div>
                      </div>
                      <div className={styles.stadium}>
                        <div className={styles.stadiumInner}>
                          <input
                            className={styles.frameItem}
                            disabled={true}
                            type="radio"
                          />
                        </div>
                        <div className={styles.eventOrganizer}>
                          Event Organizer
                        </div>
                      </div>
                      <div className={styles.outdoorVenue}>
                        <div className={styles.outdoorVenueInner}>
                          <input
                            className={styles.frameInner}
                            disabled={true}
                            type="radio"
                          />
                        </div>
                        <div className={styles.venue}>{`Venue `}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.socialIcons}>
                <button className={styles.btn2} onClick={onSubmit}>
                  <h2 className={styles.post}>Post</h2>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <F00ter4 />
    </div>
  );
};

export default Userman;
