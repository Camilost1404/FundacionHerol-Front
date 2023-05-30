import { NavLink } from 'react-router-dom'
import { FaHome, FaTable, FaAngleDoubleUp, FaTrophy, FaUser, FaDonate, FaUsers } from 'react-icons/fa'
import './SideBar.css'
import Logo from '../../assets/images/herol-logo.png'
import { useEffect, useState } from 'react'
import axios from 'axios'

function SideBar() {

    const [show, setShow] = useState(true)
    const [userAuth, setUserAuth] = useState({})

    useEffect(() => {
        axios.get(
            'http://127.0.0.1:8000/api/user/auth',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
            .then(response => {
                setUserAuth(response.data)
            })
            .catch(error => {
                console.error(error)
            })
    }, [])


    const toggleMenu = () => {
        setShow(!show)
    }

    const handleLogOut = () => {

        const formData = new FormData();

        formData.append('refresh_token', localStorage.getItem('refresh'))

        axios.post(
            'http://127.0.0.1:8000/api/user/logout', formData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
            .then(response => {
                if (response.status === 205) {
                    localStorage.removeItem('token')
                    localStorage.removeItem('refresh')
                    window.location.reload()
                }
            })
            .catch(error => console.error(error))

    };

    return (
        <>
            <div id="sidebar" className={`sidebar ${show ? '' : 'shrink_sidebar'}`}>
                <div className="sidebar-header">
                    <img src={Logo} alt="Logo" className='logo-admin' />
                    <h4>Bienvenido, <strong>{userAuth.first_name}</strong></h4>
                </div>
                <ul className="sidebar-navlink">
                    <li className='navlink-item'>
                        <NavLink to="/admin" end>
                            <FaHome />
                            {
                                show && ('Inicio')
                            }
                        </NavLink>
                    </li>
                    <li className='navlink-item'>
                        <NavLink to="niños">
                            <FaTable />
                            {
                                show && ('Niños')
                            }
                        </NavLink>
                    </li>
                    <li className='navlink-item'>
                        <NavLink to="voluntarios">
                            <FaTable />
                            {
                                show && ('Voluntarios')
                            }
                        </NavLink>
                    </li>
                    <li className='navlink-item'>
                        <NavLink to="podios">
                            <FaTrophy />
                            {
                                show && ('Podios')
                            }
                        </NavLink>
                    </li>
                    <li className='navlink-item'>
                        <NavLink to="donaciones">
                            <FaDonate />
                            {
                                show && ('Donaciones')
                            }
                        </NavLink>
                    </li>
                    {/* <li className='navlink-item'>
                        <NavLink to="usuarios">
                            <FaUsers />
                            {
                                show && ('Padrinos')
                            }
                        </NavLink>
                    </li> */}
                    {userAuth.is_superuser && (
                        <li className='navlink-item'>
                            <NavLink to="usuarios">
                                <FaUser />
                                {
                                    show && ('Usuarios')
                                }
                            </NavLink>
                        </li>
                    )}
                    {
                        show && (
                            <li className="nav-item">
                                <button className="btn btn-logout" onClick={handleLogOut}>
                                    Logout
                                </button>
                            </li>
                        )
                    }
                </ul>
                <button onClick={toggleMenu} id="toogleBtn" className="colleps-btn">
                    <FaAngleDoubleUp />
                </button>
            </div>
        </>
    )
}

export default SideBar