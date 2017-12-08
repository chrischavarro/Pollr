import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPolls } from '../../actions'
import { Link } from 'react-router-dom'

class PollsIndex extends Component {
  componentWillMount() {
    this.props.fetchPolls();
  }

  renderPolls() {
    const { polls } = this.props
    if (this.props.polls) {
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
      </div>
    )
  }
}

function mapStateToProps({polls}) {
  return { polls }
}

export default connect(mapStateToProps, { fetchPolls})(PollsIndex)
