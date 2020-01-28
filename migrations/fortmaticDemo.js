
let fm = new Fortmatic('pk_test_D310258E05');
web3 = new Web3(fm.getProvider());
// TODO: Step 3: Send Transaction Implementation
web3.eth.sendTransaction({
    // From address will automatically be replaced by the address of current user
    from: '0x0000000000000000000000000000000000000000',
    to: address,
    value: web3.utils.toWei(amount, 'ether')
});
// End Step 3