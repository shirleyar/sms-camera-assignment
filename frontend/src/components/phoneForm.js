import React, {Component} from 'react';
import PhoneInput, {isValidPhoneNumber} from 'react-phone-number-input'
import {Form, Row, Col, Button} from "react-bootstrap";
import NotifyLabel from './NotifyLabel';
import 'react-phone-number-input/style.css'
import uuid from 'uuid/v4'
import {CREATED} from 'http-status-codes'

class PhoneForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      phone: undefined,
      errorSendSms: false,
      sentSms: false,
      sending: false
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    try {
      this.setState({sending: true});
      let response = await fetch(`/smsServer/api/v1/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-request-id': uuid()
        },
        body: JSON.stringify({
          toNumber: this.state.phone
        })
      });
      this.setState({
        sentSms: true,
        sending: false
      });
      const newState = {
        errorSendSms: response.status !== CREATED
      };
      this.setState(newState);
    } catch (error) {
      this.setState({
        errorSendSms: true
      })
    }
  };

  render() {
    return (
      <Form onSubmit={e => this.handleSubmit(e)}>
        <Form.Group as={Row}>
          <Form.Label column sm={4}>Mobile phone</Form.Label>
          <Col sm='auto'>
            <PhoneInput
              placeholder='Enter mobile number'
              value={this.state.phone}
              country="IL"
              onChange={phone => {
                this.setState({
                  phone,
                  sentSms: false
                })
              }}
              error={this.state.phone ? (isValidPhoneNumber(this.state.phone) ? undefined : 'Invalid phone number') : undefined}
            />
          </Col>
        </Form.Group>
        <Form.Group>
          <Col>
            <Button
              disabled={this.state.sending || this.state.sentSms || !this.state.phone || !isValidPhoneNumber(this.state.phone)}
              variant="primary"
              type="submit">
              {this.state.sending ? 'Sending...' :'Send SMS'}
            </Button>
          </Col>
        </Form.Group>
        <Row>
          <Col sm={15}>
            {this.state.sentSms && this.state.errorSendSms &&
            <NotifyLabel
              success={false} // only one can be true in this case.
              heading={'Error sending sms'}
              text={'Please check number and country or try again later'}
            />}
            {this.state.sentSms && !this.state.errorSendSms &&
            <NotifyLabel
              success={true} // only one can be true in this case.
              heading={`Sent sms successfully to number ${this.state.phone}`}
              text={''}
            />}
          </Col>
        </Row>
      </Form>
    );
  }
}

export default PhoneForm