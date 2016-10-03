// USDA api key: m3GXTKEKmYt5HDiyghehyypdDp9aq8jtdWyD8ea8
var Fetch = require('whatwg-fetch');
var baseUrl = 'http://api.nal.usda.gov/ndb/reports/';

var service = {
  searchKeyword: function(term){
    return fetch( 'https://api.nal.usda.gov/ndb/search/?format=json&'+`q=${term}`+'&sort=r&max=250&ds=Standard Reference&offset=0&api_key=m3GXTKEKmYt5HDiyghehyypdDp9aq8jtdWyD8ea8')
    .then(function(response){
      return response.json();
    });
  },
  getReport: function(term){
    return fetch( 'https://api.nal.usda.gov/ndb/reports/?'+`ndbno=${term}`+'&type=b&format=json&api_key=m3GXTKEKmYt5HDiyghehyypdDp9aq8jtdWyD8ea8')
    .then(function(response){
      return response.json();
    });
  }
}

module.exports = service;
