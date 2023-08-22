import  FormContainer  from "../components/FormContainer"
import { Link, useNavigate } from "react-router-dom"
import { Form, Button, Row, Col} from "react-bootstrap"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLoginMutation } from "../slices/userApiSlice"
import { setCredentials } from "../slices/authSlice"
import { toast } from "react-toastify"
import Loader from "../components/Loader"

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, {isLoading, isError}] = useLoginMutation();
    const {userInfo} = useSelector((state) => state.auth)

    useEffect(() => {
        if (userInfo) navigate("/");
    }, [navigate, userInfo])

    const submitForm = async (e) => {
        e.preventDefault();

        // Submit Functionality
        try {
            const response = login({email, password}).unwrap();

            dispatch(setCredentials({...response}))

            navigate("/")
        } catch (error) {
            toast.error(error?.data?.message || error.message)
        }
    }


  return (
    <FormContainer>
        <h1>Sign In</h1>

        <Form onSubmit={submitForm}>
            <Form.Group className="my-2" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Enter email" 
                    name="email" value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
            </Form.Group>

            <Form.Group className='my-2' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            { isLoading && <Loader /> }

            <Button type='submit' variant='primary' className='mt-3'>
                Sign In
            </Button>
        </Form>

        <Row className="py-3">
            <Col>
                New User? <Link to={"/register"}>Register</Link>
            </Col>
        </Row>
    </FormContainer>
  );
}

export default LoginScreen
