import React, { useEffect, useState} from 'react';
import './Styles.css';
const Home = (props) => {
  const [AvailableTokens,setAvailableTokens] = useState(0);
  const [StakedTokens,setStakedTokens] = useState(0);
  const [StakedAt,SetStakedAt] = useState();
  const [TranStatusPurachse,SetTranStatusPurachse]=useState();
  const [TranStatusSTAKE,SetTranStatusSTAKE]=useState();
  const [TranStatusUNSTAKE,SetTranStatusUNSTAKE]=useState();
  useEffect(()=>{
    const getData = async(e)=>{
      setAvailableTokens((await props.contract.balanceOf(props.account)).toString());
      try{
        const Data = await props.contract.StakerDetails(props.account);
        setStakedTokens(Data.amount.toString())
        SetStakedAt(new Date(Data.startTime * 1000).toLocaleString())
      }catch(e){
        console.log(e);
      }
    }
    props.contract && getData()
  },[props.contract,AvailableTokens,StakedTokens,StakedAt])
const BuyHandler = async(e)=>{
  e.preventDefault();
  const tokens = document.querySelector("#tokens1").value;
  try{
    const transaction = await props.contract.BuyTokens(tokens);
    SetTranStatusPurachse("Please wait ...")
    await transaction.wait();
    document.querySelector("#tokens1").value="";
    SetTranStatusPurachse("");
    alert("Tokens Purchase Successfull");
    window.location.reload();
  }catch(e){
    SetTranStatusPurachse("");
    alert(e.reason);
    console.log(e);
  }
}
const StakeHandler = async(e)=>{
  e.preventDefault();
  const tokens = document.querySelector("#tokens2").value;
  try{
    const transaction = await props.contract.StakeTokens(tokens);
    SetTranStatusSTAKE("Please wait...");
    await transaction.wait();
    document.querySelector("#tokens2").value=""
    SetTranStatusSTAKE("");
    alert("Tokens Staked Successfull");
    window.location.reload();
  }catch(e){
    SetTranStatusSTAKE("");
    alert(e.reason);
    console.log(e);    
  }
}
const UnStakeHandler = async(e)=>{
  e.preventDefault();
  const tokens = document.querySelector("#tokens3").value;
  try{
    const transaction = await props.contract.UnstakeTokens(tokens);
    SetTranStatusUNSTAKE("Please wait...");
    await transaction.wait();
    document.querySelector("#tokens3").value="";
    SetTranStatusUNSTAKE("");
    alert("Tokens Unstaked Successfull");
    window.location.reload();
  }catch(e){
    SetTranStatusUNSTAKE("");
    alert(e.reason);
    console.log(e); 
  }
}
  return (
    <div>
      <div className="header">
        <a href="#deftault" className="logo">ERC20Staking DeFi</a>
        <div className="header-right">
          <a>CONNECTED : {props.account}</a>
        </div>
      </div>
      <div className="outer">
      <div class="results">
        <div class="results_in">
          <span>Token Balance : {AvailableTokens}</span>
        </div>
        <div class="results_in">
          <span>Staked Tokens : {StakedTokens}</span>{StakedTokens == 0 ?"" :<div><span>At {StakedAt}</span></div>}
        </div>
      </div><br/><br/>
     <center><span class="note">Stake the tokens to get the reward of 10% tokens for every 5 minutes <br/>Reward will be added after tokens are unstaked</span></center> 
      <div className="inner" >
              <div className="Productitem">
              <div className="productbody">
                <p>BUY TOKENS</p>
                <form class="form-group"  onSubmit={BuyHandler}>
                  <input type="text" class="form-control" placeholder='Enter amount of Tokens' id="tokens1" required/><br/>
                  <input type="submit" value={"SUBMIT"} class="btn btn-secondary"/><br/>
                </form>
                <span>{TranStatusPurachse}</span>
              </div>
            </div>
            <div className="Productitem">
              <div className="productbody">
                <p>STAKE TOKENS</p>
              <form class="form-group" onSubmit={StakeHandler}>
                  <input type="text" class="form-control" placeholder='Enter amount of Tokens' id="tokens2" required/><br/>
                  <input type="submit" value={"SUBMIT"} class="btn btn-secondary"/>
              </form>
              <span>{TranStatusSTAKE}</span>
              </div>
            </div>
            <div className="Productitem">
              <div className="productbody">
              <p>UNSTAKE TOKENS</p>
              <form class="form-group" onSubmit={UnStakeHandler}>
                  <input type="text" class="form-control" placeholder='Enter amount of Tokens' id="tokens3" required/><br/>
                  <input type="submit" value={"GET"} class="btn btn-secondary"/>
                </form>
                <span>{TranStatusUNSTAKE}</span>
              </div>
            </div>
        </div>
      </div> 
    </div>
  );
};
export default (Home);

