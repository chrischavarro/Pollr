import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'
import { Link } from 'react-router-dom';

class Home extends Component {
  componentDidMount() {
    // this.props.fetchUser();
  }

  render() {
    return (
      <div>

        <Link to="/polls/new" className="red btn-flat white-text">
          Make a New Poll
        </Link>
        <Link to="/polls" className="red btn-flat white-text">
          View All Polls
        </Link>
      </div>
    )
  }
}

export default connect(null, actions)(Home);
