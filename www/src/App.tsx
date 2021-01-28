import React, {useEffect, useState} from 'react';
import contractInteractions from "./contractInteractions"
import Web3 from 'web3';
import { Button, Card, Form, Modal, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

window.ethereum.enable();

function App() { 
  const [web3, setWeb3] = useState<Web3|null>(null)
  const [contract, setContract] = useState<any>(null)
  const [fishCatches, setFishCatches] = useState<any>([]);
  const [showCreateFishCatch, setShowCreateFishCatch] = useState(false)

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
    const executeQuery = async () => {
      const numberOfContracts = await contract.methods.currentFishCatchCount().call()
      if(numberOfContracts>0){
        let fishCatchesState = []
        for (let i = 0; i <= numberOfContracts - 1; i++) {
          fishCatchesState.push(await contract.methods.getFishCatch(i).call())
        }
        setFishCatches(fishCatchesState)
      }
    }
    executeQuery()
    setInterval(async () => {
      executeQuery()
    }
    , 5000)
  }

  return (
    <div className="App" >
      <h1>Marketplace</h1>
        {web3 && 
            <Button variant="primary" onClick={async ()=> {
                setShowCreateFishCatch(true);
              }}>Create FishCatch
            </Button>
          }
          <br/>
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
        <CreateFishCatchModal 
          showCreateFishCatch={showCreateFishCatch}
          setShowCreateFishCatch={setShowCreateFishCatch}
          web3={web3}
          contract={contract}
        />
      </div>
    </div>
  );
}

export default App;
declare global {
  interface Window { ethereum: any; }
}

//@ts-ignore
const CreateFishCatchModal = ({showCreateFishCatch, setShowCreateFishCatch, web3, contract}) => {
  const [specie, setSpecie] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);

  console.log(showCreateFishCatch)
  return (
      <Modal show={showCreateFishCatch} onHide={() => setShowCreateFishCatch(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create FishCatch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Specie</Form.Label>
            <Form.Control type="text" placeholder="" value={specie} onChange={(e) => setSpecie(e.target.value)} />
            <Form.Label>Size</Form.Label>
            <Form.Control type="text" placeholder="" value={size} onChange={(e) => setSize(e.target.value)} />
            <Form.Label>Price(ETH)</Form.Label>
            <Form.Control type="number" placeholder="" value={price} onChange={(e) => setPrice(e.target.value)} />
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" disabled={loading} onClick={async ()=> {
                setLoading(true)
                const account = await web3.eth.getAccounts()
                await contract.methods.createFishCatch(specie,size,(parseFloat(price)*1e18).toString()).send({from: account[0]});
                setShowCreateFishCatch(false)
                setSpecie('')
                setSize('')
                setPrice('')
                setLoading(false)
              }}>
                {
                  loading ? <Spinner animation={"border"}/> : "Create FishCatch"
                }
          </Button>
          <Button variant="secondary" onClick={() => setShowCreateFishCatch(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  )
}
    