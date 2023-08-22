import React, { useEffect, useState } from 'react'
import { Form, Button } from "react-bootstrap"
import { Link } from 'react-router-dom'
import FormContainer from "../components/FormContainer"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { useUpdateUserMutation } from '../slices/userApiSlice'
import { toast } from 'react-toastify'
import { setCredentials } from '../slices/authSlice'
import Loader from '../components/Loader'

const ProfileScreen = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [confirmedPassword, setConfirmedPassword] = useState("")

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth)

    const [updateProfile, { isLoading }] = useUpdateUserMutation();

    useEffect(() => {
        setName(userInfo.name)
        setEmail(userInfo.email)
    }, [userInfo.name, userInfo.setEmail])

    
  const submitForm = async (e) => {
    e.preventDefault();

    try{
        const updateObject = {
            _id: userInfo._id,
            name, email, 
            password
        }
        
        const response = await updateProfile(updateObject).unwrap();
        
        dispatch(setCredentials({...response}))

        toast.success("Profile Updated!!")

        navigate("/");
    }catch(error){
        toast.error(error?.data?.message || error.message)
    }
  }

  return (
    <FormContainer>
        <h1>Update Profile</h1>

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
        
    </FormContainer>
  )
}

export default ProfileScreen
