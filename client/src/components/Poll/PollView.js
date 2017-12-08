import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPoll, castVote, deletePoll } from '../../actions';
import PollChart from './PollChart';
import { Link } from 'react-router-dom'
// import {Button, Icon, Modal} from 'react-materialize'
import { ToastContainer, toast } from 'react-toastify';
import { withRouter } from 'react-router';


class PollView extends Component {
//   constructor(props) {
//     super(props)
// // remove this
//     this.state = { hasVoted: false }
//   }

  componentWillMount(){
    this.props.fetchPoll(this.props.match.params.pollId);
  }
  notify = () => toast("Wow so easy !")

  renderPoll() {
    const { options } = this.props.polls;
    console.log('POLLS PROPS', this.props.polls)

    if (options) {
      return options.map(option => {
        return (
          <div key={option._id} style={{ marginBottom: '15px' }} className="col s12 center-align">
            <button
              className="waves-effect waves-light btn"
              onClick={
                () =>
                  {
                    this.props.castVote(option._id, option.pollId);
                    this.notify();
                    console.log(this.props.polls)
                  }
              }
              style={{ width: '30%'}}
            >
                {option.option}
            </button>

          </div>
        )
      })
    }
  }

renderOwnerOptions(){
  if (this.props.auth && this.props.auth._id == this.props.polls.owner) {
    console.log(this.props.auth)
    const { history } = this.props
    return (
      <div>
        <div>
          <button className="waves-effect waves-light btn" style={{ marginTop: '15px'}} >
            <Link to={"/polls/:pollId/edit".replace(':pollId', `${this.props.polls._id}`)} className="white-text" style={{ textDecoration: 'none'}}>
              Edit Poll
            </ Link>
          </button>
        </div>
        <div>
          <button className="waves-effect waves-light btn" style={{ marginTop: '15px'}}
            onClick={() =>
              this.props.deletePoll(this.props.polls._id, history)
            }>
              Delete Poll
          </button>
        </div>
      </div>
    )
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

              <div>
                <ToastContainer
                      position="top-right"
                      type="default"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      pauseOnHover
                    />
              </div>

              {this.renderOwnerOptions()}

            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    polls: state.polls,
    vote: state.vote,
    auth: state.auth
  }
};

export default connect(mapStateToProps, { fetchPoll, castVote, deletePoll })(PollView);
