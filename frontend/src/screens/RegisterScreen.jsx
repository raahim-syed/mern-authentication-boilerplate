import React, { useEffect, useState } from 'react'
import { Form, Row, Col, Button } from "react-bootstrap"
import { Link } from 'react-router-dom'
import FormContainer from "../components/FormContainer"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../slices/userApiSlice'
import { toast } from 'react-toastify'
import { setCredentials } from '../slices/authSlice'
import Loader from '../components/Loader'

const RegisterScreen = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [confirmedPassword, setConfirmedPassword] = useState("")

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth)

    const [register, { isLoading }] = useRegisterMutation();

    useEffect(() => {
        if(userInfo) navigate("/");
    }, [navigate, userInfo])

  const submitForm = async (e) => {
    e.preventDefault();

    try{
        if (password !== confirmedPassword) throw new Error("Passwords Do not Match");

        const userObject = {
            name, email, password
        }

        dispatch(setCredentials({...response}))

        const response = await register(userObject).unwrap();

        navigate("/");
    }catch(error){
        toast.error(error?.data?.message || error.message)
    }
  }

  return (
    <FormContainer>
        <h1>Register</h1>

        <Form onSubmit={submitForm}>

          <Form.Group className='my-2' controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Enter email" 
                  value={email} 
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

            <Form.Group className='my-2' controlId='confirm-password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter password again'
                    value={confirmedPassword}
                    onChange={(e) => setConfirmedPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            { isLoading && <Loader /> }

            <Button type='submit' variant='primary' className='mt-3'>
                Sign In
            </Button>
        </Form>

        <Row className="py-3">
            <Col>
                Already Registered? <Link to={"/login"}>Login</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen
