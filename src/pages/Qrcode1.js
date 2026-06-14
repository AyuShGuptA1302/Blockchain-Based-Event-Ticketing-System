import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from 'react-qr-code';
import Mid from "../components/Mid";
import styles from "./Qrcode.css";
import FrameContainer from "../components/FrameContainer";
import Web3 from "web3";
import Tickets from "./Tickets.json";
//
const Qrcode1 = () => {
    const queryParams = new URLSearchParams(window.location.search);
const ticketId = queryParams.get('ticketId');
console.log(ticketId);
  const [ticketIds, setTicketIds] = useState([]);
  const [qrdata, setqrdata] = useState("");
  useEffect(() => {
    const fetchTicketIds = async () => {
      try {
        if (window.ethereum && window.ethereum.isMetaMask) {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          const selectedAddress = accounts[0];
          const contractAddress = '0x425a0b610e9422605aB4Ed782ab75abB14b01F25';
          const web3 = new Web3(window.ethereum);
          const contract = new web3.eth.Contract(Tickets.abi, contractAddress);

          const result = await contract.methods.getTicketLocked(ticketId).call();
          setTicketIds(result);
          setqrdata(result.ticketId);
        }
      } catch (error) {
        console.error('Error fetching ticket IDs:', error);
      }
    };
    console.log(qrdata);
    fetchTicketIds();
  }, []);  // const qrCodeData = loadUserData();


   return (
    <div className="new">
   <QRCode value={qrdata} style={{ marginLeft: '500px' }} />
  </div>
  );
};
export default Qrcode1;