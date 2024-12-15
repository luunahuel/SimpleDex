// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenB is ERC20 {
    constructor(address initialOwner) ERC20("TokenB", "TKB") {
        _mint(initialOwner, 1000000 * 10 ** decimals()); 
    }
}