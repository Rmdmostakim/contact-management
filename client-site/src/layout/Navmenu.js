/* eslint-disable prettier/prettier */
import {
    Button, Container,
    Dropdown, Navbar
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Classes from '../assets/css/nav.module.css';
import Profile from '../assets/images/profile.png';


export default function Navmenu() {
    const{user} = useSelector((state)=>state.contacts);
    const navigation = useNavigate();
    const logout = () => {
        localStorage.removeItem('access_token');
        navigation('/login');
    };
    return (
        <Navbar bg="dark" className={Classes.nav}>
                <Container>
                    <Navbar.Brand className={Classes.nav_brand}>
                        <NavLink
                            to="/"
                            className={({ isActive }) => (isActive ? Classes.active : '')}
                        >

                            {user && user.name}
                        </NavLink>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Dropdown drop="start">
                            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                <img className={Classes.profile} src={Profile} alt="profile" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu variant="dark" className={Classes.dropdown_menu}>
                                <li>
                                    <NavLink
                                        to="/profile"
                                        className={({ isActive }) =>
                                            isActive ? Classes.active : ''
                                        }
                                    >
                                        Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <Button variant="none" onClick={logout}>Logout</Button>
                                </li>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    );
}
