import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPolls } from '../../actions'
import { Link } from 'react-router-dom'

class PollsIndex extends Component {
  componentWillMount() {
    this.props.fetchPolls();
  }

  renderCreateButton() {
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

  renderPolls() {
    const { polls } = this.props
    if (this.props.polls && this.props.polls.length > 0) {
      return polls.reverse().map(poll => {
        return (
          <div className="card darken-1" key={poll._id}>
            <div className="card-content center-align">
              <Link to={ "/polls/:poll._id".replace(':poll._id', `${poll._id}`) }><span className="card-title">{poll.question}</span></Link>
            </div>
          </div>
        )
      })
    }
  }

  render() {
    return (
      <div>
      {this.renderPolls()}

      {this.renderCreateButton()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    polls: state.polls,
    auth: state.auth
  }
}

export default connect(mapStateToProps, { fetchPolls})(PollsIndex)
