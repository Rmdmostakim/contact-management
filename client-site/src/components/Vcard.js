/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Button, Col, Container, Form, Modal, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import { BiDotsVertical } from 'react-icons/bi';
import { BsTelephoneFill } from 'react-icons/bs';
import { CgPhone } from 'react-icons/cg';
import { FaUserAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { ImBin } from 'react-icons/im';
import { IoIosMailUnread } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import CForm from '../assets/css/form.module.css';
import Classes from '../assets/css/vcard.module.css';
import Profile from '../assets/images/profile.png';
import { deleteContact, updateContact } from '../Features/contact/ContactSlice';
import Url from '../Url';

export default function Vcard({ contact }) {
    const dispatch = useDispatch();
    const { name, phone, email, id, avatar } = contact;
    const [modal, setModal] = useState(false);
    const initialValue = { name, phone, email, id };
    const [credentials, setCredentials] = useState(initialValue);

    const modalClose = () => {
        setModal(false);
    };
    const modalShow = () => {
        setCredentials(initialValue);
        setModal(true);
    };

    const credentialsHandler = (event) => {
        const { name: cName, value } = event.target;
        setCredentials({ ...credentials, [cName]: value });
    };
    const updateHandler = (event) => {
        event.preventDefault();
        dispatch(updateContact(credentials));
        setModal(false);
    };

    const deleteHandler = (deleteId) => {
        dispatch(deleteContact(deleteId));
    };

    const cOverlay = (dId) => (
        <Popover>
            <Popover.Body className={Classes.clickableBtns}>
                <li>
                    <Button size="sm" onClick={modalShow}>
                        <FiEdit />
                    </Button>
                </li>
                <li>
                    <Button size="sm" variant="none" onClick={() => deleteHandler(dId)}>
                        <ImBin />
                    </Button>
                </li>
            </Popover.Body>
        </Popover>
    );

    return (
        <>
            <Row>
                <Col>
                    <div className={Classes.card}>
                        <div className={Classes.profile_box}>
                            {avatar === null ? (
                                <img src={Profile} alt="profile" />
                            ) : (
                                <img src={Url.imageUrl + avatar} alt="profile" />
                            )}
                            {modal === true ? null : (
                                <OverlayTrigger
                                    trigger="click"
                                    placement="right"
                                    rootClose
                                    overlay={cOverlay(id)}
                                >
                                    <Button variant="none">
                                        <BiDotsVertical />
                                    </Button>
                                </OverlayTrigger>
                            )}
                        </div>
                        <p>{name}</p>
                        <p>
                            <CgPhone />
                            &ensp;
                            <a href={`tel:${phone}`}>{phone}</a>
                        </p>
                        <p>
                            <IoIosMailUnread />
                            &ensp;
                            <a href={`mailto:${email}`}>{email}</a>
                        </p>
                        <hr />
                    </div>
                </Col>
            </Row>
            {/* update modal */}
            <Modal show={modal} fullscreen onHide={modalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h6 className="text-center">Update Contact</h6>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row className="justify-content-center">
                            <Col md={6} className="p-5 rounded">
                                <Row className="justify-content-center">
                                    <Col md={6}>
                                        <Form className={CForm.form} onSubmit={updateHandler}>
                                            <Form.Group className="mb-1">
                                                <Form.Label>
                                                    <small>
                                                        <FaUserAlt /> Name
                                                    </small>
                                                </Form.Label>
                                                <Form.Control
                                                    size="sm"
                                                    type="text"
                                                    placeholder="Enter name"
                                                    name="name"
                                                    value={credentials.name}
                                                    onChange={credentialsHandler}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-1">
                                                <Form.Label>
                                                    <small>
                                                        <BsTelephoneFill /> Phone
                                                    </small>
                                                </Form.Label>
                                                <Form.Control
                                                    size="sm"
                                                    type="tel"
                                                    placeholder="Enter phone"
                                                    name="phone"
                                                    value={credentials.phone}
                                                    onChange={credentialsHandler}
                                                />
                                            </Form.Group>
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
                                            <div className="d-grid">
                                                <Button variant="primary" type="submit" size="sm">
                                                    Update
                                                </Button>
                                            </div>
                                        </Form>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
}
