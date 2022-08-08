//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.4;
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
@title - Freechain Marketplace is a decentralized marketplace for everyone to sell their artworks.
@dev - Everyone can list their artworks to the marketplace and buyers can purchase them.
@author - Freechain Developers
 */

///@notice Custom error messages for the FreechainMarketplace.sol

///@notice - raised when an address is not the owner of the ERC721 token.
error Freechain__ERC721NotOwner();
///@notice - raised when the marketplace does not have appoval for the ERC721 token.
error Freechain__ERC721ApprovalRequired();
///@notice - raised when an address tries to list an ERC721 token that is already listed in the marketplace.
error Freechain__ERC721AlreadyListed();
///@notice - raised when the seller of a listed token doesn't own the token anymore.
error Freechain__SellerNotOwner();
///@notice - raised when caller is not the owner of the token.
error Freechain__NotOwner();
///@notice - raised when a listing is not open
error Freechain__ListingNotOpen();
///@notice - raised when correct price is not sent
error Freechain__WrongPrice();

contract FreechainMarketplace is Ownable {
    using EnumerableSet for EnumerableSet.UintSet;
    using Counters for Counters.Counter;

    ///@notice - Counters for listings
    Counters.Counter private _listingId;
    ///@notice - Tracking active listings & offers
    EnumerableSet.UintSet private openListings;

    ///@notice - ENUMS
    enum State {
        CANCELLED,
        COMPLETED,
        OPEN
    }

    ///@notice - Listing Mappings
    mapping(address => EnumerableSet.UintSet) private addrToActiveListings;
    mapping(uint256 => Listing) private tokenIdToListing;
    mapping(address => mapping(uint256 => bool)) isTokenListed;
    mapping(uint256 => Listing) private listingIdToListing;

    /**
        @notice - Structure for an ERC721 listing
        @param tokenId - The token ID of the token
        @param nftAddress - The address of the token
        @param price - The price of the token
        @param seller - The address of the seller
        @param status - The status of the listing
        @param id - The ID of the listing
    */
    struct Listing {
        uint256 id;
        uint256 price;
        uint256 tokenId;
        address nftAddress;
        address seller;
        State state;
    }

    /**
        @notice - Event for when an ERC721 listing is created
        @param _tokenId - The token ID of the token
        @param _nftAddress - The address of the token
        @param _price - The price of the token
        @param _seller - The address of the seller
     */
    event ListingCreated(
        uint256 _price,
        uint256 _tokenId,
        address _nftAddress,
        address _seller
    );
    /**
        @notice - Event for when an ERC721 listing is sold
        @param _price - The price of the token
        @param _tokenId - The token ID of the token
        @param _nftAddress - The address of the token
        @param _seller - The address of the seller
        @param _buyer - The address of the buyer
     */
    event ListingSold(
        uint256 _price,
        uint256 _tokenId,
        address _nftAddress,
        address _seller,
        address _buyer
    );

    /**
        @notice - Event for when an ERC721 listing is cancelled
        @param _tokenId - The token ID of the token
        @param _nftAddress - The address of the token
        @param _seller - The address of the seller
     */
    event ListingCancelled(
        uint256 _tokenId,
        address _nftAddress,
        address _seller
    );

    /**@notice - Function to create a listing
        @param _tokenId - The token ID of the token
        @param _nftAddress - The address of the token
        @param _price - The price of the token
    */

    function createListing(
        uint256 _tokenId,
        address _nftAddress,
        uint256 _price
    )
        public
        onlyNftOwner(_nftAddress, _tokenId)
        HasApprovalERC721(_nftAddress)
        NotListed(_nftAddress, _tokenId)
        returns (uint256)
    {
        _listingId.increment();
        Listing memory listing = Listing(
            _listingId.current(),
            _price,
            _tokenId,
            _nftAddress,
            msg.sender,
            State.OPEN
        );
        isTokenListed[_nftAddress][_tokenId] = true;
        tokenIdToListing[_tokenId] = listing;
        listingIdToListing[listing.id] = listing;
        addrToActiveListings[msg.sender].add(listing.id);
        openListings.add(listing.id);
        emit ListingCreated(_price, _tokenId, _nftAddress, msg.sender);
        return listing.id;
    }

    /**@notice - Function to buy an ERC721 listing
        @param listingId - The ID of the listing
    */
    function buyListing(uint256 listingId) external payable {
        Listing memory listing = listingIdToListing[listingId];
        if (listing.state != State.OPEN) revert Freechain__ListingNotOpen();

        if (
            IERC721(listing.nftAddress).ownerOf(listing.tokenId) !=
            listing.seller
        ) revert Freechain__SellerNotOwner();

        if (msg.value != listing.price) revert Freechain__WrongPrice();

        listing.state = State.COMPLETED;
        isTokenListed[listing.nftAddress][listing.tokenId] = false;
        //Set active to updated listing
        listingIdToListing[listingId] = listing;
        //Remove listing from open listings and from the address's active listings
        _removeListingStorage(listingId);
        uint royalty = (msg.value * 1) / 100;
        uint sellerFunds = (msg.value * 99) / 100;
        // Transfer the Funds then NFT afterwards
        (bool success, ) = getOwner().call{value: royalty}("");
        (bool sellerSuccess, ) = listing.seller.call{value: sellerFunds}("");
        if (success && sellerSuccess) {
            IERC721(listing.nftAddress).safeTransferFrom(
                listing.seller,
                msg.sender,
                listing.tokenId
            );
        } else {
            revert();
        }
        emit ListingSold(
            listing.price,
            listing.tokenId,
            listing.nftAddress,
            listing.seller,
            msg.sender
        );
    }

    /**
     * @dev Cancel open listing. Must be creator of listing.
     * @param listingId - ID of the listing to cancel
     */
    function cancelListing(uint256 listingId)
        external
        onlyNftOwner(
            listingIdToListing[listingId].nftAddress,
            listingIdToListing[listingId].tokenId
        )
    {
        require(
            listingIdToListing[listingId].state == State.OPEN,
            "Listing already ended."
        );

        // Make the removal
        listingIdToListing[listingId].state = State.CANCELLED;
        _removeListingStorage(listingId);
        //set token as not listed
        isTokenListed[listingIdToListing[listingId].nftAddress][listingIdToListing[listingId].tokenId] = false;

        // Emit the event
        emit ListingCancelled(
            listingIdToListing[listingId].tokenId,
            listingIdToListing[listingId].nftAddress,
            listingIdToListing[listingId].seller
        );
    }

    ///@notice - Returns the listings of the given address
    function getListingsByUser(address userAddress)
        external
        view
        returns (Listing[] memory)
    {
        uint256[] memory userActiveListings = addrToActiveListings[userAddress]
            .values();
        uint256 length = userActiveListings.length;
        Listing[] memory userListings = new Listing[](length);

        for (uint i = 0; i < length; ) {
            userListings[i] = listingIdToListing[userActiveListings[i]];
            unchecked {
                ++i;
            }
        }

        return userListings;
    }

    /////////////////////INTERNAL FUNCTIONS///////////////////////////////
    ///@notice - Internal function to remove a listing from storage
    /**
     * @dev Remove listing from storage
     * @param listingId - ID of the listing to remove
     */
    function _removeListingStorage(uint256 listingId) internal {
        addrToActiveListings[msg.sender].remove(listingId);
        tokenIdToListing[
            listingIdToListing[listingId].tokenId
        ] = listingIdToListing[listingId];
        openListings.remove(listingId);
    }

    ///@notice - Internal function to add a listing to storage
    /**
     * @dev Add listing to storage
     * @param listing - Listing to add
     */
    function _addListingStorage(Listing memory listing) internal {
        uint id = listing.id;
        uint tokenId = listing.tokenId;
        listingIdToListing[id] = listing;
        addrToActiveListings[msg.sender].add(id);
        tokenIdToListing[tokenId] = listing;
        openListings.add(id);
    }

    ///@notice - Get all active listings
    function getAllActiveListings() external view returns (Listing[] memory) {
        uint256[] memory allActiveListings = openListings.values();
        uint256 length = allActiveListings.length;
        Listing[] memory allListings = new Listing[](length);

        for (uint i = 0; i < length; ) {
            allListings[i] = listingIdToListing[allActiveListings[i]];
            unchecked {
                ++i;
            }
        }

        return allListings;
    }

    ///@notice - Get owner of contract and make it a payable address
    function getOwner() internal view returns (address payable) {
        address owner = owner();
        return payable(owner);
    }

    /////////////////////MODIFIERS///////////////////////////////
    ///@notice - Modifier to check if the caller is the owner of the token.
    modifier onlyNftOwner(address _nftAddress, uint256 _tokenId) {
        // Get the owner
        address nftOwner = IERC721(_nftAddress).ownerOf(_tokenId);
        // Make the check
        if (msg.sender != nftOwner) {
            revert Freechain__ERC721NotOwner();
        }
        //  Cont.
        _;
    }
    /**
        @notice - Modiifier to check if the caller has approval for the ERC721 token
        @param _nftAddress - The address of the token
     */
    modifier HasApprovalERC721(address _nftAddress) {
        if (
            IERC721(_nftAddress).isApprovedForAll(msg.sender, address(this)) ==
            false
        ) revert Freechain__ERC721ApprovalRequired();
        _;
    }
    /**
        @notice - Modifier to ensure token is not already listed
     */
    modifier NotListed(address _nftAddress, uint256 _tokenId) {
        if (isTokenListed[_nftAddress][_tokenId] == true)
            revert Freechain__ERC721AlreadyListed();
        _;
    }
}
