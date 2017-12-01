import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPoll, castVote } from '../actions';
import PollChart from './PollChart';

class PollView extends Component {

  componentWillMount(){
    this.props.fetchPoll(this.props.match.params.pollId);
  }

  renderPoll() {
    const { options } = this.props.polls;
    if (options) {
      return options.map(option => {
        // console.log(option.option, option.count)
        return (
          <div key={option._id} style={{ marginBottom: '15px' }} className="col s12 center-align">
            <button
              className="waves-effect waves-light btn"
              onClick={() => this.props.castVote(option._id, option.pollId)}
              style={{ width: '30%'}}
              >
                {option.option}
            </button>
          </div>
        )
      })
    }
  }

  render() {

    const dataArray = [];
    const labelArray = [];
    if (this.props.polls.options) {
      this.props.polls.options.map(option =>
        dataArray.push(option.count) &&
        labelArray.push(option.option)
      )
    }

    const data = {
    	labels: labelArray,
    	datasets: [{
    		data: dataArray,
    		backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    		hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    	}]
    };



    return (
      <div>
        <div className="card darken-2">
          <div className="card-content center-align " ref="pollResults">
            <span className="card-title">{this.props.polls.question}</span>
            <span><h5>Cast Your Vote!</h5></span>
            <div className="row">
              {this.renderPoll()}
              <PollChart chartData={data} />
            </div>
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
