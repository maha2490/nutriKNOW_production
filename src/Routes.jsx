var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

import { hashHistory } from 'react-router';

var Base = require('./components/Base.jsx');
var Articles = require('./components/Articles.jsx');
var Photos = require('./components/Photos.jsx');

var Routes = (
  <Router history={hashHistory}>
    <Route path="/" component={Base}>
      <Route path="/articles" component={Articles}/>
      <Route path="/photos" component={Photos}/>
    </Route>
  </Router>
);

module.exports = Routes;
