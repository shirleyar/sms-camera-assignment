import React, {Component} from 'react';
import {Alert, } from 'react-bootstrap';

class ErrorLabel extends Component {
  constructor(props) {
    super(props);
    this.state = {...props};
  }

  render() {
    const type = this.state.success ? 'success' : 'danger';
    return(
      <Alert variant={type}>
        <Alert.Heading>{this.state.heading}</Alert.Heading>
        <p>{this.state.text}</p>
      </Alert>
    )
  }
}

export default ErrorLabel