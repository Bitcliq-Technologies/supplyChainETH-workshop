import Web3 from 'web3';

const CONTRACT_ADDRESS = "0x2373a296e059819bddb9311be5d80d12f39f357e"

// eslint-disable-next-line import/no-anonymous-default-export
export default (web3: Web3) => {
    const contract_address = CONTRACT_ADDRESS;
    //@ts-ignore
    return new web3.eth.Contract(abi,contract_address)
  }

const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_fishCatchID",
				"type": "uint256"
			}
		],
		"name": "buyFishCatch",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_specie",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_size",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "createFishCatch",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "currentFishCatchCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_fishCatchID",
				"type": "uint256"
			}
		],
		"name": "getFishCatch",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "specie",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "size",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "createdTimestamp",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "address payable",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "isBought",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "boughtTimestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct SupplyChainExample.FishCatch",
				"name": "",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "createdTimestamp",
						"type": "uint256"
					},
					{
						"internalType": "int256",
						"name": "value",
						"type": "int256"
					}
				],
				"internalType": "struct SupplyChainExample.FishCatchTemperature[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_fishCatchID",
				"type": "uint256"
			},
			{
				"internalType": "int256",
				"name": "_temperature",
				"type": "int256"
			}
		],
		"name": "insertTemperature",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]