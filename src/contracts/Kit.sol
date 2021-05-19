// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC721Tradable.sol";

/**
 * @title Kit
 * Kit - a contract for my non-fungible Kits.
 */
contract Kit is ERC721Tradable {
    constructor(address _proxyRegistryAddress)
        ERC721Tradable("KryptoKits", "KIT", _proxyRegistryAddress)
    {}

    function baseTokenURI() override public pure returns (string memory) {
        return "https://us-central1-tm-market.cloudfunctions.net/kits/";
    }

    function contractURI() public pure returns (string memory) {
        return "https://us-central1-tm-market.cloudfunctions.net/kits/contract/";
    }
}
