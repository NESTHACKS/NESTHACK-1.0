//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.4;
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./FreechainArtist.sol";


//     ______                         __            _           
//    / ____/_____ ___   ___   _____ / /_   ____ _ (_)____      
//   / /_   / ___// _ \ / _ \ / ___// __ \ / __ `// // __ \     
//  / __/  / /   /  __//  __// /__ / / / // /_/ // // / / /     
// /_/    /_/    \___/ \___/ \___//_/ /_/ \__,_//_//_/ /_/ 
// 
/**
@title - Freechain Protocol
@notice - Freechain Protocol is a free, open-source, decentralized, permissionless, censorship-resistant, and immutable trading hub.
@dev - Freechain Marketplace is a decentralized marketplace for everyone to sell their artworks.
@dev - Everyone can list their artworks to the marketplace and buyers can purchase them.
@notice - FreechainArtist is a contract that is used to manage the artist signup and artist profile.
@author - Freechain Developers
 */

contract FreechainProtocol {
 FreechainArtist public FreechainArtistContract;


    /**
    * @dev - FreechainProtocol constructor.
    * @param _freechainArtistContract - FreechainArtist contract address.
    */
    constructor(address _freechainArtistContract) {
        FreechainArtistContract = FreechainArtist(_freechainArtistContract);
    }
}