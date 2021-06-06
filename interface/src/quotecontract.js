export const STOCK_ORACLE_ADDRESS = '0xaD888d0Ade988EbEe74B8D4F39BF29a8d0fe8A8D';

export const STOCK_ORACLE_ABI = [
                                	{
                                		"inputs": [
                                			{
                                				"internalType": "bytes4",
                                				"name": "symbol",
                                				"type": "bytes4"
                                			},
                                			{
                                				"internalType": "uint256",
                                				"name": "price",
                                				"type": "uint256"
                                			},
                                			{
                                				"internalType": "uint256",
                                				"name": "volume",
                                				"type": "uint256"
                                			},
                                			{
                                				"internalType": "uint256",
                                				"name": "decimal",
                                				"type": "uint256"
                                			}
                                		],
                                		"name": "setStock",
                                		"outputs": [],
                                		"stateMutability": "nonpayable",
                                		"type": "function"
                                	},
                                	{
                                		"inputs": [],
                                		"stateMutability": "nonpayable",
                                		"type": "constructor"
                                	},
                                	{
                                		"inputs": [
                                			{
                                				"internalType": "bytes4",
                                				"name": "symbol",
                                				"type": "bytes4"
                                			}
                                		],
                                		"name": "getStockPrice",
                                		"outputs": [
                                			{
                                				"internalType": "uint256",
                                				"name": "",
                                				"type": "uint256"
                                			},
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
                                				"internalType": "bytes4",
                                				"name": "symbol",
                                				"type": "bytes4"
                                			}
                                		],
                                		"name": "getStockVolume",
                                		"outputs": [
                                			{
                                				"internalType": "uint256",
                                				"name": "",
                                				"type": "uint256"
                                			}
                                		],
                                		"stateMutability": "view",
                                		"type": "function"
                                	}
                                ]