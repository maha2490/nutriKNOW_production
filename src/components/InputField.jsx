var React = require('react');

var InputField = React.createClass({

  getInitialState: function (){
    return({ value: "", value1: "broccoli", value2: "carrots"});
  },
  onChange: function(e){
    this.setState({value: e.target.value });
  },
  render: function(){
    return(
      <div id="input-div">
        <input
        type="text"
        id="input-primary"
        placeholder={this.props.placeholder}
        onChange={this.onChange}
        value={this.state.value}/>
      </div>
    );
  }
});

module.exports = InputField;
