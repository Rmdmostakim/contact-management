/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Spinner from 'react-bootstrap/esm/Spinner';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useLocation, useNavigate } from 'react-router-dom';
import Classes from '../assets/css/form.module.css';

import Url from '../Url';

export default function Verification() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [message, setMessage] = useState(null);
    const initialValue = { email_valiation_token: '', email: '' };
    const [credentials, setCredentials] = useState(initialValue);

    const credentialsHandler = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };
    const verificationHandler = (event) => {
        event.preventDefault();
        let data = null;
        if (state != null) {
            data = { email: state.email, email_valiation_token: credentials.email_valiation_token };
        } else {
            data = credentials;
        }
        setLoading(true);
        axios
            .post(Url.verification, data)
            .then((res) => {
                if (res.status === 202) {
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
    const resetVerificationHandler = () => {
        let data = null;
        if (state != null) {
            data = { email: state.email };
        } else {
            data = { email: credentials.email };
        }
        setLoading(true);
        axios
            .post(Url.resetVerification, data)
            .then((res) => {
                if (res.status === 202) {
                    setLoading(false);
                    setErrors(null);
                    setMessage(res.data);
                    navigate('/verification', {
                        replace: true,
                        state: { email: credentials.email },
                    });
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
    const isEmail = () => (
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
    );

    return (
        <>
            <title>Verification</title>
            <Container>
                <Row className="justify-content-center">
                    <Col md={6} className="bg-secondary bg-opacity-50 mt-lg-5 p-5 rounded">
                        <h6 className="text-center">Email Verification</h6>
                        <Row className="justify-content-center">
                            <Col md={6}>
                                {isLoading && loading()}
                                {errors && errorList()}
                                {message && errorMessage()}
                                <Form className={Classes.form} onSubmit={verificationHandler}>
                                    {state === null && isEmail()}
                                    <Form.Group className="mb-1">
                                        <Form.Label>
                                            <small>
                                                <RiLockPasswordFill /> Verification Code
                                            </small>
                                        </Form.Label>
                                        <Form.Control
                                            size="sm"
                                            type="text"
                                            placeholder="Enter verification code"
                                            name="email_valiation_token"
                                            value={credentials.email_valiation_token}
                                            onChange={credentialsHandler}
                                        />
                                    </Form.Group>
                                    <div className="d-grid">
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            size="sm"
                                            className="mb-1"
                                        >
                                            Verify
                                        </Button>
                                        <Button
                                            variant="primary"
                                            type="button"
                                            size="sm"
                                            onClick={resetVerificationHandler}
                                        >
                                            Resend Code
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
