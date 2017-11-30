import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions'

import Header from './components/Header';
import Home from './components/Home';
import LoginPage from './components/LoginPage'
import PollNew from './components/PollNew';
import PollsIndex from './components/PollsIndex';
import PollView from './components/PollView';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route exact path="/" component={Home} />
            <Route path="/login" component={LoginPage} />
            <Route path="/polls/:pollId" component={PollView} />
            <Route exact path="/polls" component={PollsIndex} />
            <Route exact path="/polls/new" component={PollNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
