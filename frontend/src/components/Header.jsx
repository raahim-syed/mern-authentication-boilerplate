import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useLogoutMutation } from '../slices/userApiSlice';
import { clearCredentials } from '../slices/authSlice';
import { useNavigate } from "react-router-dom"

const Header = () => {
  const userInfo = useSelector((state) => state.auth)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutCall, { isLoading, isError }] = useLogoutMutation();

  const logoutHandler = async (e) => {
    try {
      // Backend call to logout user
      const response = await logoutCall().unwrap();

      // Clearing State
      dispatch(clearCredentials());

      // Redirecting to Homepage
      navigate("/");
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>Auth Boilerplate</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {
                userInfo ? (
                  <>
                    <LinkContainer to="/login" >
                      <Nav.Link>
                        <FaSignInAlt /> Login
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/register">
                      <Nav.Link>
                        <FaSignOutAlt /> Register
                      </Nav.Link>
                    </LinkContainer>
                  </>
                ) : (
                  <>
                    <NavDropdown title={userInfo.name} id="username" >
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>
                          Profile
                        </NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={(e) => logoutHandler(e)}> Logout </NavDropdown.Item>
                    </NavDropdown>
                  </>
                )
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
