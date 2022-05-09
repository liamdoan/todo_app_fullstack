import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { register } from '../redux/apiCalls'


const Container = styled.div`
width: 100%;
height: 70vh;
background: gray;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const Wrapper = styled.div`
padding: 1rem;
width: 60%;
background-color: white;
`

const Title = styled.h1`
font-size: 24px;
text-transform: uppercase;
font-weight: 300;
`

const Form = styled.form`
display: flex;
flex-direction: column;
`

const FormWrap = styled.div`
display: flex;
`

const Column = styled.div`
display: flex;
flex-direction: column;
`

const P = styled.p`
margin-top: 20px;
font-size: 15px;
`

const Span = styled.span`
color: red;
font-size: 18px;
`

const Input = styled.input`
flex: 1;
min-width: 40%;
margin: 5px 10px 0 0 ;
padding: 10px;
border: 1px solid lightgray;
`

const ConfirmMsg = styled.p`
color: red;
`

const Confirm = styled.div`
display: flex;
flex-direction: column;
`

const Agreement = styled.p`
font-size: 12px;
margin: 20px 0;
`

const Button = styled.button`
width: 40%;
border: none;
display: flex; 
align-items: center;
justify-content: center;
background-color: #CBBA9C;
border: 2px solid #CBBA9C;
font-size: 16px;
font-style: normal;
height: 40px;
outline: 2px solid transparent;
outline-offset: -7px;
cursor: pointer;

&:hover {
    background-color: black;
    color: white;
    border: 2px solid black;
    outline: 2px solid #CBBA9C;
    outline-offset: -7px;
    transition: 0.3s ease-in-out;
}
`


const Register = () => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmMsg, setConfirmMsg] = useState("");

    const navigate = useNavigate()
    
    const handleRegister = (e) => {
        e.preventDefault();

        if(password === confirmPassword){
            register({firstname, lastname, email, password, username}); 
            navigate("/login")
        }
        else {
            setConfirmMsg("Password doesn't match")
        }
    }
    
    return (
        <>
        <Container>
            <Wrapper>
                <Title>Create your account</Title>
                <Form 
                    onSubmit={handleRegister}
                >
                    <FormWrap>
                        <Column>
                            <P>First name <Span>*</Span></P>
                            <Input required type="text" onChange={e => setFirstname(e.target.value)}/>
                            <P>Email <Span>*</Span></P>
                            <Input required type="email" onChange={e => setEmail(e.target.value)}/>
                            <P>Password <Span>*</Span></P>
                            <Input required type="password" onChange={e => setPassword(e.target.value)}/>
                        </Column>
                        <Column>
                            <P>Last name <Span>*</Span></P>
                            <Input required type="text" onChange={e => setLastname(e.target.value)}/>
                            <P>Username <Span>*</Span></P>
                            <Input required type="text" onChange={e => setUsername(e.target.value)}/>
                            <P>Confirm Password <Span>*</Span></P>
                            <Input required type="password" onChange={e => setConfirmPassword(e.target.value)}/>
                        </Column>
                    </FormWrap>
                    <ConfirmMsg>{confirmMsg}</ConfirmMsg>
                    <Confirm>
                        <Agreement>I consent to the Privacy Policy</Agreement>
                        <Button type="submit">Create</Button>
                    </Confirm>
                </Form>
            </Wrapper>
        </Container>
        </>
    )
}

export default Register