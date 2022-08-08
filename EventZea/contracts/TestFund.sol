//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Busd.sol";

contract TestFund {
    BUSD internal token;

    mapping(address => uint256) public testbalance;

    constructor(address token_addr) {
        token = BUSD(token_addr);
    }

    function grab(address addr, uint256 _amount) public {
        require(testbalance[addr] < 1000 ether, "You have exhausted you quota");
        token.transfer(addr, _amount);
        testbalance[addr] = testbalance[addr] + _amount;
    }
}
