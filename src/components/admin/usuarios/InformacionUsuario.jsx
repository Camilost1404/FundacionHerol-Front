import { ToastContainer, toast } from "react-toastify"
import PropTypes from 'prop-types'
import './InformacionUsuario.css'
import { Link } from "react-router-dom"
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa"
import { useState } from "react"
import axios from "axios"

function InformacionUsuario(props) {

    const { data } = props

    const [editing, setEditing] = useState(false);
    const [contraseña, setContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [email, setEmail] = useState(data.email);
    const [isSuperUser, setIsSuperUser] = useState(data.is_superuser)
    const [isActive, setIsActive] = useState(data.is_active)

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const [lastEmail, setLastEmail] = useState('')

    const handleEditar = () => {
        setLastEmail(email)
        setEditing(true);
    };

    const handleCancelar = () => {
        setEmail(lastEmail)
        setConfirmarContraseña('')
        setContraseña('')
        setEditing(false)
    };

    const handleSuperUser = () => {

        const formData = new FormData();

        formData.append('is_superuser', !isSuperUser)

        axios.put(`http://127.0.0.1:8000/api/super_update?id_user=${data.id}`, formData)
            .then(response => {
                if (response.status === 200) {
                    toast.success('Estado Actualizado', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                    });
                }
                setIsSuperUser(!isSuperUser)
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
    }

    const handleActive = () => {

        const formData = new FormData();

        formData.append('is_active', !isActive)

        axios.put(`http://127.0.0.1:8000/api/active_update?id_user=${data.id}`, formData)
            .then(response => {
                if (response.status === 200) {
                    toast.success('Estado Actualizado', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                    });
                }
                setIsActive(!isActive)
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
    }

    const handleGuardar = () => {

        // Realizar la validación de las contraseñas
        if (contraseña !== confirmarContraseña) {
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

        formData.append('email', email)

        if (contraseña !== '') {
            formData.append('password', contraseña)
        }

        axios.patch(`http://127.0.0.1:8000/api/modificar_user?id_user=${data.id}`, formData)
            .then(response => {
                if (response.status === 200) {
                    toast.success('Los cambios se han guardado correctamente', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                    });
                }
                setEditing(false);
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

            <div className="user-details">
                <h3>{data.first_name} {data.last_name}</h3>
                <div>
                    <div className='campo-switch info-usuario'>
                        <label htmlFor="isSuperuser">Super Administrador:</label>
                        <label className="switch">
                            <input
                                type="checkbox"
                                id="isSuperuser"
                                checked={isSuperUser}
                                onChange={handleSuperUser}
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>
                <div>
                    <div className='campo-switch info-usuario'>
                        <label htmlFor="isSuperuser">Activo:</label>
                        <label className="switch">
                            <input
                                type="checkbox"
                                id="IsActive"
                                checked={isActive}
                                onChange={handleActive}
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>
                {editing ? (
                    <>
                        <p>
                            <b>Usuario:</b> {data.username}
                        </p>
                        <p>
                            <b>Email:</b>
                            <input className="email-edit" type="text" value={email} placeholder='example@gmail.com' onChange={(e) => setEmail(e.target.value)} />
                        </p>
                        <div>
                            <b>Contraseña:</b>
                            <div className="password-input">
                                <input className="password-edit" type={showPassword ? 'text' : 'password'} value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
                                <button
                                    className="password-toggle"
                                    onClick={toggleShowPassword}
                                    type="button"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <b>Confirmar Contraseña:</b>
                            <div className="password-input">
                                <input className="password-edit" type={showConfirmPassword ? 'text' : 'password'} value={confirmarContraseña} onChange={(e) => setConfirmarContraseña(e.target.value)} />
                                <button
                                    className="password-toggle"
                                    onClick={toggleShowConfirmPassword}
                                    type="button"
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                        <div className="botones">
                            <button onClick={handleGuardar} className="btn btn-save">Guardar</button>
                            <button onClick={handleCancelar} className="btn btn-cancel">Cancelar</button>
                        </div>
                    </>
                ) : (
                    <>
                        <p>
                            <b>Usuario:</b> {data.username}
                        </p>
                        <p>
                            <b>Correo Electrónico:</b> {email}
                        </p>
                        <p>
                            <b>Ultimo Acceso:</b> {data.last_login}
                        </p>
                        <button onClick={handleEditar} className="btn btn-edit">Editar</button>
                    </>
                )}
            </div>
        </>
    )
}

InformacionUsuario.propTypes = {
    data: PropTypes.object.isRequired
}

export default InformacionUsuario