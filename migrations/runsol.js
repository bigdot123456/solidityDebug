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
let solfilename='calc.sol'
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
//2.1 获取合约的代码，部署时传递的就是合约编译后的二进制码

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

let deployeAddr = web3.eth.getAccounts().then(function (value) { console.log(value[0]) })

let callerAddr = web3.eth.getAccounts().then(function (value) { console.log(value[1]) })

deployeAddr = '9448ACAE34D79ACDb6CE8F26a378D9A92EA1F9Ac';

callerAddr = 'A655d8d2f425f3e9F9C95D7196Bf9D33b008B508';

//获取合约实例
const contract = new web3.eth.Contract(abi)
let contractAddress
//部署合约
contract.deploy({
    data: bytecode
}).send({
    from:deployeAddr,//这个地址就是truffle/ganache的第一个节点地址。
    gas: 4712388,
    gasPrice: '10000000000000',
})
    .then((instance) => {
        console.log(`Address: ${instance.options.address}`);
        contractAddress=instance.options.address;
        console.log('Full contract address is ',contractAddress);
    });


// let deployCode = calcCompiled["code"];

//2.2 部署者的地址，当前取默认账户的第一个地址。



// 第一个参数：合约的abi对象
new web3.eth.Contract(abi, {
    // 必填，合约发起者
    from: deployeAddr,
    // 合约bytecode，也可也在deploy中传入
    data: bytecode,
    // 即gas limit，该交易最大可使用的Gas
    gas: 4712388,
    gasPrice: '1000000'
}).deploy().send().then((instance) => {
    // console.log(instance)

    // 合约地址
    // console.log(`Address: ${instance.options.address}`);

    //执行合约，只是查询状态，不需要挖矿，所以调用call方法
    instance.methods.getBalance(deployeAddr).call({
        //非必填，该合约方法的调用者
        from: callerAddr
    }, function (error, result) {
        console.log('error:' + error)
        console.log('result:' + result)
    })
})

// 相对于部署合约，多了第二个参数，即合约地址
const metaCoinContract = new web3.eth.Contract(abi, contractAddress, {
    // 非必填，合约的bytecode
    data: bytecode,
    // 非必填，合约的创建者
    from: deployeAddr,
    //Gas limit
    gas: 4712388,
    gasPrice: '1000000'
});

let UsecontractAddress='83A87C3DC9CD2146e29D8aCFb7470Bc86d8bFf28';

// 调用合约中的sendCoin方法
metaCoinContract.methods.sendCoin(contractAddress, 100).send({
    //非必填，该合约方法的调用者
    from: UsecontractAddress
}).on('transactionHash', function (hash) {
    console.log(hash)
}).on('receipt', function (receipt) {
    console.log(receipt)
}).on('confirmation', function (confirmationNumber, receipt) {
    console.log(confirmationNumber)
}).on('error', console.error)


// 调用合约中的getBalance方法
metaCoinContract.methods.getBalance('0x75441ac9a1d2DaAA5638beae207546c8D14a7f6d').call({
    //非必填，该合约方法的调用者
    from: '0x6cc022FAE89414146b2A2646ca5143e23dA5b7e7'
}, function (error, result) {
    console.log('error:' + error)
    console.log('result:' + result)
})