const MainRender = React.createClass({
  getInitialState() {
    this.getData();
    return {
      transactions: []
    }
  },
  getData() {
    fetch('/balances')
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({transactions : data})
      })
      .catch(err => {
        console.log('err:', err)
      })
  },
  handleSubmit(obj) {
    let transactionObj = obj;
    console.log('transactionObj', transactionObj);

    fetch('/balances', {
      method: 'POST',
      headers: {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(transactionObj)
    })
    .then(res => {
      this.getData();
    })
    .catch(err => {
      console.log('err', err);
    })
  },
  deleteOne(id) {
    fetch(`/balances/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      this.getData();
    })
    .catch(err => {
      console.log('err', err);
    })
  },
  render: function() {
    return (
      <div>
      <FormSubmit handleSubmit = {this.handleSubmit} />
      <TotalBalances calculateTotals = {this.state.transactions}/>
      <DisplayData displayFinally = {this.state.transactions} deleteOne={this.deleteOne}/>

      </div>
    );
  }
});

//DisplayDATA---------------------------------------------------------------------------------

const DisplayData = React.createClass({
  editOne() {
    alert("edits should are not allowed in a banking app");
  },
  render: function() {
    let arr = this.props.displayFinally.map(thing => {
      // console.log('thing:', thing);
      // return <li key={thing._id}>{thing.name}&nbsp;{thing.type}&nbsp;{thing.amount}</li>
      return  <div key = {thing._id}>
              <br/><li><b>transaction name: </b>{thing.name}</li>
                   <li><b>type: </b>{thing.type}</li>
                   <li><b>amount: </b>{thing.amount}</li>
                   <li><b>date created: </b>{thing.newTime}</li>

                   <li><button className= "btn btn-danger btn-xs" onClick = {this.props.deleteOne.bind(null,thing._id)}>X</button>
                   <button className= "btn btn-primary btn-xs" onClick = {this.editOne}>edit</button></li>
                   <hr className = "style-one"/>
              </div>
    })
    return (
      <ul className="list-group">
        {arr}
      </ul>
    )
  }
});

//FORMSUBMIT---------------------------------------------------------------------------------

const FormSubmit = React.createClass({

  getInitialState() {
    return {
      type: "",
      name: "",
      amount: null
    }
  },

  wasSubmitted(e){
    e.preventDefault();
    this.props.handleSubmit(this.state);
  },

  render: function() {
    return (
      <div>
      <form onSubmit = {this.wasSubmitted}>
      <input type="radio" name="account" onChange={() => this.setState({type: 'debit'})}/><label>Debit &nbsp;&nbsp;&nbsp;</label>
      <input type="radio" name="account" onChange={() => this.setState({type: 'credit'})}/><label>Credit</label><br/>
      <label>transaction</label>
      <br/>
      <input placeholder = "transaction" type = "Text" onChange={e => this.setState({name: e.target.value})}/>
      <br/>
      <label>amount</label><br/>
      <input placeholder = "amount" type = "Number" onChange={e => this.setState({amount: e.target.value})}/>
      <br/>
      <br/>
      <button className = "btn btn-primary btn-xs" type = "submit" >Submit</button>
      </form>
      </div>
    );
  }
});

//Totals---------------------------------------------------------------------------
const TotalBalances = React.createClass({

  render: function() {
    let debit = 0,
        credit = 0;

    this.props.calculateTotals.forEach(obj => {
      obj.type === "credit" ? credit += obj.amount : debit += obj.amount;
    })
    let bal = credit - debit;
    if (bal < 0){
       bal = "Debit: " + (debit - credit);
    } else if (bal > 0){
      bal = "Credit: " + (credit - debit);
    } else {

    }
    return (
      <div>
        <br/>
        <br/>
        <span id = "debitTotal"><b>Debit Total: <span>{debit}</span></b></span><br/>
        <span id = "creditTotal"><b>Credit Total: <span>{credit}</span></b></span><br/>
        <span id = "accBalance"><b>Account Balance: <span>{bal}</span></b></span><br/>
      </div>
    )
  }
})


ReactDOM.render(
  <MainRender />, document.getElementById('root')
);
