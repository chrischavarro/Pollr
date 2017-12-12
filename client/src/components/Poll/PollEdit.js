import React, { Component } from 'react';
import { reduxForm, Field, Form } from "redux-form";
import { addOptions } from '../../actions';
import { withRouter } from 'react-router';

class PollEdit extends Component {
  renderField = (field) => (
    <div className="input-row">
      <input {...field.input} type="text" style={{ marginBottom: '10px' }}/>
      {field.meta.touched && field.meta.error &&
      <span className="error red-text" style={{ fontSize: '12px' }}>{field.meta.error}</span>}
    </div>
  )

  render() {
    const { history } = this.props
    const { pollId } = this.props.match.params
    const {fields: { options }, handleSubmit} = this.props;
    return (
      <div>
        <h4 className="center-align">Add New Options</h4>
        <Form onSubmit={handleSubmit((options) => addOptions(options, pollId, history))}>

          <label name="options">Options</label>
          <Field component={this.renderField} name="options" label="options" {...options}/>

          <button type="submit" className="teal btn-flat right white-text">Save Changes</button>
        </Form>

      </div>
    )
  }
}

PollEdit = withRouter(PollEdit)

function validate(values) {
  const errors = {};
  if (!values.options) {
    errors.options = "Enter some options!";
  }
  return errors;
}

export default PollEdit = reduxForm({
  form: "pollEdit",
  fields: ['options'],
  validate
})(PollEdit);
