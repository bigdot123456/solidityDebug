const fs = require("fs");
const solc = require('solc')
let Web3 = require('web3');
let web3;

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
// set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}

//编译合约
//以下编译方法已经过期了
//let source = "pragma solidity ^0.4.0;contract Calc{ /*区块链存储*/ uint count; /*执行会写入数据，所以需要`transaction`的方式执行。*/ function add(uint a, uint b) returns(uint){ count++; return a + b; } /*执行不会写入数据，所以允许`call`的方式执行。*/ function getCount() constant returns (uint){ return count; }}";
//let calcCompiled = web3.eth.compile.solidity(source);

//改用solc编译，需要先 npm install -g solc
let solfilename='metacoin.sol'
const solcontent = fs.readFileSync(solfilename);

let input = {
    language: 'Solidity',
    sources: {
        solfilename: {
            content: solcontent.toString()
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

let output = JSON.parse(solc.compile(JSON.stringify(input)));

let bytecode;
let abi;

for (let contractName in output.contracts[solfilename]) {
    console.log(
        contractName +
        ': ' +
        output.contracts[solfilename][contractName].evm.bytecode.object
    );
}

for (let contractNameItem in output.contracts) {
// code and ABI that are needed by web3
    for (let contractInName in output.contracts[contractNameItem]){
        bytecode = output.contracts[contractNameItem][contractInName].evm.bytecode.object
        console.log(
            contractNameItem + ":" + contractInName + ":" + bytecode );
    }
    for (let contractInName in output.contracts[contractNameItem]){
        abi = output.contracts[contractNameItem][contractInName].abi;
        //console.log(contractNameItem + ":" + contractInName + ":" + abi );
    }

    //console.log(contractName + '; ' + JSON.parse(output.contracts[contractName].interface))
//console.log(JSON.stringify(abi, undefined, 2));
//可以把abi打印出来，看看智能合约的编译和本来的是不是相同
}
let deployeAddr = web3.eth.getAccounts().then(function (value) { console.log(value[0]) });

let callerAddr = web3.eth.getAccounts().then(function (value) { console.log(value[1]) });

deployeAddr = '9448ACAE34D79ACDb6CE8F26a378D9A92EA1F9Ac';

callerAddr = 'A655d8d2f425f3e9F9C95D7196Bf9D33b008B508';

//获取合约实例
const contract = new web3.eth.Contract(abi);

//部署合约
contract.deploy({
    data: bytecode
}).send({
    from:deployeAddr,//这个地址就是truffle/ganache的第一个节点地址。
    gas: 500000,
    gasPrice: '10000000000000',
})
    .then((instance) => {
        console.log(`Address: ${instance.options.address}`);
        let contractAddress=instance.options.address;
        console.log('Full contract address is ',contractAddress);
    });

