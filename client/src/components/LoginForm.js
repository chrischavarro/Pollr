import React, { Component } from "react";
import { reduxForm, Field, Form } from "redux-form";
import { loginSubmit } from '../actions'
import InputField from './InputField';
import { withRouter } from 'react-router';

class LoginForm extends Component {
  render() {
    const { history } = this.props
    return (
      <div>
        <Form onSubmit={this.props.handleSubmit((values) => loginSubmit(values, history))}>
          <Field component={InputField} type="text" name="username" label="username" />
          <Field component={InputField} type="text" name="password" label="password" />
          <button type="submit" className="teal btn-flat right white-text">
            Log In
          </button>
        </Form>
      </div>
    );
  }
}

LoginForm = withRouter(LoginForm)

export default LoginForm = reduxForm({
  form: "loginForm"
})(LoginForm);


// LoginForm = connect(mapStateToProps, {loginSubmit})(LoginForm);

 // LoginForm;
