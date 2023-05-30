import { useState } from "react";
import "./Forms.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const FormVoluntarios = () => {
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [documento, setDocumento] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [genero, setGenero] = useState('');
    const [experienciaVoluntario, setExperienciaVoluntario] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData()

        formData.append('nombre', nombres)
        formData.append('apellido', apellidos)
        formData.append('tipo_documento', 'Cédula de Ciudadanía')
        formData.append('email', correo)
        formData.append('telefono', telefono)
        formData.append('fecha_nacimiento', fechaNacimiento)
        formData.append('genero', genero)
        formData.append('numero_documento', documento)
        formData.append('experiencia', experienciaVoluntario)

        axios.post('http://127.0.0.1:8000/api/registrar_voluntario/', formData)
            .then(response => {
                if (response.status === 201) {
                    toast.success('Registro exitoso - Pronto nos Pondremos en contacto contigo', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                    });
                }
                else if (response.status === 400) {
                    toast.error(response.data.error, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                    });
                }
                setNombres('')
                setApellidos('')
                setCorreo('')
                setExperienciaVoluntario('')
                setFechaNacimiento('')
                setGenero('')
                setTelefono('')
                setDocumento('')
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
                toast.warn(error.response.data.message, {
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
        <>
            <ToastContainer />
            <div className='formu-container formu-container_voluntarios'>
                <div className="container-form_voluntarios">
                    <h2>Rellena el formulario para ser voluntario</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="nombres" className="form-label">Nombres:</label>
                            <input
                                type="text"
                                className="form-control_voluntarios"
                                id="nombres"
                                value={nombres}
                                onChange={(e) => setNombres(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="apellidos" className="form-label">Apellidos:</label>
                            <input
                                type="text"
                                className="form-control_voluntarios"
                                id="apellidos"
                                value={apellidos}
                                onChange={(e) => setApellidos(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="telefono" className="form-label">Teléfono:</label>
                            <input
                                type="tel"
                                className="form-control_voluntarios"
                                id="telefono"
                                value={telefono}
                                maxLength={10}
                                onChange={(e) => setTelefono(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="correo" className="form-label">Correo:</label>
                            <input
                                type="email"
                                className="form-control_voluntarios"
                                id="correo"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="documento" className="form-label">Número de documento::</label>
                            <input
                                type="text"
                                className="form-control_voluntarios"
                                id="documento"
                                value={documento}
                                onChange={(e) => setDocumento(e.target.value)}
                                maxLength={18}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento:</label>
                            <input
                                type="date"
                                className="form-control_voluntarios"
                                id="fechaNacimiento"
                                value={fechaNacimiento}
                                onChange={(e) => setFechaNacimiento(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="genero" className="form-label">
                                Género:
                            </label>
                            <select
                                className="form-control_voluntarios"
                                id="genero"
                                value={genero}
                                onChange={(e) => setGenero(e.target.value)}
                            >
                                <option value="" disabled>Seleccionar género</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="experienciaVoluntario" className="form-label">Experiencia como Voluntario:</label>
                            <textarea
                                className="form-control_voluntarios"
                                id="experienciaVoluntario"
                                value={experienciaVoluntario}
                                onChange={(e) => setExperienciaVoluntario(e.target.value)}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary btn-enviar_contactanos">
                            <i className="fas fa-paper-plane"></i> Enviar
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default FormVoluntarios;

