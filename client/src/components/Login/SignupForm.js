import React, { Component } from 'react';
import { reduxForm, Field, Form } from "redux-form";
import { signupSubmit } from '../../actions'
import { withRouter } from 'react-router';

class SignupForm extends Component {
  renderField = (field) => (
    <div className="input-row">
      <input {...field.input} type="text" style={{ marginBottom: '10px' }}/>
      {field.meta.touched && field.meta.error &&
      <span className="error red-text" style={{ fontSize: '12px' }}>{field.meta.error}</span>}
    </div>
  )

  render() {
    const { history } = this.props
    const {fields: { username, password }, handleSubmit} = this.props;
    return (
      <div>
        <h4 className="center-align">Sign Up</h4>
        <Form onSubmit={handleSubmit((values) => signupSubmit(values, history))}>

          <label name="username">Username</label>
          <Field component={this.renderField} name="username" label="username" {...username}/>

          <label name="password">Password</label>
          <Field component={this.renderField} name="password" label="password" {...password}/>

          <button type="submit" className="teal btn-flat right white-text">
            Sign Up
          </button>
        </Form>
      </div>
    )
  }
}

SignupForm = withRouter(SignupForm)

function validate(values) {
  const errors = {};

  if (!values.username) {
    errors.username = "Enter a username!";
  }
  if (!values.password) {
    errors.password = "Enter a password!";
  }

  return errors;
}

export default SignupForm = reduxForm({
  validate,
  fields: [`username`, `password`],
  form: "signupForm"
})(SignupForm);
