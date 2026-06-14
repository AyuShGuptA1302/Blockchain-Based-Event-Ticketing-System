console.log("VIEW LOADED");
import React, { useState, useEffect } from "react";

const View = () => {
  const [account, setAccount] = useState("");

  // 🔥 Auto detect (important)
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        if (accounts.length > 0) {
          setAccount(accounts[0]);
          console.log("Already connected:", accounts[0]);
        }
      }
    };

    checkConnection();
  }, []);

  // 🔥 Connect button
  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);
      console.log("Connected:", accounts[0]);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>🎟 Blockchain Event Ticketing</h1>

      <p>Anti-Counterfeit Ticket System using NFTs</p>

      <button onClick={connectWallet}>
        Connect Wallet
      </button>

      {account && (
        <h3 style={{ marginTop: "20px", color: "green" }}>
          ✅ Connected Account: {account}
        </h3>
      )}
    </div>
  );
};

export default View;