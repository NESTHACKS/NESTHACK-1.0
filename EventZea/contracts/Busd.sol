//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BUSD is ERC20 {
    constructor() ERC20("Binance USD", "BUSD") {
        _mint(msg.sender, 1000000 * 10**18);
    }

    function mint(address addr, uint256 amount) public {
        _mint(addr, amount);
    }

    function burn(address addr, uint256 amount) public {
        _burn(addr, amount);
    }
}
