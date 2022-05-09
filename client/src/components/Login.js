import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { login } from '../redux/apiCalls'
// import { mobile } from '../Responsive'
import { Link } from 'react-router-dom'

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

const Button = styled.button`
width: 40%;
border: none;
display: flex; 
align-items: center;
justify-content: center;
background-color: #CBBA9C;
border: 2px solid #CBBA9C;
font-size: 18px;
font-style: normal;
height: 40px;
margin: 10px 0;
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

&::disabled{
    color: green;
    cursor: not-allowed;
}
`

const Error = styled.p`
margin: 5px 0;
color: red;
`


const Item = styled(Link)`
/* background-color: pink; */
margin: 25px 0; 
color: black;
font-style: italic;
text-decoration: underline;
cursor: pointer;

&:hover {
    color: #CBBA9C
}
`

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const {isFetching, error} = useSelector(state => state.user)

    const user = useSelector(state => state.user.currentUser);

    const handleLogin = (e) => {
        e.preventDefault();
        // user ? navigate("/") : navigate("/login")  
        login(dispatch, {username, password});
    }
 
    return (
        <> 
        {user 
        ? <Outlet />
        : (
            <Container>
                <Wrapper>
                    <Title>Log In</Title>
                    <Form>
                        <P>Username <Span>*</Span></P>
                            <Input 
                                onChange={(e) => setUsername(e.target.value)}/>
                        <P>Password <Span>*</Span></P>
                            <Input 
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}/>
                    </Form>
                    <Button
                        onClick={handleLogin}
                        disabled={isFetching}
                        >
                            Login 
                    </Button>
                    {error && <Error>Not Authorized</Error>}
                    {/* <Link>
                        Gorget password
                    </Link> */}
                       <Item to="/register">Create new account</Item>
                </Wrapper>
            </Container>
            )
        }
        </>
    )
}

export default Login
