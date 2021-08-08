import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {

  const [primos, setPrimos] = useState(0);
  const [fates, setFates] = useState(0);
  const [prevPulls, setPrevPulls] = useState(0);
  const [totalPulls, setTotalPulls] = useState(0);
  const [numberOfHardPities, setNumberOfHardPities] = useState(0);
  const [primosToNextHardPity, setPrimosToNextHardPity] = useState(14400);

  // newValue is a number
  const updatePrimos = (newValue) => {
    setPrimos(newValue);
    updateTotalPulls(newValue, fates, prevPulls);
  };

  const updateFates = (newValue) => {
    setFates(newValue);
    updateTotalPulls(primos, newValue, prevPulls);
  };

  const updatePrevPulls = (newValue) => {
    setPrevPulls(newValue);
    updateTotalPulls(primos, fates, newValue);
  }

  const updateTotalPulls = (primos, fates, prevPulls) => {
    let pullsFromPrimos = primos / 160;
    let updatedTotalPulls = pullsFromPrimos + fates + prevPulls
    setTotalPulls(updatedTotalPulls);

    let updatedNumberOfHardPities = Math.floor(updatedTotalPulls / 90);
    setNumberOfHardPities(updatedNumberOfHardPities);

    let primosToNextPity = Math.ceil((90 - (updatedTotalPulls % 90)) * 160);
    setPrimosToNextHardPity(primosToNextPity);
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col lg={6}>
          <Form>
            <Form.Group className="mb-3" controlId="primos-amt">
              <Form.Label>How many Primogems do you have?</Form.Label>
              <Form.Control type="number" min={0} onChange={(e) => updatePrimos(parseInt(e.target.value))}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="fates-amt">
              <Form.Label>How many Fates do you have?</Form.Label>
              <Form.Control type="number" min={0} onChange={(e) => updateFates(parseInt(e.target.value))}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="prev-pulls-amt">
              <Form.Label>How many pulls have you already done?</Form.Label>
              <Form.Control type="number" min={0} onChange={(e) => updatePrevPulls(parseInt(e.target.value))}></Form.Control>
            </Form.Group>
          </Form>
          <div>Total Pulls on Banner: {Math.floor(totalPulls)}</div>
        </Col>
        <Col lg={6} className="align-content-center">
          <div>You can hit hard pity {numberOfHardPities} {numberOfHardPities == 1 ? 'time' : 'times'}</div>
          <div>You need {primosToNextHardPity} primos to reach your next hard pity</div>
        </Col>

      </Row>
    </Container>
    
  );
}

export default App;
