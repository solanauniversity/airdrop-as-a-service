import React, { PureComponent } from 'react'
import loadingGif from './../assets/loading.jpeg'
function RenderTable(props){
    const updatedSheet = props.updatedSheet
    return(
        <div className="tableContainer">
             <table class="border-separate table resultTable">
                <thead>
                  <tr>
                    <th scope="col" className="border border-green-600">Wallet ID</th>
                    <th scope="col" className="border border-green-600">Signature</th>
                    <th scope="col" className="border border-green-600" style={{width:"300px", maxWidth:"300px",overflow:"none", overflowX:"scroll"}}>Status</th>
                    <th scope="col" className="border border-green-600">Explorer</th>
                  </tr>
                </thead>
                <tbody>
                  {updatedSheet.map((d) => (
                    <tr key={d.signature}>
                      <td className="border border-green-600" >{d.formattedUserWallet}</td>
                      <td className="border border-green-600">{d.formattedSignature}</td>
                      <td className="border border-green-600 loadingCell" style={{maxWidth:"300px",overflow:"none", overflowX:"scroll",color:`${d.isError ? "red":"black"}`}}>{d.status}
                      {d.loading && <img src={loadingGif} alt="" />}
                      </td>
                    
                      <td className="border border-green-600">
                        <a href={d.explorer} target="_blank" style={{textDecoration:"underline", color:"#0065ff"}}>Explore</a>
                        </td>
                      
                    </tr>
                  ))}
                  </tbody>
                  </table>
        </div>
    )
}

export default RenderTable;