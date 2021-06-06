import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Web3 from 'web3';
import {STOCK_ORACLE_ABI, STOCK_ORACLE_ADDRESS} from './quotecontract';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleSymbolChange = this.handleSymbolChange.bind(this);
        this.writeToContract = this.writeToContract.bind(this);
        this.readFromContract = this.readFromContract.bind(this);
    }

    state = {
        stockQuote: null,
        symbol: '',
        contract: null,
        account: '',
        respText: ''
    }

    async componentDidMount() {
        let contract;
        const web3 = new Web3('http://localhost:8545');
        const accounts = await web3.eth.getAccounts();
        console.log("Account 0 = ", accounts[0]);
        contract = new web3.eth.Contract(STOCK_ORACLE_ABI, STOCK_ORACLE_ADDRESS);
        this.setState({contract: contract, account: accounts[0]})
    }

    handleSymbolChange(event) {
        event.preventDefault();
        this.setState({symbol: event.target.value});
    }

    async writeToContract(event) {
        let decimal;
        let price;
        let volume;
        event.preventDefault();
        const res = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${this.state.symbol}&apikey=7B9DIHHTAFDTBOGL`);
        price = res.data['Global Quote']['05. price'];
        volume = res.data['Global Quote']['06. volume'];
        let index = price.indexOf('.');
        if (index == -1) {
            decimal = 0;
        } else {
            decimal = price.length - index - 1;
        };
        price = Math.round(parseFloat(price) * (10 ** decimal));
        console.log(`${price}, ${volume}, ${decimal}`);
        const retVal = await this.state.contract.methods.setStock(Web3.utils.fromAscii(this.state.symbol),
                                                                  price, volume, decimal).send({from: this.state.account});
        console.log(retVal);
    }

    async readFromContract(event) {
        const retPrice = await this.state.contract.methods.getStockPrice(Web3.utils.fromAscii(this.state.symbol)).call({from: this.state.account});
        let price = retPrice[0] / (10 ** retPrice[1]);
        const retVolume = await this.state.contract.methods.getStockVolume(Web3.utils.fromAscii(this.state.symbol)).call({from: this.state.account});
        let volume = parseInt(retVolume);
        console.log(price, volume);
        if (price == 0 && volume == 0){
            this.setState({respText: `Data for ${this.state.symbol} is not set in the contract`});
        } else {
            this.setState({respText: `Data for ${this.state.symbol}: price = ${price}, volume = ${volume}`});
        }
    }

    render() {
        return(
        <div>
            <form>
                <label htmlFor='symbol'>Symbol: </label>
                <input type='text' name='symbol' id='symbol' onChange={this.handleSymbolChange}></input>
            </form>
            <button onClick={this.writeToContract}>Write to contract</button>
            <button onClick={this.readFromContract}>Read from contract</button><br/>
            <span>{this.state.respText}</span>
        </div>
        )
    }
}

export default App;
