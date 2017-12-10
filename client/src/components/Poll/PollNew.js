import React, { Component } from 'react';
import PollForm from './PollForm';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router'

class PollNew extends Component {
  componentDidMount() {
    const { history } = this.props
      if (!this.props.auth) {
        history.push('/login')
      }
  }

  render() {
    return (
      <PollForm />
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
};

export default connect(mapStateToProps)(PollNew);
