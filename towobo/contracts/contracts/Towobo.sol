//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Towobo is Ownable {
    string private title;
    string private fileUrl;
    address private signerAddress;

    string private signatureUrl;
    bool completed;

    event UpdatedFileUrl(string oldStr, string newStr);

    constructor(string memory _title, address _signerAddress) {
        title = _title;
        signerAddress = _signerAddress;
        completed = false;
    }

    function updateFileUrl(string memory newUrl) external onlyOwner {
        emit UpdatedFileUrl(fileUrl, newUrl);
        fileUrl = newUrl;
    }

    function markCompleted(string memory _signatureUrl) public {
        // signatureUrl is the url of the completed esignature receipt.
        // Assert caller has the same address as seller address else fail.
        require(
            address(msg.sender) == this.signerAddress,
            "Only the designated signer can complete the contract"
        );
        signatureUrl = _signatureUrl;
        completed = true;
    }

    function getTitle() public view returns (string memory) {
        return title;
    }

    function getFileUrl() public view returns (string memory) {
        return fileUrl;
    }

    
    function getSignatureUrl() public view onlyOwner returns (string memory) {
        return signatureUrl;
    }

    function getSigner() public view returns (address) {
        return signerAddress;
    }
}
