import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Tickets from "./contracts/Tickets.json"; // path check kar

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [tickets, setTickets] = useState([]);

  const CONTRACT_ADDRESS = "PASTE_YOUR_CONTRACT_ADDRESS_HERE";

  // 🔥 connect wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);

      const contractInstance = new web3.eth.Contract(
        Tickets.abi,
        CONTRACT_ADDRESS
      );

      setContract(contractInstance);
      console.log("Connected:", accounts[0]);
    } else {
      alert("Install MetaMask");
    }
  };

  // 🔥 load tickets
  const loadTickets = async () => {
    if (!contract || !account) return;

    try {
      const data = await contract.methods
        .getAllTicketsLocked(account)
        .call();

      console.log("Tickets:", data);
      setTickets(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (contract) {
      loadTickets();
    }
  }, [contract]);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>🎟️ Blockchain Event Ticketing</h1>

      <button onClick={connectWallet}>
        Connect Wallet
      </button>

      {account && (
        <p style={{ color: "green" }}>
          Connected: {account}
        </p>
      )}

      <button onClick={loadTickets}>
        Load My Tickets
      </button>

      <h2>My Tickets:</h2>

      {tickets.length === 0 && <p>No tickets found</p>}

      {tickets.map((t, index) => (
        <div key={index} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <p><b>ID:</b> {t.ticketId}</p>
          <p><b>Event:</b> {t.eventId}</p>
          <p><b>Level:</b> {t.ticketLevel}</p>
          <p><b>Scanned:</b> {t.isScanned ? "Yes" : "No"}</p>
        </div>
      ))}
    </div>
  );
}

export default App;