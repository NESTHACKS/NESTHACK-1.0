//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import "@openzeppelin/contracts/utils/Counters.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./ICompoundToken.sol";


contract Coverage is  ReentrancyGuard, Ownable {

    using SafeMath for uint;
    using Counters for Counters.Counter;


    Counters.Counter private _id;
    uint balance;
    address public admin;

    ICompoundToken public cToken;
 

    struct Client {
        uint id;
        string clientDetails;
        address underlyingAsset;
        uint depositedAmount;
        uint amountToSpend;
        uint timeDurationOfdeposit;
        uint lockTime;
        string ipfsPensionDetails;
        bool currentPlan;
    }


//SMART CONTRACTS EVENTS

  event RegisterClient(address indexed applicant, string indexed applicantDetails);
  event Deposit(address indexed sender, address receiver, uint indexed amountSpent);
   event Transfer(address indexed sender, uint amount, address indexed receiver);
    event TransferAssert( address indexed receiver,uint amount);
  event Withdraw(address from, address to, uint amount);
  event Plan(address user, string planDetails, uint lockTime);
  event Redeem(string, uint256);


// MAPPINGS 
  mapping(address => Client) public onBoardedUser;

  address constant NULL_ADDRESS = address(0); // Stores null address
  mapping(address => mapping(address => uint256)) public assets; // mapping of diffrent 
 mapping(address => uint) public clientBalance; // Balance of Token Asserts
 mapping(address => uint) public stakedBalance; // Balance of Token Asserts on different Lending Platform
 // keep track of registered users
    mapping(address => bool) public isRegistered;
    mapping(address => bool) public hasRedeemed;

  Client[] public clients;




constructor (address cUDSTAddress) {

    cToken = ICompoundToken(cUDSTAddress);
    _id.increment();
    admin = msg.sender;

} 


function _onBoarding(string memory _clientDetails) public {
      require(!isRegistered[msg.sender], "Client address already exists");

    Client memory client = Client({
    id:  _id.current(),
    clientDetails: _clientDetails,
    underlyingAsset: address(0),
    depositedAmount: 0,
    amountToSpend: 0,
    timeDurationOfdeposit: 0,
    lockTime: 0,
    ipfsPensionDetails: "",
    currentPlan: false
    });

onBoardedUser[msg.sender] = client;

clients.push(client);
isRegistered[msg.sender] = true;

_id.increment();

emit RegisterClient(msg.sender, _clientDetails);
}




function depositAssert(address _asset, uint _amount) public {
    require(isRegistered[msg.sender], "Client not registered");
    require(_asset != NULL_ADDRESS, "Address is invalid");
    require(_amount > 0, "Amount is less than 1");
   
    assets[_asset][msg.sender] = assets[_asset][msg.sender].add(_amount);


 require(ERC20(_asset).transferFrom(msg.sender, address(this), _amount), "Deposit has failed");
 emit Deposit (msg.sender, address(this), assets[_asset][msg.sender]);
}

function withdrawAssert(address _asset, uint _amount) public {
    require(isRegistered[msg.sender], "Client not registered");
    require(_asset != NULL_ADDRESS, "Address is invalid");
    require ( assets[_asset][msg.sender] >= _amount, "Minimum value not reached");
    require( ERC20(_asset).transfer(msg.sender, _amount), "Deposit has failed");
    emit TransferAssert(msg.sender, _amount);
}


function setPensionPlan(address _underlyingAsset,
 string memory _ipfsPensionDetails,
        uint _amountToSpend, 
        uint _timeDurationOfDeposit, 
        uint _lockTime
 ) public {
    require(_amountToSpend > 0, "approve an amount greater than 0");
    require(isRegistered[msg.sender], "Caller has to be Registered");

    Client memory client = onBoardedUser[msg.sender];
    require(client.lockTime == 0, "Client already has locktime" );
    client.underlyingAsset = _underlyingAsset;
    client.lockTime = block.timestamp.add(_lockTime);
    client.currentPlan = true;
    client.amountToSpend = _amountToSpend;
    client.timeDurationOfdeposit = block.timestamp.add(_timeDurationOfDeposit);
    client.ipfsPensionDetails = _ipfsPensionDetails;

    _supply(client.underlyingAsset, client.amountToSpend);
    emit Plan(msg.sender, client.ipfsPensionDetails, client.lockTime);
}

function _supply(address _underlyingAsset, uint _amount) internal {
  require(assets[_underlyingAsset][msg.sender] >= _amount);

  ERC20(_underlyingAsset).approve(address(cToken), _amount);
  require(cToken.mint(_amount) == 0, "mint failed");
  stakedBalance[msg.sender] = stakedBalance[msg.sender].add(_amount);
  assets[_underlyingAsset][msg.sender] = assets[_underlyingAsset][msg.sender].sub(_amount);
}



function _redem(address _asset) public {
    require(isRegistered[msg.sender], "Caller has to be Registered");
    Client memory client = onBoardedUser[msg.sender];
    require(block.timestamp > client.lockTime, "Unable to withdraw before your locktime expires");
    cToken.redeemUnderlying(stakedBalance[msg.sender]);

    stakedBalance[msg.sender] = stakedBalance[msg.sender].sub(stakedBalance[msg.sender]);
    uint penalty = assets[_asset][msg.sender].div(100).mul(5);
    assets[_asset][address(this)] = assets[_asset][address(this)].add(penalty);
    client.currentPlan = false;

}

  function withdrawPenalty(address _asset) public onlyOwner() {
        require(assets[_asset][address(this)] > 0, "Cannot withdraw 0 amount");
        require(IERC20(_asset).transfer(admin, assets[_asset][address(this)]));
    }



// Following Solidity best practices: Fallback method
 receive() external payable {
        balance = msg.value;
    }

}