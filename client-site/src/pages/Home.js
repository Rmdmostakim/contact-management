/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import {
    Button, Col,
    Container,
    Form,
    FormControl, Modal, Nav,
    Navbar,
    Row
} from 'react-bootstrap';
import { AiFillLock } from 'react-icons/ai';
import { BsFillTelephonePlusFill, BsTelephoneFill } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import CForm from '../assets/css/form.module.css';
import Classes from '../assets/css/home.module.css';
import Vcard from '../components/Vcard';
import { createContact, getContacts } from '../Features/contact/ContactSlice';
import ServiceContainer from '../layout/ServiceContainer';


export default function Home() {
    const { contacts, isLoading, isError,isSuccess } = useSelector((state) => state.contacts);
    const [modal, setModal] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const initialValue = { name: '', phone: '', email: '', avatar: [] };
    const [credentials, setCredentials] = useState(initialValue);
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getContacts());
    }, [dispatch]);

    const searchHandler = (event) => {
        event.preventDefault();
        const { value } = event.target;
        setSearchValue(value);
    };

    const contactList = () => {
        contacts.map((contact) => <Vcard key={contact.id} contact={contact} />);
    };

    const modalClose = () => setModal(false);
    const modalShow = () =>{
        setCredentials(initialValue);
        setModal(true);
    }

    const credentialsHandler = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    };
    const fileHandler = (event) => {
        const { name, files } = event.target;
        setCredentials({ ...credentials, [name]: files[0] });
    };

    const createHandler = (event) =>{
        event.preventDefault();
        const bodyFormData = new FormData();
        bodyFormData.append('name', credentials.name);
        bodyFormData.append('phone', credentials.phone);
        bodyFormData.append('email', credentials.email);
        bodyFormData.append('avatar', credentials.avatar);
        dispatch(createContact(bodyFormData));
        setModal(false);
    }

    return (
        <>
            <title>Home</title>
            <ServiceContainer>
                <Container>
                    <Navbar bg="light" expand="lg" className={Classes.search_menu}>
                        <Container fluid>
                            <Button size="sm" onClick={modalShow}>
                                <BsFillTelephonePlusFill />
                                &ensp;Add
                            </Button>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll">
                                <Nav
                                    className="me-auto my-2 my-lg-0"
                                    style={{ maxHeight: '100px' }}
                                    navbarScroll
                                />
                                <Form
                                    className="d-flex"
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                    }}
                                >
                                    <FormControl
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                        value={searchValue}
                                        onChange={searchHandler}
                                    />
                                </Form>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <Container>
                        <Row className="justify-content-center">
                            <Col md={6} className={`${Classes.box} text-center`}>
                                {contacts &&
                                    contacts
                                        .filter((contact) => {
                                            if (searchValue === '') return true;
                                            const name = contact.name.toLowerCase();
                                            return name.includes(searchValue.toLowerCase());
                                        })
                                        .map((contact) => (
                                            <Vcard key={contact.id} contact={contact} />
                                        ))}
                            </Col>
                        </Row>
                    </Container>
                </Container>
                {/* add new contact modal */}
                <Modal show={modal} fullscreen onHide={modalClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>
                        <h6 className='text-center'>New Contact</h6>
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row className="justify-content-center">
                                <Col md={6} className="p-5 rounded">
                                    <Row className="justify-content-center">
                                        <Col md={6}>
                                            <Form className={CForm.form} onSubmit={createHandler}>
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
                                                <Form.Group className="mb-1">
                                                    <Form.Label>
                                                        <small>
                                                            <AiFillLock /> Picture
                                                        </small>
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="file"
                                                        name="avatar"
                                                        size="sm"
                                                        onChange={fileHandler}
                                                    />
                                                </Form.Group>
                                                <div className="d-grid">
                                                    <Button variant="primary" type="submit" size="sm">
                                                        Save
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
            </ServiceContainer>
        </>
    );
}
