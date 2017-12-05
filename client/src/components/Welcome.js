import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'

class Welcome extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {

    return (
      <div>
      Welcome
      </div>
    )
  }
}

export default connect(null, actions)(Welcome);
