const MainRender = React.createClass({
  render: function() {
    return (
      <div>
      <FormSubmit />
      </div>
    );
  }
});

//FORMSUBMIT---------------------------------------------------------------------------------

const FormSubmit = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
     let transactionObj = this.state;
     console.log('transactionObj', transactionObj);
  },
  render: function() {
    console.log('this.state', this.state)
    return (
      <div>
      <form onSubmit = {this.handleSubmit}>
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
        <span id = "accBalance">Account Balance: </span><br/>
        <span id = "creditTotal">Credit Total: </span><br/>
        <span id = "accBalance">Account Balance: </span><br/>
      </form>
      </div>
    );
  }
});


ReactDOM.render(
  <MainRender />, document.getElementById('root')
);
