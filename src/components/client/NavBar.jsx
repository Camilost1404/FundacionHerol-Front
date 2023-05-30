import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./NavBar.css";
import logo from "../../assets/images/herol-logo.png";
import { Link } from "react-router-dom";

function Navbar() {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle(
            "responsive_nav"
        );
    };

    return (
        <header className="header-client">
            <Link to='/' className="header-content">
                <img className="logo" src={logo} alt="Logo" />
                <h3>
                    Fundación Herol
                </h3>
            </Link>
            <nav ref={navRef} className="nav-client">
                <Link to='/'>
                    Inicio
                </Link>
                <Link to='nosotros'>
                    Nosotros
                </Link>
                {/* <a href="/#">Proyectos</a> */}
                <Link to='ubicacion'>
                    Donde estamos
                </Link>
                <Link to='voluntariados'>
                    Voluntarios
                </Link>
                <Link to='apadrinamiento'>
                    Apadrinamiento
                </Link>
                <Link to='contactanos'>
                    Contáctanos
                </Link>
                <Link className="btn-donar bttn-anima" to='dona'>
                    <span className="heartbeat">&hearts; </span> Dona <span className="heartbeat">&hearts;</span>
                </Link>

                <button
                    className="nav-btn nav-close-btn"
                    onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>
            <button
                className="nav-btn"
                onClick={showNavbar}>
                <FaBars />
            </button>
        </header>
    );
}

export default Navbar;