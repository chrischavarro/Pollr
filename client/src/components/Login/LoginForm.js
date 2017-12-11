import React, { Component } from "react";
import { reduxForm, Field, Form } from "redux-form";
import { loginSubmit } from '../../actions'
import InputField from '../InputField';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

class LoginForm extends Component {


  render() {
    const { history } = this.props
    const {fields: { username, password }, handleSubmit} = this.props;
    console.log(this.props)
    return (
      <div>
        <h4 className="center-align">Log In</h4>
        <Form onSubmit={this.props.handleSubmit((values) => loginSubmit(values, history))}>

          <Field component={InputField} type="text" name="username" label="username" {...username} />

          <Field component={InputField} type="text" name="password" label="password" {...password} />
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

  // Validate the inputs from 'values'
  if (!values.username) {
    errors.username = "Enter your username!";
  }
  if (!values.password) {
    errors.password = "Enter your password";
  }

  return errors;
}

export default LoginForm = reduxForm({
  form: "loginForm",
  fields: [`username`, `password`],
  validate
})(LoginForm);
