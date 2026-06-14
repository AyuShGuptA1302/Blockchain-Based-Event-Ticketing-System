import { useCallback } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import Users from "./Users.json"
const Try = () => {
    const [userData, setUserData] = useState(null);
    const [targetAddress, setTargetAddress] = useState('');
    const [addresses, setAddresses] = useState([]);
  
    useEffect(() => {
      const loadUserData = async () => {
        try {
          if (targetAddress) {
            const web3 = new Web3(window.ethereum);
            const contractAddress = '0xb7BE1E1160F08ee646B376f8cEf97141A9E5dcc3';
            const contract = new web3.eth.Contract(Users.abi, contractAddress);
  
            const user = await contract.methods.getUserLocked(targetAddress).call();
  
            if (user && Object.keys(user).length > 0) {
              const convertedUserData = {
                firstName: web3.utils.hexToAscii(user.firstName),
                role: web3.utils.hexToAscii(user.role),
                password: web3.utils.hexToAscii(user.password),
                
              };
  
              setUserData(convertedUserData);
            } else {
              console.error('Invalid user data response:', user);
            }
          } else {
            setUserData(null);
          }
        } catch (error) {
          console.error('Failed to retrieve user data:', error);
        }
      };
   
      loadUserData();
    }, [targetAddress]);
  
    useEffect(() => {
      const fetchAddresses = async () => {
        try {
          if (window.ethereum && window.ethereum.isMetaMask) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setAddresses(accounts);
            setTargetAddress(accounts[0]); 
          }
        } catch (error) {
          console.error('Failed to fetch addresses:', error);
        }
      };
  
      fetchAddresses();
    }, []);
  
    const handleAddressChange = (event) => {
      setTargetAddress(event.target.value);
    };
  
    return (
      <div>
        <div>
          <h2>Select Target Address</h2>
          <select value={targetAddress} onChange={handleAddressChange}>
            <option value="">Select an address</option>
            {addresses.map((address) => (
              <option key={address} value={address}>
                {address}
              </option>
            ))}
          </select>
        </div>
  
        {userData ? (
          <div>
            <h2>User Data</h2>
            <p>First Name: {userData.firstName}</p>
            <p>role: {userData.role}</p>
            <p>password: {userData.password}</p>
           
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    );
  };

export default Try;