
const ethEnabled = () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    //window.eth_requestAccounts();
    return true;
  }
  return console.log(false);
}
ethEnabled();



//const web3 = new Web3('http://127.0.0.1:7545');
const contract = new web3.eth.Contract(
  AgriBlockAbi,
  AgriBlockAddress
);

let defaultAccount;//temp
web3.eth.getAccounts()
  .then(
    accounts => defaultAccount = accounts[0]//temp
  );
// contract.defaultAccount=defaultAccount;

const fRegisterButton = document.getElementById("freg-b");
const handleFarmerRegister = () => {
  var fn = document.getElementById("fname-id").value;
  var fno = document.getElementById("fno-id").value;
  var fe = document.getElementById("femail-id").value;

  if(fn==''){alert("Enter your name!");return;}
  if(fno==''){alert('Enter your phone number!');return;}
  if(fe==''){alert("Enter your email id");return;}

  contract.methods.registerFarmer(fn, fno, fe)
    .send
    ({
      from: web3.eth.currentProvider.selectedAddress,//temp
      gasPrice: 10000,
      gas: 1000000
    })
    .on('transactionHash', h => { alert("Registered successfully!   Transaction hash: " + h) })
    .on('confirmation', c => { console.logt(c) })
    .on('error', e => { alert("Error: " + e.message) })
    .then(
      result => {
        alert("Registered successfully!   \nTransaction hash: " + result.transactionHash)
        alert("Block Hash " + result.blockHash);
        console.log(result);
        alert("Block Number " + result.blockNumber);
      }
    );

}
fRegisterButton.addEventListener("click", handleFarmerRegister);


