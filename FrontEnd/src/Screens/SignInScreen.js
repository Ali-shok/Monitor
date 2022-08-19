import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
//import { toast } from 'react-toastify';

function SignInScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxdispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post(
        `https://www.geoware-gmbh.de/ViewerBackend/api/Login`,
        {
          email,
          password,
        }
      );
      if (data !== '(Fehler beim Login.)') {
        ctxdispatch({ type: 'USER_SIGNIN', payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate('/');
      } else {
        alert('invalid email Or Password');
      }
      console.log(data);
    } catch (err) {}
  };

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <Row>
        <Col md={3}></Col>
        <Col md={6}>
          <h3 className="my-3 text">Sign In</h3>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3 text" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3 text" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            <div className="mb-3 text right-item">
              <Button variant="outline-warning text" type="submit">
                Sign In
              </Button>
            </div>
          </Form>
        </Col>
        <Col md={3}></Col>
      </Row>
    </Container>
  );
}

export default SignInScreen;
