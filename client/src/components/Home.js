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
      <div className="card darken-2">
        <div className="card-content center-align ">
        {this.renderLinks()}

        <Link to="/polls" className="red btn-flat white-text">
          View All Polls
        </Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
};

export default connect(mapStateToProps, actions)(Home);
