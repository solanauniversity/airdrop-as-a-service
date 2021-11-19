import './index.css';
import './App.css';
import { Connection, PublicKey } from "@solana/web3.js";
import * as web3 from '@solana/web3.js';
import { useEffect, useState } from 'react';
import { createAssociatedAccountFromMintKeyAndMint } from './../src/utils/createAssociatedAccountFromMintKeyAndMint';
// import readXlsxFile from 'read-excel-file';
import * as XLSX from "xlsx";
import * as FileSaver from 'file-saver';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RenderTable from './pages/RenderTable';
import wave2 from './../src/assets/wave2.gif'
import excel from './../src/assets/excel.svg';
import excelFormat from './../src/assets/format.png'
import leftArrow from './../src/assets/leftA.png'
import loadingGif from './../src/assets/loading.jpeg'
import solanaLogo from './../src/assets/solana.png'
import { transferCustomToken } from './utils/transferToken';

function App() {

  const [provider, setProvider] = useState()
  const [providerPubKey, setProviderPub] = useState()
  const [mintKey, setMintKey] = useState()
  const [denomination, setDenomination] = useState(9)
  const [network, setNetwork] = useState("devnet")
  const [connection, setConnection] = useState()
  const [fileName, setFileName] = useState()

  const [rawSheet, setRawSheet] = useState([])
  const [updatedSheet, setUpdatedSheet] = useState([])
  const [distributionMessage, setDistributionLink ] = useState()
  const [finalMessage, setFinalMessage] = useState("")
  const [fileErrorMessage, setFileErrorMessage] = useState("")
  const [dataLength, setDataLength] = useState(0)
  const [solAirdrop, setSolAirdrop] = useState(false)

  const airdropToUserWallet = async (ownerPubkey, tokensToAirdrop) => {
    try {
      // tokensToAirdrop = tokensToAirdrop
      const mintPubkey = mintKey // mintKey of the token to be minted
      // ownerPubkey = ownerPubkey //receiver's Solana wallet address
      
      const tokenDenomination = 10 ** denomination
      const transactionSignature = await createAssociatedAccountFromMintKeyAndMint(connection, provider, new PublicKey(mintPubkey), new PublicKey(ownerPubkey), "", tokensToAirdrop, tokenDenomination)
      console.log(transactionSignature, '-transactionSignature-')
      return transactionSignature
    } catch (err) {
      toast.error(`${err ? err.message:"Ohh no! Exception occured. Please check"}`)
      console.log(err)
      return {
        error: `${err ? err.message:"Ohh no! Exception occured. Please check"}`
      }
    }
  }


  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = () => {
      const downLoadSheet = updatedSheet.map( data => {
        return {
          userWallet: data.userWallet,
          tokensToAirdrop: data.tokensToAirdrop,
          signature: data.signature,
          explorer: data.explorer,
          status: data.status
        }
      })
      const ws = XLSX.utils.json_to_sheet(downLoadSheet);
      const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], {type: fileType});
      FileSaver.saveAs(data, fileName +"_airdrop"+ fileExtension);
      toast.success(`Successfully exported the airdrop data`);
  }


  const mintKeyHandler = (e) => {
    setMintKey(e.target.value)
    setUpdatedSheet([])
    setDataLength(0)
    setFinalMessage("")
  }

  const checkBoxHandler = (e) =>{
    const {value} = e.target
    if(value){
      setMintKey(provider.publicKey.toBase58())
      setSolAirdrop(value)
    }else{
      setSolAirdrop(value)
    }
  }

  const denominationHandler = (e)=>{
    e.preventDefault();
    const {value} = e.target
      try{
        const parsed = parseInt(value);
        if(isNaN(parsed)){
          throw Error()
        }
        if(parsed >= 0 && parsed < 10)
          setDenomination(parsed)
        else
          alert("Enter valid range 1-9")
      }catch(err){
        setDenomination("")
        console.log("Please enter valid number")
        return
      }
  }

  const connectToWallet = () => {
    if (!provider && window.solana) {
      setProvider(window.solana)

    }
    if (!provider) {
      toast.info(`Sometimes phantom fails, please try again !!!`);
      console.log("No provider found")
      return
    }
    if (provider && !provider.isConnected) {
      provider.connect()
    }
  }

  const readExcel = async (file) => {
    setFileName(file.name)
    const promiseResult = () => new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        try{
          const wb = XLSX.read(bufferArray, { type: "buffer" });
          const wsname = wb.SheetNames[0];

          const ws = wb.Sheets[wsname];

          const data = XLSX.utils.sheet_to_json(ws);

          resolve(data);
        }catch(err){
          reject(err);
        }
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    try{
      const data = await promiseResult();
      setRawSheet(data)
      setUpdatedSheet([])
      setDataLength(0)
      setFinalMessage("")
      setFileErrorMessage("")
      toast.info(`Excel successfully parsed`);
    }catch(err){
      console.log(err,'---err in file parsing---')
      let errorMessage = `Invalid file error : ${err ? err.name:""}`
      toast.error(errorMessage);
      setRawSheet([])
      setUpdatedSheet([])
      setDataLength(0)
      setFinalMessage("")
      setFileErrorMessage(errorMessage)
      console.log(err)
    }
  };

  const initiateTheAirdrop = async () => {
    let errorCount = 0
    if (!mintKey) {
      alert("mint key is required to make the airdrop")
      return
    }
    if (!rawSheet || !rawSheet.length) {
      alert("Atleast 1 record is required to make the airdrop")
      return
    }

    if (!providerPubKey) {
      alert("You can not proceed without login")
      return
    }
    const distributionMessage = `https://explorer.solana.com/address/${mintKey}/largest${network === 'devnet' ? '?cluster=devnet':''}`
    setDistributionLink(distributionMessage)

    for (let i = 0; i < rawSheet.length; i++) {
      let row = rawSheet[i]
      row.qued = true
      row.status = "Processing..."
      row.loading = true
      row.formattedUserWallet = formatPublicKey(row.userWallet)
      updatedSheet.push(row)
      setUpdatedSheet(updatedSheet)
      setDataLength(updatedSheet.length)
      
      let result;

      if(solAirdrop){
        result = await transferCustomToken(provider, connection,row.tokensToAirdrop,provider.publicKey,row.userWallet)
        row.signature = result ? result.signature : ""
      }else{
        result = await airdropToUserWallet(row.userWallet, row.tokensToAirdrop)
        row.signature = result ? result.transactionSignature : ""
      }

      setDataLength(updatedSheet.length - 1)
      row = updatedSheet[i]
      if (network) {
        row.explorer = `https://explorer.solana.com/tx/${row.signature}?cluster=devnet`
      } else {
        row.explorer = `https://explorer.solana.com/tx/${row.signature}`
      }
      
      if(result.error){
        errorCount +=1
        row.isError = true
      }

      row.status = result && result.status ? "Successful" : `Failure: ${result.error}`
      row.loading = false
      row.formattedSignature = formatPublicKey(row.signature)
      setUpdatedSheet(updatedSheet);
      setDataLength(updatedSheet.length);
    }
    console.log("Sheet processing done")
    let finalMessage= ''
    if(errorCount){
      finalMessage = `Airdrop completed with ${errorCount} errors. Please check`
      toast.info(finalMessage);
    }else{
      finalMessage = `Airdrop completed`
      toast.success(finalMessage);
    }
    setFinalMessage(finalMessage)

    
  }

  const formatPublicKey = (key) => {
    if(!key){
      return
    }
    const firstString = key.slice(0, 4)
    const secondString = key.slice(key.length - 6, key.length)
    return firstString + '....' + secondString
  }


  useEffect(() => {
    if (provider) {

      provider.on("connect", async () => {
        console.log("wallet got connected")
        toast.success(`Successfully connected to the wallet`);
        setProviderPub(provider.publicKey)
      });
      provider.on("disconnect", () => {
        console.log("Disconnected from wallet");
      });
    }
  }, [provider]);

  useEffect(() => {
    if (window.solana && !provider) {
      console.log("Phantom wallet present")
      setProvider(window.solana)
    }
  }, [])

  useEffect(() => {
    const NETWORK = web3.clusterApiUrl(network);
    const connection = new Connection(NETWORK)
    setConnection(connection)
  }, [network])

  /**
   * Handle the network change
   */
  const handleNetworkChange = (e) => {
    setNetwork(e.target.value)
  }

  /**
   * Logout handler
   */
  const disConnectFromWallet = () => {
    window.solana.disconnect()
    toast.info(`Disconnected from the wallet`);
    setProviderPub()
  }

  return (
    <div className="App">
      <div class="container mx-auto">
        <header className="flex justify-items-end justify-self-end justify-end header">
          {providerPubKey && <span style={{
            "line-height": "50px",
            "margin-right": "10px"
          }}>{formatPublicKey(providerPubKey.toBase58())}</span>}
          {!providerPubKey && <button className="loginButton singin" onClick={connectToWallet}>Sign In</button>}
          {providerPubKey && <button className="loginButton" onClick={disConnectFromWallet}>Logout</button>}
          <select defaultValue={"devnet"}

            onChange={handleNetworkChange}
          >
            <option value="devnet">Dev Net</option>
            <option value="mainnet-beta">Main Net Beta</option>
          </select>
        </header>

        {/* View after login */}
        {providerPubKey &&
          <div className="flex justify-start loggedInView content-center">
            <div className="inputView flex flex-1 flex-col justify-center border border-indigo-600">
              <div className="inputWrapper">
                <input type="checkbox" id="airdrop" defaultChecked={solAirdrop} onChange={checkBoxHandler} />
                <label htmlFor="airdrop">&nbsp; SOL Airdrop &nbsp; </label>
              </div>
              <br />
              <div className="inputWrapper">
                <label htmlFor="mintKeyInput">{solAirdrop ? 'Connected Wallet address' : 'Mint Key of the Token'}</label>
                <input
                  type="text"
                  onChange={mintKeyHandler}
                  className="mintKeyInput"
                  value={mintKey}
                />
                {mintKey && (mintKey.length <= 42 || mintKey.length >= 45) && <span style={{ color: "red" }}>Please enter valid mint key</span>}
              </div>
              <div className="inputWrapper">
                <label htmlFor="mintKeyInput">Denomination of  Token</label>
                <input
                  type="number"
                  min={1}
                  max={9}
                  value={denomination}
                  onChange={denominationHandler}
                  className="mintKeyInput"
                />
                {<span style={{ color: "gray" }}>{`${10**denomination} Lamports`}</span>}
              </div>
              <br />
              <div className="inputWrapper fileWrapper">
                <div className="wrapped">
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      readExcel(file);
                    }}
                    className="fileInput"
                    id="fileInput"
                  />
                  <label for="fileInput">choose an excel file</label>
                </div>
                {fileErrorMessage && fileErrorMessage.length && <span style={{ color: "red", marginLeft:"100px", top:"190px",position:"absolute" }}>Please upload valid excel file</span>}
                {<div className="fileName flex-col">
                  {!fileName && <img src={excel} alt="" style={{ width: "200px" }} />}
                  {fileName && <div> <div className="fileNameRow">
                    {fileName}
                  </div>
                    <div className="fileNameRow">
                      Total Records: {rawSheet.length}
                    </div>
                  </div>}
                </div>}

              </div>
              <br />
              <button onClick={initiateTheAirdrop} className={`airdropButton ${rawSheet && rawSheet.length && mintKey && (mintKey.length > 42 && mintKey.length < 45) ? 'activeState' : 'disabledState'} `}> Airdrop Tokens 
              {updatedSheet.length ? finalMessage.length ? ""  :<img src={loadingGif} alt="" style={{width: '30px',
    'position': 'absolute',
    'right': '20px',
    'top': '14px',
    
}}/> :"" } </button>
            </div>
            <div className="flex-3 flex-col flex-grow resultView border border-yellow-400 justify-center ">
              {updatedSheet && updatedSheet.length > 0 && <div> 
                <div className="exportButton">
                  {finalMessage && finalMessage.length >0 && <div className="doneMessage" style={{
                'bottom': 0,
                'margin-right': '100px',
                'fontSize': '1em',
                'color': 'rgb(11 145 82)',
                'fontWeight': 'bold'}}>
                    {finalMessage} 
                  </div>}
                <div className="distributionLink" style={{ 'marginRight': '30px',
    'color': '#0065ff',
    'textDecoration': 'underline'}}>
                  <a href={distributionMessage} target="_blank">Check token distribution</a>
                </div>
                 <button onClick={exportToCSV}><img src={excel} alt="" style={{width:"40px"}} /> Export </button> 
                </div>

                <RenderTable updatedSheet={updatedSheet}></RenderTable>
                
              </div> 
}
              {(!updatedSheet || updatedSheet.length < 1) && <div className="excelFormat">
                <img src={leftArrow} alt="" className="arrow" />
                <h2>Steps to initiate the Airdrop</h2>
                <ul style={{ textAlign: "left" }}>
                  <ol>1. In case of Custom Token Transfer, Please paste the <strong>Mint Key</strong> of the token associated with the logged in wallet.</ol>
                  <ol>2. Please mention <strong>Denomination in Lamports</strong> of the token. Solana max supports 1-9</ol>
                  <ol>3. Please upload the <strong>excel</strong> in below format only.
                    <img src={excelFormat} alt="" /></ol>
                  <ol>4. Click on <strong>Airdrop Token</strong> to initiate the airdrop process.</ol>
                </ul>


              </div>}
            </div>
          </div>}
        {!providerPubKey && <div className="landingView">
          <img src={wave2} alt="" srcset="" className="landingImage" />
          <div className="flex flex-col justify-center align-middle content-center" style={{ height: '100%' }}>
            <div className="heading">
              Airdrop As A Service
            </div>
            <div className="subHeading">
              Now doing it, is as simple as sipping a coffee !!!
            </div>
            <div className="subSubHeading">
              You can airdrop SOL or any custom SOLANA SPL token with this service.
            </div>
            <div className="solanaLogo">
            Powered by
            <img src={solanaLogo} alt="" className="solanaLogo" />
            </div>
          </div>
        </div>

        }
      </div>
      <ToastContainer />
    </div>

  );
}

export default App;
