import React, { Component } from "react";
import { reduxForm, Field, Form } from "redux-form";
import { submitPoll } from '../../actions'
import InputField from '../InputField';
import { withRouter } from 'react-router';

class PollForm extends Component {
  render() {
    const { history } = this.props
    return (
      <div>
        <h4 className="center-align">Create Your Poll</h4>
        <Form onSubmit={this.props.handleSubmit((values) => submitPoll(values, history))}>
          <Field component={InputField} type="text" name="question" label="question" />
          <Field component={InputField} type="text" name="options" label="options (separated by commas)" />
          <button type="submit" className="teal btn-flat right white-text">
            Log In
          </button>
        </Form>
      </div>
    );
  }
}

PollForm = withRouter(PollForm)

export default PollForm = reduxForm({
  form: "pollForm"
})(PollForm);
