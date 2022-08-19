import axios from 'axios';
import LoadingBox from '../Components/LoadingBox';
import MessageBox from '../Components/MessageBox';
import React, { useContext, useEffect, useReducer } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Helmet } from 'react-helmet-async';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';
import Theme from '../Components/Theme';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FRETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, themes: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, themes, error }, dispatch] = useReducer(reducer, {
    themes: [],
    error: '',
    loading: true,
  });
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      const token = JSON.parse(localStorage.getItem('userInfo'));
      const fetchData = async () => {
        dispatch({ type: 'FRETCH_REQUEST' });
        try {
          const result = await axios.get(
            `https://www.geoware-gmbh.de/ViewerBackend/api/GetThemen/${0}`,
            {
              headers: {
                jwtToken: `${token}`,
              },
            }
          );
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
          console.log(result.data);
        } catch (err) {
          dispatch({ type: 'FETCH_FAIL', payload: err.message });
        }
      };
      fetchData();
    } else {
      navigate('/signin');
    }
  }, [userInfo, navigate]);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="warning">{error}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <h1 className="mb-3 text">Main Theme</h1>
      <div className="themes mt-3">
        <Row>
          {themes.map((theme) => (
            <Col key={theme.ID} sm={6} md={4} lg={4} className="mb-3">
              <Theme theme={theme} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default HomeScreen;
