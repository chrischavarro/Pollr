import React, { Component } from 'react';
import { reduxForm, Field, Form } from "redux-form";
import { signupSubmit } from '../../actions'
import InputField from '../InputField';
import { withRouter } from 'react-router';

class SignupForm extends Component {
  render() {
    const { history } = this.props
    return (
      <div>
        <h4 className="center-align">Sign Up</h4>
        <Form onSubmit={this.props.handleSubmit((values) => signupSubmit(values, history))}>
          <Field component={InputField} type="text" name="username" label="username" />
          <Field component={InputField} type="text" name="password" label="password" />
          <button type="submit" className="teal btn-flat right white-text">
            Sign Up
          </button>
        </Form>
      </div>
    )
  }
}

SignupForm = withRouter(SignupForm)

export default SignupForm = reduxForm({
  form: "signupForm"
})(SignupForm);
