import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPoll, castVote } from '../../actions';
import PollChart from './PollChart';
import { Link } from 'react-router-dom'
// import {Button, Icon, Modal} from 'react-materialize'
import { ToastContainer, toast } from 'react-toastify';


class PollView extends Component {
  constructor(props) {
    super(props)
// remove this
    this.state = { hasVoted: false }
  }

  componentDidMount(){
    this.props.fetchPoll(this.props.match.params.pollId);
  }
  notify = () => toast("Wow so easy !")

  renderPoll() {
    const { options } = this.props.polls;
    console.log('POLLS PROPS', this.props.polls)

    console.log('VOTE PROPS', this.props.vote)
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
                    this.setState({ hasVoted: true });
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

  render() {
// console.log(this.state.hasVoted)
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
              <button onClick={this.notify}>Notify !</button>
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

              <button className="waves-effect waves-light btn" style={{ marginTop: '15px'}}>
              <Link to={"/polls/:pollId/edit".replace(':pollId', `${this.props.polls._id}`)} className="white-text" style={{ textDecoration: 'none'}}>
                Edit This Poll
              </ Link>
              </button>

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
    vote: state.vote
  }
};

export default connect(mapStateToProps, { fetchPoll, castVote })(PollView);
// Create an action to check if ip address has already voted

// <Modal
// header='Modal Header'
// trigger={<Button waves='light' style={{ width: '30%' }} onClick={() => this.props.castVote(option._id, option.pollId)} >{option.option}</Button>}>
// <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
// incididunt ut labore et dolore magna aliqua.</p>
// </Modal>
