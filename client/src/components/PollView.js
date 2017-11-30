import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPoll, castVote } from '../actions';

class PollView extends Component {

  componentWillMount(){
    this.props.fetchPoll(this.props.match.params.pollId)
  }

  renderPoll() {
    const { options } = this.props.polls;
    if (options) {
      return options.map(option => {
        return (
          <div key={option._id}>
            <button
              className="waves-effect waves-light btn"
              onClick={() => this.props.castVote(option._id)}
              >
                {option.option}
            </button>
            {option.option}: Votes - {option.count}
          </div>
        )
      })
    }
  }

  render() {
    return (
      <div>
        <div className="card darken-2">
          <div className="card-content center-align">
            <span className="card-title">{this.props.polls.question}</span>
            <span><h5>Cast Your Vote!</h5></span>
            {this.renderPoll()}

          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ polls }) {
  return { polls }
};

export default connect(mapStateToProps, { fetchPoll, castVote })(PollView);
// Create an action to check if ip address has already voted
