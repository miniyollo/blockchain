import React, { Component } from "react";
import solidityContract from "./contracts/solidity.json";
import getWeb3 from "./getWeb3";
import{ StyledDropZone} from 'react-drop-zone';
import{Table} from 'reactstrap';
import ipfs from "./ipfs";
//import { FileIcon, defaultStyles } from 'react-file-icon';
import { FileIcon } from 'react-file-icon';
 import "react-drop-zone/dist/styles.css";
 import 'bootstrap/dist/css/bootstrap.css';
import fileReaderPullStream from 'pull-file-reader'
import "./App.css";

class App extends Component {
  state = { solidity:[], web3: null, accounts: null, contract: null };
//for rendering 
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3(); //from getweb3 js file 

      // Use web3 to get the user's accountsss.
      const accounts = await web3.eth.getaccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = solidityContract.networks[networkId];
      const instance = new web3.eth.Contract(
        solidityContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accountsss, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.getfiles);
    } catch (error) {
      // Catch any errors for any of the above operations.
      //if smart contract and accountss different
      alert(
        `Failed to load web3, accountsss, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };
  //await = returns something no matter how much time
 getFile= async() =>{
  try{
    const {accounts,contract}= this.state;
    let filesLength = await contract.methods.getlength().call({from:accounts[0]});
    let files =[]
    //i is index then loaded them
    for (let i = 0; i < filesLength; i++) {
      let file =  await contract.method.getFile(i).call({from:accounts[0]})
      //to push
      files.push(file);
    }
    this.setState({solidity:files});
    }
    
 
  catch(error){
    console.log(error);
  }

}
//getlegth comes from smart contract
  
onDrop= async(file)=>{
  try {
    const{contract,accounts} = this.state;
    const stream =fileReaderPullStream(file);
    const result=await ipfs.add(stream);
    debugger;

  } catch (error) {
    console.log(error);
  }

};
  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
     <div className="App">
       <div className="container pt-3">
         {/* calls the file from the function onDrop */}
<StyledDropZone onDrop ={this.onDrop}/> 
<Table>
  <thead>
    <tr>
      <th>
type
      </th>
      <th>
        file name
      </th>
      <th>
        date
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
       <th><FileIcon size={10} extension="docx" /></th>
<th>icon</th>
      <th>filename</th>
      <th>20/10/12</th>
    </tr>
  </tbody>
</Table>

       </div>
     </div>
    );
  }
}

export default App;
