// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.6;
pragma experimental ABIEncoderV2;

contract SupplyChainExample {
    struct FishCatchTemperature {
        uint256 createdTimestamp; // 134681341 => 27/01/2021 - 10:22:00
        uint value; // 250 => 2.50º
    }
    
    struct FishCatch {
        string specie; // ex. Seabass
        string size; // ex. Large
        uint256 createdTimestamp; // 134681341 => 27/01/2021 - 10:22:00
        uint256 price; // ETH has 18 decimal places so if a fish costs 1 ETH it needs to be 1e18 here
        address payable owner; // 0x3DD7fAEb17ff23D74359EA0827D35f549c82fEA4
        bool isBougth; // true || false
        uint256 boughtTimestamp; // 134681341 => 27/01/2021 - 10:22:00
    }
    
    uint public currentFishCatchCount = 0;
    mapping (uint => FishCatch) internal fishCatches;
    mapping (uint => FishCatchTemperature[]) internal fishCatchTemperatures;

    function createFishCatch(string memory _specie, string memory _size, uint256 _price) public {
        FishCatch memory _fishCatch = FishCatch(
        {
            specie: _specie,
            size: _size,
            createdTimestamp: block.timestamp,
            price: _price,
            owner: msg.sender,
            isBougth: false,
            boughtTimestamp: 0
        });
        
        fishCatches[currentFishCatchCount] = _fishCatch;
        currentFishCatchCount += 1;
    }
    
    function insertTemperature(uint _fishCatchID, uint _temperature) public {
        FishCatchTemperature memory _fishCatchTemperature = FishCatchTemperature(
        {
            createdTimestamp: block.timestamp,
            value: _temperature
        });
        
        fishCatchTemperatures[_fishCatchID].push(_fishCatchTemperature);
    }
    
    function buyFishCatch(uint _fishCatchID) public payable {
        require(fishCatches[_fishCatchID].isBougth == false, "Fishcatch already bought!");
        require(fishCatches[_fishCatchID].price == msg.value, "Sent funds do not match this fishcatch price!");
        fishCatches[_fishCatchID].owner.transfer(fishCatches[_fishCatchID].price);
        fishCatches[_fishCatchID].owner = msg.sender;
        fishCatches[_fishCatchID].isBougth = true;
        fishCatches[_fishCatchID].boughtTimestamp = block.timestamp;
    }
    
    
    function getFishCatch(uint _fishCatchID) public view returns(FishCatch memory, FishCatchTemperature[] memory) {
      return (fishCatches[_fishCatchID], fishCatchTemperatures[_fishCatchID]);
    }
}