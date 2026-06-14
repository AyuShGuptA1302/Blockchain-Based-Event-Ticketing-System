import { useEffect,useCallback } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserReg.module.css";

import Web3 from "web3";
import Users from "./Users.json"
 const UserReg = () => {
  const web3 = new Web3('http://localhost:7550');
  const contractAddress = '0x29a510Fb7a917368294cd64032AcAEdEF4eC4550';
  const reg = new web3.eth.Contract(Users.abi, contractAddress);
  const [selectedOption, setSelectedOption] = useState('');
  const [senderAddress, setSenderAddress] = useState('');
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };//
  const navigate = useNavigate();
  const  [details, setdetails]=useState({
    Firstnameinput : "",
    Lastnameinput : "",
    phonenumberinput : "",
    emailinput : "",
    username : "",
    passwordinput : "",
    age:"",
    conpass: ""
  });
  const onChangehandle= (e) =>{
    const name= e.target.name;
    const value= e.target.value;
    if (name === 'selectedOption') {
      setSelectedOption(value);
    } else {
      setdetails((prev) => ({
        ...prev,
        [name]: value
      }));
    }
    setdetails((prev) =>{
      return{...prev, [name]: value }
    });
   
  };
  ////////////////////////////
  useEffect(() => {
    const getSenderAddress = async () => {
      const accounts = await web3.eth.getAccounts();
      const availableAddress = await findAvailableAddress(accounts);
      setSenderAddress(availableAddress);
    };

    getSenderAddress();
  }, []);

  const findAvailableAddress = async (accounts) => {
    for (let i = 0; i < accounts.length; i++) {
      const isAccountUsed = await reg.methods.userAccountExistanceLocked(accounts[i]).call();
      if (!isAccountUsed) {
        return accounts[i];
      }
    }
    return accounts[0]; // If all accounts are used, use the first account as the sender address
  };
  ///////////////////////////////////////////////////////
    async function onSubmit(e){
   
   console.log(senderAddress);
 
    const { Firstnameinput, Lastnameinput, emailinput, username,passwordinput,phonenumberinput,age } = details;
    const convertedFirstnameinput = web3.utils.utf8ToHex(Firstnameinput);
    const convertedLastnameinput = web3.utils.utf8ToHex(Lastnameinput);
    const convertedemailinput = web3.utils.utf8ToHex(emailinput);
    const convertedpasswordinput = web3.utils.utf8ToHex(passwordinput);
    const convertedusername = web3.utils.utf8ToHex(username);
    const convertedphonenumberinput = web3.utils.utf8ToHex(phonenumberinput);
    const convertedage = web3.utils.numberToHex(Number(age));
    const convertedconpass = web3.utils.utf8ToHex(selectedOption);

    try {
      console.log(convertedpasswordinput);
      // Call the contract function to register the user
      await reg.methods
        .createUserLocked(convertedFirstnameinput, convertedLastnameinput, convertedemailinput, convertedusername
          ,convertedpasswordinput,convertedphonenumberinput,convertedage,convertedconpass)
          .send({
            from: senderAddress,
            gas: 6000000 , // Increase the gas limit to a higher value
          });
      // Registration successful
      console.log('Registration successful!');
      if (selectedOption === 'Event') {
        navigate('/dv');
      } else if (selectedOption === 'Venue') {
        navigate('/ve');
        } else if (selectedOption === 'Client') {
        navigate('/dd');
      } else {
        navigate('/default-page');
      }
    } catch (error) {
      // Handle error
      console.error('Registration failed:', error);
    }
   
    }
  

  const onLoginTextClick = useCallback(() => {
    navigate("/user-login");
  }, [navigate]);

  return (
    <div className={styles.userReg}>
        <img className="signup-child" alt="" src="/frame-151@2x.png"  />
        <img className="signup-child" alt="" src="/frame-151@2x.png" style={{ position: 'relative',  left: '200px' }} />
      
      <img className={styles.vectorIcon} alt="" src="/vector@2x.png" />
      <img className={styles.vectorIcon1} alt="" src="/vector@2x.png" />
      <img className={styles.vectorIcon2} alt="" src="/vector@2x.png" />
      <img className={styles.vectorIcon3} alt="" src="/vector@2x.png" />
      <div className={styles.userRegChild} />
      <div className={styles.createAccount}>Create Account</div>
   
      <div className={styles.userRegItem}>

      <input type="text" className={styles.Firstnameinput} name="Firstnameinput" onChange={onChangehandle}/>
      </div>
      <div className={styles.userRegInner}>
      <input type="text" className={styles.Lastnameinput} name="Lastnameinput" onChange={onChangehandle}/>
      </div>
      <div className={styles.frameDiv}>
      <input type="number" className={styles.phonenumberinput} name="phonenumberinput" onChange={onChangehandle}/>
      </div>
      <div className={styles.userRegChild1}>
      <input type="email" className={styles.emailinput} name="emailinput" onChange={onChangehandle}/>
      </div>
      <div className={styles.userRegChild2}>
      <input type="password" className={styles.passwordinput} name="passwordinput" onChange={onChangehandle}/>
      </div>
      <div className={styles.userRegChild3}>
      <input type="text" className={styles.passwordconfirm} name="username" onChange={onChangehandle}/>
      </div>
      <div className={styles.age}>
      <input type="number" className={styles.agee} name="age" value={23} onChange={onChangehandle}/>
      </div>
      <div className={styles.conpass}>
      <input type="text" className={styles.conpass1} name="conpass"  onChange={onChangehandle}/>
      </div>
      <div className ={styles.drop}>
      <label>
        <input type="radio" value="Client" name="selectedOption" checked={selectedOption === 'Client'} onChange={onChangehandle}/>
        Client
      </label>

      <label>
        <input type="radio" value="Event" name="selectedOption" checked={selectedOption === 'Event'} onChange={onChangehandle}/>
        Event
      </label>

      <label>
        <input type="radio" value="Venue" name="selectedOption" checked={selectedOption === 'Venue'} onChange={onChangehandle}/>
        Venue
      </label>
    </div>
      <div className={styles.firstName}>
        <div className={styles.firstName1}>First name</div>
      </div>
      <div className={styles.email}>
        <div className={styles.firstName1}>Email</div>
      </div>
      <div className={styles.userAccount}>User Account</div>
      <div className={styles.phoneNumber}>
        <div className={styles.firstName1}>Phone number</div>
      </div>
      <div className={styles.password}>
        <div className={styles.firstName1}>Password</div>
      </div>
      <div className={styles.confirmPassword}>
        <div className={styles.firstName1}>username</div>
      </div>
      <div className={styles.lastName}>
        <div className={styles.firstName1}>Last name</div>
      </div>
     
      <button className={styles.signUp} onClick={onSubmit}><h1>Sign up</h1></button>
     
      
      <div
        className={styles.youAlreadyHave}
      >{`You already have a account? `}</div>
      <div className={styles.login} onClick={onLoginTextClick}>
        Login
      </div>
      <img className={styles.sda1Icon} alt="" src="/sda-1@2x.png" />
    </div>
  );
};

export default UserReg;
