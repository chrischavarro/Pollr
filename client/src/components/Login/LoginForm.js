import React, { Component } from "react";
import { reduxForm, Field, Form } from "redux-form";
import { loginSubmit } from '../../actions'
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class LoginForm extends Component {
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
        <h4 className="center-align">Log In</h4>
        <Form onSubmit={handleSubmit((values) => loginSubmit(values, history))}>

          <label name="username">Username</label>
          <Field component={this.renderField} name="username" label="username" {...username}/>

          <label name="password">Password</label>
          <Field component={this.renderField} name="password" label="password" {...password}/>

          <button type="submit" className="teal btn-flat right white-text">
            Log In
          </button>
          <Link to="/signup">
            <button className="teal btn-flat right white-text" style={{ marginRight: '10px' }}>
            Sign Up
            </button>
          </Link>
        </Form>
      </div>
    );
  }
}

LoginForm = withRouter(LoginForm)

function validate(values) {
  const errors = {};
  if (!values.username) {
    errors.username = "Enter your username!";
  }
  if (!values.password) {
    errors.password = "Enter your password!";
  }
  return errors;
}

export default LoginForm = reduxForm({
  form: "loginForm",
  fields: [`username`, `password`],
  validate
})(LoginForm);
