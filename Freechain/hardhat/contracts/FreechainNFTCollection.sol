//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//a child contract of ERC1155.sol
// @title - FreechainNFTCollection
// @notice - FreechainNFTCollection is a child contract of ERC1155.sol.
contract FreechainNFTStandard is ERC1155, ERC1155Supply, Ownable {
    mapping(uint256 => string) internal _tokenURIs;

    constructor() ERC1155("") {}

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    /**
     * @dev Mints a new token type and assigns amount to an address
     * @param tokenURI URI for this token type
     * @param amount amount to supply the first owner
     */
    function mintToken(string memory tokenURI, uint256 amount)
        public onlyOwner
    {
        uint256 newItemId = _tokenIds.current();
        _setTokenUri(newItemId, tokenURI);
        _tokenIds.increment();
        _mint(msg.sender, newItemId, amount, "");
    }

    /**
     * @dev necessary override of _beforeTokenTransfer See {ERC1155-_beforeTokenTransfer}.
     */
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

     /**
        * @dev Set the token uri to a token ID
        * @param tokenId uint256 ID of the token uri to be set
        * @param tokenURI string URI of the token
    */
    function _setTokenUri(uint256 tokenId, string memory tokenURI) internal {
        _tokenURIs[tokenId] = tokenURI;
    }

    /**
    * @dev Returns the token uri for a token ID
    * @param id uint256 ID of the token uri
    * @return _tokenURIs of token ID
    */
    function uri(uint256 id) public view virtual override returns (string memory) {
        require(exists(id), "Collection does not exist");
        return _tokenURIs[id];
    }
}
