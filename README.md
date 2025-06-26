Here is your complete `README.md` content for the **GcoinToken Full Stack Project**, covering Hardhat, Backend, and Frontend:

---

```markdown
# 🪙 GcoinToken Full Stack DApp

A full-stack ERC-20 token platform for minting and managing **GcoinToken (GCN)** using:

- **Solidity + Hardhat** (Smart Contracts)
- **Node.js + Express** (Backend API)
- **React.js + Ethers.js** (Frontend UI)

---

## 📁 Project Structure

```

gcoin-token-app/
├── contracts/           # Solidity smart contracts
├── scripts/             # Hardhat deployment scripts
├── backend/             # Node.js Express API
├── frontend/            # React DApp UI
├── abi/                 # Shared ABI files
├── .env                 # Environment variables
├── .gitignore
└── README.md

````

---

## 🧱 Tech Stack

| Layer         | Tech Used                             |
|---------------|----------------------------------------|
| Smart Contract| Solidity, Hardhat, OpenZeppelin       |
| Backend       | Node.js, Express, Ethers.js           |
| Frontend      | React.js, Ethers.js, MetaMask Wallet  |

---

## 🔐 Smart Contract (GcoinToken.sol)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GcoinToken is ERC20, Ownable {
    constructor(address initialOwner)
        ERC20("GcoinToken", "GCN")
        Ownable(initialOwner)
    {
        _mint(initialOwner, 1000000 * 10 ** decimals());
    }

    function rewardUser(address user, uint256 amount) external onlyOwner {
        _mint(user, amount);
    }
}
````

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/gcoin-token-app.git
cd gcoin-token-app
```

---

### 2. Install Dependencies

#### Smart Contracts (Hardhat)

```bash
cd contracts
npm install
```

#### Backend

```bash
cd ../backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

---

### 3. Environment Configuration

Create a `.env` in the `backend/` directory:

```env
PRIVATE_KEY=your_local_wallet_private_key
CONTRACT_ADDRESS=0xDeployedContractAddress
```

> Don’t expose private keys. Use `.gitignore` for `.env`.

---

### 4. Compile & Deploy Contracts (Localhost)

```bash
cd contracts
npx hardhat compile
npx hardhat node  # start local blockchain
```

In a new terminal:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

> Copy the deployed address into your `.env` and frontend `config.js`.

---

### 5. Start Backend Server

```bash
cd backend
node index.js
```

> Runs on `http://localhost:5000`.

---

### 6. Start Frontend React App

```bash
cd frontend
npm run dev
```

> Runs on `http://localhost:5173`.

---

## 💡 Features

* ✅ View connected MetaMask wallet & GCN balance
* ✅ Reward users with GCN tokens (owner-only)
* ✅ Fully integrated with a backend API
* ✅ Smart contract secured with OpenZeppelin's `Ownable`

---

## 📬 Backend API Example

### Endpoint: `POST /api/reward`

```json
{
  "to": "0xRecipientAddress",
  "amount": "100"
}
```

Returns:

```json
{
  "success": true,
  "hash": "0xTransactionHash"
}
```

---

## 🧪 Useful Hardhat Commands

| Command                                                 | Description             |
| ------------------------------------------------------- | ----------------------- |
| `npx hardhat compile`                                   | Compile smart contracts |
| `npx hardhat node`                                      | Run local blockchain    |
| `npx hardhat run scripts/deploy.js --network localhost` | Deploy contracts        |

---

## 📸 Screenshots

> *(Optional section — Add DApp screenshots here)*

---

## 📜 License

MIT License © 2025 Glen Jayson Dmello

---

## 🙌 Author

**Glen Jayson Dmello**
GitHub: [@glenjayson](https://github.com/glenjayson)

---

## 💌 Contributions

Pull requests welcome! Open an issue or feature request as needed.

```

---

Would you like this exported as a `.md` file or uploaded to your project folder directly?
```
