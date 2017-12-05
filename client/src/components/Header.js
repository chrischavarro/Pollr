import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions'

class Header extends Component {
  componentDidMount() {
    // console.log('mounted header!')
    this.props.fetchUser();
  }

  renderContent() {
      switch (this.props.auth) {
        case null:
          return;
        case false:
        console.log('False returned')
          return <Link to ="/login">Log In</Link>
           // <li><a href="/signup">Sign Up</a></li>
        default:
          return <li>Welcome Back!</li>;
          // Insert user name here
      }
  }

  render() {
    return (
        <nav>
          <div className="nav-wrapper">
            <Link to='/'
              className="left brand-logo"
            >
              Pollr
            </Link>
            <ul className="right">
              {this.renderContent()}
            </ul>
          </div>
        </nav>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
};

export default connect(mapStateToProps, actions)(Header);
