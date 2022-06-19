/* eslint-disable no-unused-vars */
import { Container } from 'react-bootstrap';
import Classes from '../assets/css/services.module.css';
import Footer from './Footer';
import Navmenu from './Navmenu';

export default function ServiceContainer(props) {
    const { children } = props;
    return (
        <Container fluid className={`${Classes.service_container} bg-dark`}>
            <Navmenu />
            <Container className={`${Classes.container} bg-light`}>{children}</Container>
            <Footer />
        </Container>
    );
}
