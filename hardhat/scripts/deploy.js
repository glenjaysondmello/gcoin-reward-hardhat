const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying with:", deployer.address);

    const GcoinToken = await hre.ethers.getContractFactory("GcoinToken");
    const token = await GcoinToken.deploy(deployer.address);

    await token.waitForDeployment();

    const deployedAddrs = await token.getAddress();

    console.log("Gcoin Token deployed to:", deployedAddrs);
}

main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
})