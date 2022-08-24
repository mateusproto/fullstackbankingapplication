function Withdraw(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
        <WithdrawMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function WithdrawValidate(amount){ 
  if (!amount || amount <= 0  || amount === 0  || amount === '00' || isNaN(parseFloat(amount))) {
    return false;
  } 
  return true;

}

function WithdrawMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Withdraw again
    </button>
  </>);
}

function WithdrawForm(props){
  //const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');
  const { user } = React.useContext(UserContext);  
  console.log(user.balance);

  function handle(){
    if(WithdrawValidate(amount)) {
      if (user.balance - amount >= 0) {  
        fetch(`/account/update/${user.email}/-${amount}`)
        .then(response => response.text())
        .then(text => {
            try {
                const data = JSON.parse(text);
                props.setStatus(JSON.stringify(data.value));
                props.setShow(false);
                console.log('JSON:', data);
                user.balance = JSON.stringify(data.value.balance);
                console.log(user.balance);
  
            } catch(err) {
                props.setStatus('Withdraw failed')
                console.log('err:', text);
                setTimeout(() => props.setStatus(''),3000);
            }
        });
      } else {
        props.setStatus('Withdraw failed, not enough balance')
        console.log('err:', props.status);
        setTimeout(() => props.setStatus(''),3000);
      }
    } else {
      props.setStatus('Withdraw failed, invalid amount')
      console.log('err:', props.status);
      setTimeout(() => props.setStatus(''),3000);
    }
  }


  return(<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      disabled
      placeholder="Enter email" 
      value={user.email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Withdraw
    </button>

  </>);
}
