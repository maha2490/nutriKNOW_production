var React = require('react');
var HTTP = require('../services/http_requests.js');

var ComparissonTable = React.createClass({

  getInitialState: function (){
    return({food1Report: {}, food2Report: {} });
  },
  componentWillMount: function(){
      HTTP.getReport(this.props.foodItem1).then(function(data){
        this.setState({food1Report: data});
      }.bind(this));

      HTTP.getReport(this.props.foodItem2).then(function(data){
        this.setState({food2Report: data});
      }.bind(this));
  },
  componentWillReceiveProps: function(nextProps){
       //This method is called when the component receives new props.
       if (nextProps.foodItem1 != this.props.foodItem1){
         HTTP.getReport(nextProps.foodItem1).then(function(data){
           this.setState({food1Report: data});
           //console.log(this.state.food1Report);
         }.bind(this));
       };
       if (nextProps.foodItem2 != this.props.foodItem2){
         HTTP.getReport(nextProps.foodItem2).then(function(data){
           this.setState({food2Report: data});
           //console.log(this.state.food2Report);
         }.bind(this));
       };
  },
  render: function(){

    if (this.state.food1Report.report){
      var name1 = this.state.food1Report.report.food.name
    };
    if (this.state.food2Report.report){
      var name2 = this.state.food2Report.report.food.name
      var tableRows = this.state.food2Report.report.food.nutrients.map(function(item,index){


        var col1NutrientValue = this.state.food1Report.report.food.nutrients.find(x=>x.name===item.name);//?console.log("something here"):console.log("this nutrient was not meaasured")
        var style1 = {}, style2={};
        //console.log(col1NutrientValue.value);
        //console.log(item.value);
        //console.log(parseFloat(col1NutrientValue.value)<parseFloat(item.value));

        if (col1NutrientValue == undefined) {
          // Do Nothing
        } else if (parseFloat(col1NutrientValue.value)>parseFloat(item.value)) {
          style1 = {backgroundColor:"#ffeee6"}; style2={};
        } else if (parseFloat(col1NutrientValue.value)<parseFloat(item.value)) {
          style1 = {}; style2={backgroundColor:"#ffeee6"};
        };

        return (
          <tr key={item.name}>
            <td style={style1}>{col1NutrientValue?col1NutrientValue.value:"N/A"}</td>
            <td className="nutrient_category">{item.name + " " + "(" +item.unit+")"}</td>
            <td style={style2}>{item.value}</td>
          </tr>
        );
      }.bind(this));
    };
    return(
      <div>
          <table className="bordered centered">
          <thead>
          <tr>
            <th className="item1_heading">{name1}</th>
            <th>Nutrient (Unit)</th>
            <th className="item2_heading">{name2}</th>
          </tr>
          </thead>
          <tbody>
          {tableRows}
          {/* <tr>
            <td>1</td>
            <td className="nutrient_category">Energy (calories)</td>
            <td>2</td>
          </tr>
          <tr>
            <td>1</td>
            <td className="nutrient_category">Protein (g)</td>
            <td>2</td>
          </tr>
          <tr>
            <td>1</td>
            <td className="nutrient_category">Fat (g)</td>
            <td>2</td>
          </tr>
          <tr>
            <td>1</td>
            <td className="nutrient_category">Dietary Fiber (g)</td>
            <td>2</td>
          </tr>
          <tr>
            <td>1</td>
            <td className="nutrient_category">Sugars (g)</td>
            <td>2</td>
          </tr>
          <tr>
            <td>1</td>
            <td className="nutrient_category">sdsd</td>
            <td>2</td>
          </tr>
          <tr>
            <td>1</td>
            <td className="nutrient_category">sdsd</td>
            <td>2</td>
          </tr>
          <tr>
            <td>1</td>
            <td className="nutrient_category">sdsd</td>
            <td>2</td>
          </tr>
          <tr>
            <td>1</td>
            <td className="nutrient_category">sdsd</td>
            <td>2</td>
          </tr>
          <tr>
            <td>1</td>
            <td className="nutrient_category">sdsdsds</td>
            <td>2</td>
          </tr>
          <tr>
            <td>1</td>
            <td className="nutrient_category">sdsdsds</td>
            <td>2</td>
          </tr>
          <tr>
            <td>1</td>
            <td className="nutrient_category">sdsdsds</td>
            <td>2</td>
          </tr>
          <tr>
            <td>1</td>
            <td className="nutrient_category">sdsdsds</td>
            <td>2</td>
          </tr>
          <tr>
            <td>1</td>
            <td className="nutrient_category">sdsdsds</td>
            <td>2</td>
          </tr>
          <tr>
            <td>1</td>
            <td className="nutrient_category">sdsdsds</td>
            <td>2</td>
          </tr>
          <tr>
            <td>1</td>
            <td className="nutrient_category">sdsdsds</td>
            <td>2</td>
          </tr>
          <tr>
            <td>1</td>
            <td className="nutrient_category">sdsdsds</td>
            <td>2</td>
          </tr>
          <tr>
            <td>1</td>
            <td className="nutrient_category">sdsdsds</td>
            <td>2</td>
          </tr>
          <tr>
            <td>1</td>
            <td className="nutrient_category">sdsdsds</td>
            <td>2</td>
          </tr>
          <tr>
            <td>1</td>
            <td className="nutrient_category">sdsdsds</td>
            <td>2</td>
          </tr>
          <tr>
            <td>1</td>
            <td className="nutrient_category">sdsdsds</td>
            <td>2</td>
          </tr>
          <tr>
            <td>1</td>
            <td className="nutrient_category">sdsdsds</td>
            <td>2</td>
          </tr>
          <tr>
            <td>1</td>
            <td className="nutrient_category">sdsdsds</td>
            <td>2</td>
          </tr>
          <tr>
            <td>1</td>
            <td className="nutrient_category">sdsdsds</td>
            <td>2</td>
          </tr>
          <tr>
            <td>1</td>
            <td className="nutrient_category">sdsdsds</td>
            <td>2</td>
          </tr>
          <tr>
            <td>1</td>
            <td className="nutrient_category">sdsdsds</td>
            <td>2</td>
          </tr>
          <tr>
            <td>1</td>
            <td className="nutrient_category">sdsdsds</td>
            <td>2</td>
          </tr>
          <tr>
            <td>1</td>
            <td className="nutrient_category">sdsdsds</td>
            <td>2</td>
          </tr>
          <tr>
            <td>1</td>
            <td className="nutrient_category">sdsdsds</td>
            <td>2</td>
          </tr>
          <tr>
            <td>1</td>
            <td className="nutrient_category">sdsdsds</td>
            <td>2</td>
          </tr>
          <tr>
            <td>1</td>
            <td className="nutrient_category">sdsdsds</td>
            <td>2</td>
          </tr>
          <tr>
            <td>1</td>
            <td className="nutrient_category">sdsdsds</td>
            <td>2</td>
          </tr>
          <tr>
            <td>1</td>
            <td className="nutrient_category">sdsdsds</td>
            <td>2</td>
          </tr> */}
          </tbody>
          </table>
      </div>
    );
  }
});

module.exports = ComparissonTable;
