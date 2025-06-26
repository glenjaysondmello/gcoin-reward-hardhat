// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GcoinToken is ERC20, Ownable {
    constructor(address initialOwner)
        ERC20("Gcoin", "GCN")
        Ownable(initialOwner)
    {
        _mint(initialOwner, 1000000 * 10 ** decimals());
    }

    function rewardUser(address user, uint256 amount) external onlyOwner {
        _mint(user, amount);
    }
}