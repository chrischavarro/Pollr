import React, { Component } from "react";
import { reduxForm, Field, Form } from "redux-form";
import { submitPoll } from '../../actions'
import { withRouter } from 'react-router';

class PollForm extends Component {
  renderField = (field) => (
    <div className="input-row">
      <input {...field.input} type="text" style={{ marginBottom: '10px' }}/>
      {field.meta.touched && field.meta.error &&
      <span className="error red-text" style={{ fontSize: '12px' }}>{field.meta.error}</span>}
    </div>
  )

  render() {
    const { history } = this.props
    const {fields: { question, options }, handleSubmit} = this.props;
    return (
      <div>
        <h4 className="center-align">Create Your Poll</h4>
        <Form onSubmit={handleSubmit((values) => submitPoll(values, history))}>

          <label name="question">Question</label>
          <Field component={this.renderField} name="question" label="question" {...question}/>

          <label name="options">Options</label>
          <Field component={this.renderField} name="options" label="options" {...options}/>

          <button type="submit" className="teal btn-flat right white-text">
            Create Poll
          </button>
        </Form>
      </div>
    );
  }
}

PollForm = withRouter(PollForm)

function validate(values) {
  const errors = {};
  if (!values.question) {
    errors.question = "Enter a question!";
  }
  if (!values.options) {
    errors.options = "Enter some options!";
  }
  return errors;
}

export default PollForm = reduxForm({
  form: "pollForm",
  fields: ['question', 'options'],
  validate
})(PollForm);
