import React, { useContext, useState } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { UserContext } from '../App'
import { Navigate } from 'react-router-dom'
import Api, {endpoints, authAxios} from '../configs/Api'
import cookies from 'react-cookies'
import './Longin.scss'
const Login = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [errMsg, setErrMsg] = useState(null)
    const [user, dispatch] = useContext(UserContext)

    const login = async (event) => {
        event.preventDefault()

        // lay token
        try {
            const res = await Api.post(endpoints['login'], {
                'client_id': 'H8hKppchsDLwXaNfh3Lqw0iPQb6FnO99TW9UHNDK',
                'client_secret': 'KeOWbldW4Nof6QfVCVaXqnE58xlSn25FEb4A898RjFNJ1Kb0ftXfGcfGbkeJdoazvCe6QH1nXdJfIvbvoUVWjuqza3WpHNhjYwzHVHoBJyWzHhBdSt2cg0ER9LAnRkDe',
                'username': username,
                'password': password,
                'grant_type': 'password'
            })
    
            if (res.status === 200) {
                cookies.save('access_token', res.data.access_token)
    
                // lay current user
                const user = await authAxios().get(endpoints['current_user'])
                cookies.save('current_user', user.data)
                dispatch({
                    "type": "login",
                    "payload": user.data
                })
            } 
        } catch (error) {
            console.info(error)
            setErrMsg('Username hoac password KHONG chinh xac!!!')
        }
    }

    if (user != null)
        return <Navigate to="/" />

    return (
        <Container className='login-container'>
            <h1 className="text-center text-danger">DANG NHAP</h1>

            {errMsg !== null && <Alert key='danger' variant='danger'>
                {errMsg}
            </Alert>}

            <Form onSubmit={login}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="test" value={username} onChange={evt => setUsername(evt.target.value)} placeholder="Nhap username..." />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={evt => setPassword(evt.target.value)} placeholder="Nhap password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Dang nhap
                </Button>
            </Form>
        </Container>
    )
}

export default Login