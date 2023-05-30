import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import "./Footer.css"
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <h6> Fundación Herol.</h6>
                        <p className="text-justify">En la Fundación Herol, construimos valores y fomentamos la transformación social. Somos una organización sin fines de lucro que promueve el bienestar y desarrollo de niños.</p>
                    </div>

                    <div className="col-xs-6 col-md-3">
                        <h6>Idiomas</h6>
                        <ul className="footer-links">
                            <li>
                                <a href="#">Español</a>
                            </li>
                            <li><a href="#">Ingles</a></li>
                        </ul>
                    </div>

                    <div className="col-xs-6 col-md-3">
                        <h6>enlaces rápidos</h6>
                        <ul className="footer-links">
                            <li>
                                <Link to='/'>
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link to='nosotros'>
                                    Sobre Nosotros
                                </Link>
                            </li>
                            <li>
                                <Link to='nosotros'>
                                    Donde Estamos
                                </Link>
                            </li>
                            <li>
                                <Link to='voluntariados'>
                                    Voluntarios
                                </Link>
                            </li>
                            <li>
                                <Link to='apadrinamiento'>
                                    Apadrinamiento
                                </Link>
                            </li>
                            <li>
                                <Link to='contactanos'>
                                    Contáctanos
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <p className="copyright-text"> Todos los derechos reservados &copy; <a href="https://www.facebook.com/Fundacionherol" target='_blank' rel="noreferrer">Fundación Herol</a></p>
                    </div>

                    <div className="col-md-8 col-sm-6 col-xs-12">
                        <ul className="social-icons">
                            <li><a className="facebook" href="https://www.facebook.com/Fundacionherol" target='_blank' rel="noreferrer"><FaFacebook /></a></li>
                            <li><a className="whatsapp" href="#"><FaWhatsapp /></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>

    );
}

export default Footer;