import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'
import { Link } from 'react-router-dom';

class Home extends Component {
  renderLinks() {
    if (this.props.auth) {
      return (
        <div style={{ marginBottom: '15px' }}>
          <Link to="/polls/new" className="red btn-flat white-text">
            Make a New Poll
          </Link>
        </div>
      )
    }
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2>Welcome to Pollr!</h2>
        <div className="card darken-3">
          <div className="card-content center-align" style={{ fontSize: '20pt' }}>
          <Link to ="/signup">Sign up</Link> or <Link to ="/polls">check out some polls</Link>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
};

export default connect(mapStateToProps, actions)(Home);
