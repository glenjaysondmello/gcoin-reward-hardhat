const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { ethers, parseUnits } = require("ethers");
const ABI = require("./abi/GcoinToken.json");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const gcoin = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  ABI.abi,
  wallet
);

app.post("/api/reward", async (req, res) => {
  const { to, amount } = req.body;

  try {
    const tx = gcoin.rewardUser(to, parseUnits(amount, 18));
    await tx.wait();
    res.json({ success: true, hash: tx.hash });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.listen(5000, () => {
  console.log("Backend is running on Port 5000");
});
