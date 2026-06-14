import { useEffect,useCallback, useState } from "react";
import { Redirect,useNavigate } from "react-router-dom";
import styles from "./UserLogin.module.css";
import FrameContainer from "../components/FrameContainer";
import Web3 from 'web3';
import Users from "./Users.json"



 const UserLogin = () => {
  const navigate = useNavigate();
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const [loginError, setLoginError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const contractAddress = '0x29a510Fb7a917368294cd64032AcAEdEF4eC4550';
//
  const onChangehandlelog =(e) =>{
 
    setemail(e.target.value);
   
  };
  const onChangehandlepass =(e) =>{
   
    setpassword(e.target.value);
    
  };
  async function onlogin(e){
    try {
      const web3 = new Web3(window.ethereum);
      
      const convertedconpass = web3.utils.utf8ToHex(password);
      const contract = new web3.eth.Contract(Users.abi, contractAddress);
      const accounts = await window.ethereum.enable();
      const senderAddress = accounts[0];
  
      const response = await contract.methods.verifyUser2(convertedconpass).call({ from: senderAddress });
      const userLocked = response;
      const roles= web3.utils.hexToAscii(userLocked.role);
      console.log(roles);
      // Access the role information and navigate to different pages based on it
      if (roles === 'Event') {
        navigate('/dv');
      } else if (roles === 'Venue') {
        navigate('/ev');
        } else if (roles === 'Client') {
        navigate('/dd');
      } else {
        navigate('/default-page');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
      
  
  const onSignupTextClick = useCallback(() => {
    navigate("/user-reg");
  }, [navigate]);
  const onUserTextClick = useCallback(() => {
    navigate("/user-reg");
  }, [navigate]);

  return (
    <div className={styles.userLogin}>
       
      <img className={styles.vectorIcon} alt="" src="/vector@2x.png" />
      <img className={styles.vectorIcon1} alt="" src="/vector@2x.png" />
      <img className={styles.vectorIcon2} alt="" src="/vector@2x.png" />
      <img className={styles.vectorIcon3} alt="" src="/vector@2x.png" />
      <img className={styles.userLoginChild} alt="" src="/rectangle-2@2x.png" />
      <div className={styles.signIn}>Sign in</div>
      <img
        className={styles.d418411193784811Icon}
        alt=""
        src="/d41841119378481-1@2x.png"
      />
      <div className={styles.userLoginItem} >
        <input type="text" className={styles.emailinput} name="email" onChange={onChangehandlelog}/>
     </div>
      <div className={styles.email}>
        <div className={styles.email1}>address
      
        </div>
      </div>
      <div className={styles.userAccount}>User Account</div>
      <div className={styles.userLoginInner}>
      <input type="password" className={styles.passwordinput} name="password" onChange={onChangehandlepass} />
      
        </div>
      <div className={styles.password}>
        <div className={styles.email1}>Password</div>
      </div>
      <div className={styles.xWrapper}>
        <img className={styles.xIcon} alt="" src="/x@2x.png" />
      </div>
    
     
     
      <button className={styles.logIn} onClick={onlogin}><h1>Log in</h1></button>
      {loginError && <p>{loginError}</p>}
      <div ><button className={styles.logInUsing}> Log in using Facebook</button></div>
      <img className={styles.fIcon} alt="" src="/f@2x.png" />
      <div ><button className={styles.logInUsing1}> Log in using Google</button></div>
      <img className={styles.gIcon} alt="" src="/g@2x.png" />
      <div ><button className={styles.logInUsing2}> Log in using X</button></div>
      <img className={styles.log1Icon} alt="" src="/log-1@2x.png" />
      <div className={styles.youDontHave}>{`You don’t have a account? `}</div>
      <div className={styles.signup} onClick={onSignupTextClick}>
        Signup
      </div>
      <img className={styles.sda1Icon} alt="" src="/sda-1@2x.png" />
    </div>
  ); 
};

export default UserLogin;
