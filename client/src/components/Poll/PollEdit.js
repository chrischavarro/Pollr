import React, { Component } from 'react';
import { reduxForm, Field, Form } from "redux-form";
import { addOptions } from '../../actions';
import InputField from '../InputField';
// import { withRouter } from 'react-router';


class PollEdit extends Component {
  render() {
    const { history } = this.props
    const { pollId } = this.props.match.params
    return (
      <div>
        <h4 className="center-align">Add New Options</h4>
        <Form onSubmit={this.props.handleSubmit((options) => addOptions(options, pollId, history))}>
          <Field component={InputField} type="text" name="options" label="options" />
          <button type="submit" className="teal btn-flat right white-text">Save Changes</button>
        </Form>

      </div>
    )
  }
}

export default PollEdit = reduxForm({
  form: "pollEdit"
})(PollEdit);
