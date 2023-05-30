import { useState } from "react";
import './Contactanos.css'
import { FaEnvelope, FaFacebook, FaInstagram, FaMapMarkerAlt, FaPaperPlane, FaPhone, FaWhatsapp, FaYoutube } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Contactanos() {
    const [asunto, setAsunto] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        if (asunto === '' || email === '' || message === '') {
            toast.warn('Llena todos los campos', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
            return;
        }

        const formData = new FormData()

        formData.append('email', email)
        formData.append('asunto', asunto)
        formData.append('mensaje', message)

        // enviar al back
        toast.promise(
            axios.post('http://127.0.0.1:8000/api/contact', formData),
            {
                pending: 'Enviando...',
            }
        )
            .then(response => {
                if (response.status === 200) {
                    toast.success(response.data.success, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                    });
                }
                setAsunto("");
                setEmail("");
                setMessage("");
            })
            .catch(error => {
                toast.error(error.response.data.error, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
            })
    };

    return (
        <div>
            <ToastContainer />
            <section id="contact">
                <h1 className="section-header">Contáctanos</h1>
                <div className="contact-wrapper">
                    {/* Left contact page */}
                    <form id="contact-form" className="form-horizontal" role="form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <div className="col-sm-12">
                                <input type="text" className="form-control" id="name" placeholder="ASUNTO" name="name" value={asunto} onChange={(e) => setAsunto(e.target.value)} required />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-12">
                                <input type="email" className="form-control" id="email" placeholder="EMAIL" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                        </div>
                        <textarea className="form-control" rows="10" placeholder="MENSAJE" name="message" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>

                        <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-enviar_contactanos">
                            <FaPaperPlane /> Enviar
                        </button>
                    </form>
                    {/* Left contact page */}
                    <div className="direct-contact-container">
                        <ul className="contact-list">
                            <li className="list-item">
                                <FaMapMarkerAlt />
                                <span className="contact-text place">Villavicencio, Meta</span>
                            </li>
                            <li className="list-item">
                                <FaPhone />
                                <span className="contact-text phone">
                                    <a href="tel:314-358-80-43" title="Give me a call">(314) 3588043</a>
                                </span>
                            </li>
                            <li className="list-item">
                                <FaEnvelope />
                                <span className="contact-text gmail">
                                    <a href="mailto:fundacionherol@gmail.com" title="Send me an email">fundacionherol@gmail.com</a>
                                </span>
                            </li>
                        </ul>
                        <hr />
                        <ul className="social-media-list">
                            <li>
                                <a href="www.facebook.com/Fundacionherol" target="_blank" className="contact-icon">
                                    <FaFacebook />
                                </a>
                            </li>
                            <li>
                                <a href="/" target="_blank" className="contact-icon">
                                    <FaInstagram />
                                </a>
                            </li>
                            <li>
                                <a href="/" target="_blank" className="contact-icon">
                                    <FaWhatsapp />
                                </a>
                            </li>
                            <li>
                                <a href="/" target="_blank" className="contact-icon">
                                    <FaYoutube />
                                </a>
                            </li>
                        </ul>
                        <hr />
                        <div className="copyright">
                            &copy; Todos los derechos reservados
                        </div>
                    </div>
                </div>
            </section>

        </div>

    );
}
export default Contactanos;