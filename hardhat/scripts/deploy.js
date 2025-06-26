const hre = require("hardhat");

async function main() {
    cons [deployer] = await hre.ethers.getSigners();

    console.log("Deploying with:", deployer.address);

    const Gcoin = await hre.ethers.getContractFactory("Gcoin");
    const token = await Gcoin.deploy(deployer.address);

    await token.deployed();

    console.log("Gcoin Token deployed to:", token.address);
}

main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
    
})