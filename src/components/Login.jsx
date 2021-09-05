import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useHistory,
} from "react-router-dom";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const { login } = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory();
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch {
            setError('Fail to log in')
        }
        setLoading(false)
    }




    return (<div className='login-container' >
        <h1 style={{ textAlign: 'center' }}>Go Out Together</h1>
        <h2>Sign in and vote where to go with your friends</h2>
        <Card className='login'>
            <Card.Body>
                <h2 className="text-center mb-4">Log In</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Button type="submit" className="w-100" disabled={loading}>Log In</Button>
                </Form>
            </Card.Body>
            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to='/signup'>Sign Up</Link>
            </div>
        </Card>
    </div>
    )
}
