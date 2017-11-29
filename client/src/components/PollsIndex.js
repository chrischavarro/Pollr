import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPolls } from '../actions'

class PollsIndex extends Component {
  componentDidMount() {
    this.props.fetchPolls();
  }

  renderPolls() {
    // console.log(this.props.polls)
    this.props.polls.map(poll => {
      console.log(poll)
      return (
        <div className="card darken-1" key={poll._id}>
          <div className="card-content">
            <span className="card-title">{poll.question}</span>
              <p>
              {poll.options}
              </p>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        {this.renderPolls()}
      </div>
    )
  }
}

function mapStateToProps({polls}) {
  return { polls }
}

export default connect(mapStateToProps, { fetchPolls})(PollsIndex)
