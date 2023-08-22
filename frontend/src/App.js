import { Container } from 'react-bootstrap';
import Header from './components/Header';
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


function App() {
  return (
    <>
      <Header />
      <ToastContainer />
      <Container className='my-y'>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
