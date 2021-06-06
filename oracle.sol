// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract Oracle {
    struct stock {
        uint price;
        uint volume;
        uint decimal;
    }

    mapping(bytes4 => stock) stockQuote;
    address oracleOwner;

    constructor() {
        oracleOwner = msg.sender;
    }

    function setStock(bytes4 symbol, uint price, uint volume, uint decimal) public {
        stockQuote[symbol] = stock(price, volume, decimal);
    }

    function getStockPrice(bytes4 symbol) public view returns (uint, uint) {
        return (stockQuote[symbol].price, stockQuote[symbol].decimal);
    }

    function getStockVolume(bytes4 symbol) public view returns (uint) {
        return stockQuote[symbol].volume;
    }

}