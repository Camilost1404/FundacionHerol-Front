import { ToastContainer, toast } from "react-toastify"
import PropTypes from 'prop-types'
import './InformacionVoluntario.css'
import { Link } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"
import { useState } from "react"
import axios from "axios"

function InformacionVoluntario(props) {

    const { data } = props

    const [editing, setEditing] = useState(false);
    const [nuevaFoto, setNuevaFoto] = useState(null);
    const [previewFoto, setPreviewFoto] = useState(null);
    const [estado, setEstado] = useState(data.estado)

    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNuevaFoto(file);
            setPreviewFoto(URL.createObjectURL(file));
        }
    };

    const handleEditar = () => {
        setEditing(true);
    };

    const handleCancelar = () => {
        setNuevaFoto(null)
        setPreviewFoto(null)
        setEditing(false)
    };

    const handleAceptar = () => {
        axios.patch(`http://127.0.0.1:8000/api/estado_voluntario/?id_voluntario=${data.numero_documento}`)
            .then(response => {
                toast.success('El voluntario ha sido aceptado', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                })
                setEstado(response.data.estado)
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

        const formData = new FormData();

        formData.append('foto', nuevaFoto)

        axios.put(`http://127.0.0.1:8000/api/modificar_voluntario/?id_voluntario=${data.numero_documento}`, formData)
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
            <Link className="go-back" to='/admin/voluntarios'>
                <FaArrowLeft />
            </Link>
            <div className="child-photo">
                <img src={previewFoto || `http://127.0.0.1:8000/${data.foto}`} alt={`Foto de ${data.nombre} ${data.apellido}`} className="child-photo-img" />
            </div>
            {editing && (
                <div className="input-file-container info-edit">
                    <input
                        className="input-file-container"
                        id="foto"
                        type="file"
                        accept="image/*"
                        onChange={handleFotoChange}
                    />
                    <label htmlFor="foto" className="custom-file-upload voluntario">
                        Seleccionar Foto
                    </label>
                </div>
            )}
            <div className={`estado-voluntario ${estado ? 'aprobado' : 'espera'}`}>
                <h2 style={{ color: estado ? 'var(--blanco)' : 'var(--oscuro)' }}>{estado ? 'Aprobado' : 'En Espera'}</h2>
            </div>
            <div className="child-details">
                <h3>{data.nombre} {data.apellido}, {data.edad}</h3>
                {editing ? (
                    <>
                        <p>
                            <b>Tipo de documento:</b> {data.tipo_documento}
                        </p>
                        <p>
                            <b>Número de documento:</b> {data.numero_documento.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        </p>
                        <p>
                            <b>Fecha de nacimiento:</b> {data.fecha_nacimiento}
                        </p>
                        <p>
                            <b>Género:</b> {data.genero}
                        </p>
                        <p>
                            <b>Teléfono:</b> {data.telefono.replace(/(\d{3})(\d{3})(\d{4})/, '$1  $2  $3')}
                        </p>
                        <p className="experiencia">
                            <b>Experiencia:</b> {data.experiencia}
                        </p>
                        <div className="botones">
                            <button onClick={handleGuardar} className="btn btn-save">Guardar</button>
                            <button onClick={handleCancelar} className="btn btn-cancel">Cancelar</button>
                        </div>
                    </>
                ) : (
                    <>
                        <p>
                            <b>Tipo de documento:</b> {data.tipo_documento}
                        </p>
                        <p>
                            <b>Número de documento:</b> {data.numero_documento.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        </p>
                        <p>
                            <b>Fecha de nacimiento:</b> {data.fecha_nacimiento}
                        </p>
                        <p>
                            <b>Género:</b> {data.genero}
                        </p>
                        <p>
                            <b>Teléfono:</b> {data.telefono.replace(/(\d{3})(\d{3})(\d{4})/, '$1  $2  $3')}
                        </p>
                        <p className="experiencia">
                            <b>Experiencia:</b> {data.experiencia}
                        </p>
                        {!estado ?
                            (
                                <div className="botones">
                                    <button onClick={handleAceptar} className="btn btn-save">Aceptar</button>
                                    <button onClick={handleEditar} className="btn btn-edit">Editar</button>
                                </div>
                            )
                            :
                            (<button onClick={handleEditar} className="btn btn-edit">Editar</button>)
                        }
                    </>
                )}
            </div>
        </>
    )
}

InformacionVoluntario.propTypes = {
    data: PropTypes.object.isRequired
}

export default InformacionVoluntario