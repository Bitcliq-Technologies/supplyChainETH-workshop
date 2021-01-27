import React, {useEffect, useState} from 'react';
import contractInteractions from "./contractInteractions"
import Web3 from 'web3';
import { Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

window.ethereum.enable();

function App() { 
  const [web3, setWeb3] = useState<Web3|null>(null)
  const [contract, setContract] = useState<any>(null)
  const [fishCatches, setFishCatches] = useState<any>([]);

  const loadBlockChain = async () => {
    const web3 = new Web3(Web3.givenProvider)
    setWeb3(web3)
    setContract(contractInteractions(web3))
  }

  useEffect(() => {
    loadBlockChain();
  },[])

  //every 5 seconds
  useEffect(() => {
    if(contract){
      getAllFishCatches()
    }
  },[contract])

  const getAllFishCatches = async () => {
    setInterval(async () => {
      const numberOfContracts = await contract.methods.currentFishCatchCount().call()
      if(numberOfContracts>0){
        let fishCatchesState = []
        for (let i = 0; i <= numberOfContracts - 1; i++) {
          fishCatchesState.push(await contract.methods.getFishCatch(i).call())
        }
        setFishCatches(fishCatchesState)
      }
    }
    , 5000)
  }

  return (
    <div className="App" >
      <h1>Marketplace</h1>
        <div style={{display: "flex", flexWrap: "wrap"}}>
          {web3 && fishCatches.length > 0 && 
            fishCatches.map((fishCatch: any, index: number) => {
              const fishCatchData = fishCatch[0];
              const fishCatchTemperature = fishCatch[1];

              return (
                <Card style={{ margin: '5px', flex: "1 0 25%", maxWidth: "35rem" }} key={fishCatchData.createdTimestamp}>
                  <Card.Body>
                    <Card.Title>{fishCatchData.specie} {fishCatchData.size}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{fishCatchData.price/1e18} ETH</Card.Subtitle>
                    <Card.Text>
                      Created: {fishCatchData.createdTimestamp}<br />
                      Owner: {fishCatchData.owner}<br />
                      {fishCatchTemperature.length > 0 && <div>
                        Temp: {fishCatchTemperature.map((a: any) => a.value + ", ")}

                      </div>} 
                    </Card.Text>
                      { 
                        fishCatchData.isBougth ? 
                          <Button variant="secondary" disabled> Bought </Button> : 
                          <Button variant="success" onClick={async ()=>{
                            const account = await web3.eth.getAccounts()
                            await contract.methods.buyFishCatch(index).send({from: account[0], value: fishCatchData.price});
                          }}>Buy</Button>}
                  </Card.Body>
                </Card>
              )
            })
        }
      </div>
    </div>
  );
}

export default App;
declare global {
  interface Window { ethereum: any; }
}