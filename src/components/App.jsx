var React = require('react');
var InputField = require('./InputField.jsx');
var ComparissonTable = require('./ComparissonTable.jsx');
// var FoodButton = require('./FoodButton.jsx');
var HTTP = require('../services/http_requests.js');


var App = React.createClass({

  getInitialState: function (){
    return({food1Data:"11090", food2Data:"11124", searchResults1: {}, searchResults2: {} });
  },
  httpRequest: function(e){
    //Make http request for search term
    e.preventDefault();
    //console.log(e.target);
    if (e.target.value === "1"){
      var term = this.refs.searchTerm1.state.value?this.refs.searchTerm1.state.value:undefined;
      HTTP.searchKeyword(term).then(function(data){
        this.setState({searchResults1: data});
      }.bind(this));
    } else if(e.target.value === "2"){
      var term = this.refs.searchTerm2.state.value?this.refs.searchTerm2.state.value:undefined;
      HTTP.searchKeyword(term).then(function(data){
        this.setState({searchResults2: data});
      }.bind(this));
    };
  },
  setSelection1: function(e){
    // console.log(e.target.value);
    this.setState({food1Data:e.target.value});
  },
  setSelection2: function(e){
    // console.log(e.target.value);
    this.setState({food2Data:e.target.value});
  },

  render: function(){

    if (this.state.searchResults1.list){
      var listItems1 = this.state.searchResults1.list.item.map(function(item){
           // check if at least one of the search terms is the first or second word of the result
           var searchTerm = this.refs.searchTerm1.state.value.toLowerCase();
           var searchTermWords = searchTerm.split(/\s|,\s|,/);
           var result = item.name.toLowerCase();
           var first2WordsOfResult = [];
           first2WordsOfResult.push(result.split(/\s|,\s|,/)[0]);
           first2WordsOfResult.push(result.split(/\s|,\s|,/)[1]);
           //console.log(searchTermWords);
           //console.log(first2WordsOfResult);
           var veredicts = [];
           searchTermWords.forEach(function(word){
                var isSuperset = word.split("").every(function(val){
              	   return (first2WordsOfResult[0].split("").indexOf(val) >= 0)||(first2WordsOfResult[1].split("").indexOf(val) >= 0);
              	});
              	//console.log(isSuperset)
              	if (isSuperset){
              		veredicts.push(isSuperset);
              	}else{
              		veredicts.push(false);
              	}
            });
            var finalVeredict = veredicts.some(function(veredict){
            	  return veredict === true;
            });
           //console.log(finalVeredict)
           if (finalVeredict===true){
             return <button style={this.state.food1Data==item.ndbno?{backgroundColor:"#FFBFA0"}:{}} type="button" className="list-group-item collection-item waves-effect waves-light btn btn3" key={item.ndbno} value={item.ndbno} onClick={this.setSelection1}>{item.name}</button>;
           }
      }.bind(this));
    };
    if (this.state.searchResults2.list){
      var listItems2 = this.state.searchResults2.list.item.map(function(item){
        // check if at least one of the search terms is the first word of the result
        var searchTerm = this.refs.searchTerm2.state.value.toLowerCase();
        var searchTermWords = searchTerm.split(/\s|,\s|,/);
        var result = item.name.toLowerCase();
        var first2WordsOfResult = [];
        first2WordsOfResult.push(result.split(/\s|,\s|,/)[0]);
        first2WordsOfResult.push(result.split(/\s|,\s|,/)[1]);
        //console.log(searchTermWords);
        //console.log(first2WordsOfResult);
        var veredicts = [];
        searchTermWords.forEach(function(word){
             var isSuperset = word.split("").every(function(val){
                return (first2WordsOfResult[0].split("").indexOf(val) >= 0)||(first2WordsOfResult[1].split("").indexOf(val) >= 0);
             });
             //console.log(isSuperset)
             if (isSuperset){
               veredicts.push(isSuperset);
             }else{
               veredicts.push(false);
             }
         });
         var finalVeredict = veredicts.some(function(veredict){
             return veredict === true;
         });
        //console.log(finalVeredict)
        if (finalVeredict===true){
          return <button style={this.state.food2Data==item.ndbno?{backgroundColor:"#FFBFA0"}:{}} type="button" className="list-group-item collection-item waves-effect waves-light btn btn3" key={item.ndbno} value={item.ndbno} onClick={this.setSelection2}>{item.name}</button>;
        }

        //return <button style={this.state.food2Data==item.ndbno?{backgroundColor:"#FFBFA0"}:{}} type="button" className="list-group-item collection-item waves-effect waves-light btn btn3" key={item.ndbno} value={item.ndbno} onClick={this.setSelection2}>{item.name}</button>;
      }.bind(this));
    };

    return(

        <div className="panel panel-default">
          <div className="panel-body">
          <div className="row">

            <div className="col s12 m6">
                <form>
                  <InputField placeholder="e.g. raw broccoli" ref="searchTerm1"/>
                  <button type="submit" onClick={this.httpRequest} className="search_button fa fa-search fa-2x" aria-hidden="true" value="1"></button>
                </form>
                <div className="list-group collection col s12">
                  {listItems1}
                </div>
            </div>

            <div className="col s12 m6">
              <form>
                <InputField placeholder="e.g. raw carrots" ref="searchTerm2"/>
                <button type="submit" onClick={this.httpRequest} className="search_button fa fa-search fa-2x" aria-hidden="true" value="2"></button>
              </form>
                <div className="list-group collection col s12">
                  {listItems2}
                </div>
            </div>

          </div> {/* end of row */}

          <div className="row">
            <div className="col s12">
              <div className="panel panel-default">
                <div id="panel_heading">Comparison per 100g</div>
                <div className="panel-body">
                  <ComparissonTable foodItem1={this.state.food1Data} foodItem2={this.state.food2Data}/>
                </div>
              </div>
            </div>
          </div>

          </div>
        </div>

    );
  }
});

module.exports = App;
