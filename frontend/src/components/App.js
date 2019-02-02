import React, {Component} from 'react';
import PhoneForm from './phoneForm'
import {Container, Row, Col} from 'react-bootstrap'


class App extends Component {
  render() {
    return (
      <div className="Form">
       <Container>
         <Row>
           <Col sm={10}>
             <PhoneForm/>
           </Col>
         </Row>
       </Container>
      </div>
    );
  }
}

export default App;
