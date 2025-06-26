import React, { useEffect, useState } from "react";
import { BrowserProvider, Contract, formatEther } from "ethers";
import ABI from "./abi/GcoinToken.json";
import { CONTRACT_ADDRESS } from "./utils/config";
import "./App.css";

const App = () => {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [contract, setContract] = useState(null);
  const [rewardAddress, setRewardAddress] = useState("");
  const [rewardAmount, setRewardAmount] = useState("");

  useEffect(() => {
    const autoConnect = async () => {
      if (!window.ethereum) return;

      try {
        const provider = new BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_accounts", []);

        if (accounts.length > 0) {
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          const recoin = new Contract(CONTRACT_ADDRESS, ABI.abi, signer);
          const bal = await recoin.balanceOf(address);

          setAccount(address);
          setBalance(formatEther(bal));
          setContract(recoin);
        }
      } catch (err) {
        console.error("Auto-connect failed:", err.message);
      }
    };

    autoConnect();
  }, []);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return alert("Metamask not found");

      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      const recoin = new Contract(CONTRACT_ADDRESS, ABI.abi, signer);
      const bal = await recoin.balanceOf(address);

      setAccount(address);
      setBalance(formatEther(bal));
      setContract(recoin);
    } catch (err) {
      console.error("Wallet connection failed:", err.message);
    }
  };

  const handleReward = async () => {
    if (!contract) return alert("Connect wallet first");

    if (!rewardAddress || !rewardAmount) {
      return alert("Please enter a recipient and amount.");
    }

    try {
      const res = await fetch("http://localhost:5000/api/reward", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: rewardAddress,
          amount: rewardAmount,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert(`Rewarded ${rewardAmount} GCN!`);
        const bal = await contract.balanceOf(account);
        setBalance(formatEther(bal));
      } else {
        alert("Failed: " + data.error);
      }
    } catch (err) {
      console.error("Error sending reward:", err.message);
    }
  };

  const disconnectWallet = () => {
    setAccount("");
  }

  return (
    <div className="container">
      <h1>Recoin Wallet</h1>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <>
          <p>
            <b>Connected:</b> {account}
          </p>
          {account && <><button onClick={disconnectWallet}>Disconnect</button></>}
          <p>
            <b>Balance:</b> {balance} GCN
          </p>

          <div className="reward-section">
            <h3>Reward (Owner Only)</h3>
            <input
              placeholder="Recipient address"
              value={rewardAddress}
              onChange={(e) => setRewardAddress(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={rewardAmount}
              onChange={(e) => setRewardAmount(e.target.value)}
            />
            <button onClick={handleReward}>Mint Token</button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
