/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Spinner from 'react-bootstrap/esm/Spinner';
import { AiFillLock } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Classes from '../assets/css/form.module.css';
import Url from '../Url';

export default function Forgetpassword() {
    const [isLoading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [message, setMessage] = useState(null);
    const initialValue = { email: '', password: '' };
    const [credentials, setCredentials] = useState(initialValue);
    const navigate = useNavigate();

    const credentialsHandler = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };
    const loginhandler = (event) => {
        event.preventDefault();
        setLoading(true);
        axios
            .post(Url.resetPassword, credentials)
            .then((res) => {
                if (res.status === 201) {
                    setLoading(false);
                    navigate('/login', { replace: true });
                } else if (res.status === 500) {
                    setLoading(false);
                    setErrors(null);
                    setMessage(res.data);
                } else {
                    setLoading(false);
                    setMessage(null);
                    setErrors(res.data);
                }
            })
            .catch((err) => {
                setLoading(false);
                setErrors(null);
                setMessage(err.message);
            });
    };

    const loading = () => (
        <div className="text-primary mb-2 text-center">
            <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
            Processing...
        </div>
    );
    const errorMessage = () => (
        <div className="p-1 bg-info bg-opacity-10 rounded text-danger mb-2">
            <small className="text-capitalize">{message}</small>
        </div>
    );
    const errorList = () => {
        const errMsgs = Object.values(errors);
        return (
            <div className="p-1 bg-info bg-opacity-10 rounded text-danger mb-2">
                {errMsgs.map((msg) => (
                    <small key={Math.random()}>
                        {msg}
                        <br />
                    </small>
                ))}
            </div>
        );
    };

    return (
        <>
            <title>Reset Password</title>
            <Container>
                <Row className="justify-content-center">
                    <Col md={6} className="bg-secondary bg-opacity-50 mt-lg-5 p-5 rounded">
                        <h6 className="text-center">Password Reset</h6>
                        <Row className="justify-content-center">
                            <Col md={6}>
                                {isLoading && loading()}
                                {errors && errorList()}
                                {message && errorMessage()}
                                <Form className={Classes.form} onSubmit={loginhandler}>
                                    <Form.Group className="mb-1">
                                        <Form.Label>
                                            <small>
                                                <MdEmail /> Email
                                            </small>
                                        </Form.Label>
                                        <Form.Control
                                            size="sm"
                                            type="email"
                                            placeholder="Enter email"
                                            name="email"
                                            value={credentials.email}
                                            onChange={credentialsHandler}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-1">
                                        <Form.Label>
                                            <small>
                                                <AiFillLock /> New Password
                                            </small>
                                        </Form.Label>
                                        <Form.Control
                                            size="sm"
                                            type="password"
                                            placeholder="Enter password"
                                            name="password"
                                            value={credentials.password}
                                            onChange={credentialsHandler}
                                        />
                                    </Form.Group>
                                    <div className="d-grid">
                                        <Button variant="primary" type="submit" size="sm">
                                            Reset
                                        </Button>
                                    </div>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
