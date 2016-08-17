// var uuid = require('uuid');

const MainRender = React.createClass({
  getInitialState() {
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
        console.log(data);
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
      this.setState({transactions : this.state.transactions.concat(transactionObj)})
    })
    .catch(err => {
      console.log('err', err);
    })
  },
  render: function() {
    return (
      <div>
      <FormSubmit handleSubmit = {this.handleSubmit} />
      <DisplayData displayFinally = {this.state.transactions}/>
      </div>
    );
  }
});

//DisplayDATA---------------------------------------------------------------------------------

const DisplayData = React.createClass({
  render: function() {
    console.log("anything");
    let arr = this.props.displayFinally.map(thing => {
      console.log('thing:', thing);
      // return <li key={thing._id}>{thing.name}&nbsp;{thing.type}&nbsp;{thing.amount}</li>
      return  <div>
              <br/><li><b>transaction name: </b>{thing.name}</li>
                   <li><b>type: </b>{thing.type}</li>
                   <li><b>amount: </b>{thing.amount}</li>
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
    console.log('this.state', this.state)
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
      <br/>
      <br/>
      <span id = "accBalance"><b>Account Balance: </b></span><br/>
      <span id = "creditTotal"><b>Credit Total: </b></span><br/>
      <span id = "accBalance"><b>Account Balance: </b></span><br/>
      </form>
      </div>
    );
  }
});


ReactDOM.render(
  <MainRender />, document.getElementById('root')
);
