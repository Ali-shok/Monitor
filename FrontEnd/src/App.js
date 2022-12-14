import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import SignInScreen from './Screens/SignInScreen';
import { useContext } from 'react';
import { Store } from './Store';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import ThemeScreen from './Screens/ThemeScreen';
import EvaluationsScreen from './Screens/EvaluationsScreen';

function App() {
  const { state, dispatch: ctxdispatch } = useContext(Store);
  const { userInfo } = state;

  const signOutHandler = () => {
    ctxdispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand className="text" href="/">
                  <img
                    alt=""
                    src="logoipsum-248.svg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                  />{' '}
                  InterMonitor
                </Navbar.Brand>
              </LinkContainer>
              {userInfo ? (
                <Navbar.Brand>
                  <Link to="/signin">
                    <Button
                      onClick={signOutHandler}
                      variant="outline-warning text"
                    >
                      Sign Out
                    </Button>
                  </Link>
                </Navbar.Brand>
              ) : (
                <Navbar.Brand>
                  <Link to="/signin">
                    <Button variant="outline-warning text">Sign In</Button>
                  </Link>
                </Navbar.Brand>
              )}{' '}
            </Container>
          </Navbar>
        </header>
        <br />
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/signin" element={<SignInScreen />} />
              <Route path="/" element={<HomeScreen />} />
              <Route path="/theme/:id" element={<ThemeScreen />} />
              <Route
                path="/evaluation/evaluiationId"
                element={<EvaluationsScreen />}
              />
            </Routes>
          </Container>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
