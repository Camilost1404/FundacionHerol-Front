import { useState } from "react";
import './FormAgregarUsuario.css'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";

function FormAgregarUsuario() {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSuperuser, setIsSuperuser] = useState(false);

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Realizar la validación de las contraseñas
        if (password !== confirmPassword) {
            toast.error('Las contraseñas no coinciden', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
            return;
        }

        const formData = new FormData();

        formData.append('first_name', nombre)
        formData.append('last_name', apellido)
        formData.append('username', username)
        formData.append('email', email)
        formData.append('password', password);
        formData.append('is_superuser', isSuperuser);

        axios.post('http://127.0.0.1:8000/api/crear_user/', formData)
            .then(response => {

                if (response.status === 201) {
                    toast.success('Usuario Creado con Éxito', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                    });
                }

                setApellido('');
                setNombre('');
                setEmail('');
                setUsername('');
                setPassword('');
                setConfirmPassword('');
                setIsSuperuser(false);

            })
            .catch(error => {
                console.error(error)
                toast.error('Error', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
            })

    };

    return (
        <>
            <ToastContainer />
            <Link className="go-back" to='/admin/usuarios'>
                <FaArrowLeft />
            </Link>
            <form onSubmit={handleSubmit} className='formulario-agregar usuarios'>
                <div className='campo'>
                    <label htmlFor="email">Correo Electronico:</label>
                    <input
                        placeholder="example@example.com"
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        placeholder="John"
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor="apellido">Apellido:</label>
                    <input
                        placeholder="Doe"
                        type="text"
                        id="apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor="username">Usuario:</label>
                    <input
                        placeholder="john_doe123"
                        type="text"
                        id="usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='campo'>
                    <label htmlFor="password">Contraseña:</label>
                    <div className="password-input">
                        <input
                            placeholder="Escribe nuevamente tu contraseña"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className="password-toggle"
                            onClick={toggleShowPassword}
                            type="button"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>
                <div className='campo'>
                    <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                    <div className="password-input">
                        <input
                            placeholder="Escribe nuevamente tú contraseña"
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            className="password-toggle"
                            onClick={toggleShowConfirmPassword}
                            type="button"
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>
                <div className='campo-switch'>
                    <label htmlFor="isSuperuser">Super Administrador:</label>
                    <label className="switch">
                        <input
                            type="checkbox"
                            id="isSuperuser"
                            checked={isSuperuser}
                            onChange={(e) => setIsSuperuser(e.target.checked)}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>
                <button type="submit" className='btn btn-success btn-enviar'>Enviar</button>
            </form>
        </>
    )
}

export default FormAgregarUsuario