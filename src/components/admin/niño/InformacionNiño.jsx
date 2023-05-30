import { ToastContainer, toast } from "react-toastify"
import PropTypes from 'prop-types'
import './InformacionNiños.css'
import { Link } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"
import { useState } from "react"
import axios from "axios"

function InformacionNiño(props) {

    const { data } = props

    const [editing, setEditing] = useState(false);
    const [documento, setDocumento] = useState(data.tipo_documento);
    const [telefono, setTelefono] = useState(data.telefono);
    const [nuevaFoto, setNuevaFoto] = useState(null);
    const [previewFoto, setPreviewFoto] = useState(null);

    const [lastTelefono, setLastTelefono] = useState('')
    const [lastDocumento, setLastDocumento] = useState('')

    const handleDocumentoChange = (e) => {
        setDocumento(e.target.value);
    };

    const handleTelefonoChange = (e) => {
        const input = e.target.value;
        const numericInput = input.replace(/\D/g, ''); // Remover caracteres no numéricos
        setTelefono(numericInput);
    };

    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNuevaFoto(file);
            setPreviewFoto(URL.createObjectURL(file));
        }
    };

    const handleEditar = () => {
        setLastDocumento(documento)
        setLastTelefono(telefono)
        setEditing(true);
    };

    const handleCancelar = () => {
        setTelefono(lastTelefono)
        setDocumento(lastDocumento)
        setNuevaFoto(null)
        setPreviewFoto(null)
        setEditing(false)
    };

    const handleGuardar = () => {

        const formData = new FormData();

        if (nuevaFoto !== null) {
            formData.append('foto', nuevaFoto);
        }
        formData.append('telefono', telefono)
        formData.append('tipo_documento', documento)

        axios.put(`http://127.0.0.1:8000/api/modificar_niño/?id_niño=${data.numero_documento}`, formData)
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
            <Link className="go-back" to='/admin/niños'>
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
                    <label htmlFor="foto" className="custom-file-upload">
                        Seleccionar Foto
                    </label>
                </div>
            )}
            <div className="child-details">
                <h3>{data.nombre} {data.apellido}, {data.edad}</h3>
                {editing ? (
                    <>
                        <p>
                            <b>Tipo de documento:</b>
                            <select className="select-edit" value={documento} onChange={handleDocumentoChange}>
                                <option value="" disabled>Seleccionar</option>
                                <option value="Registro Civil">Registro Civil</option>
                                <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
                            </select>
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
                            <b>Teléfono:</b>
                            <input className="tel-edit" maxLength={10} type="tel" value={telefono} placeholder='XXX XXX XXXX' onChange={handleTelefonoChange} />
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
                        <button onClick={handleEditar} className="btn btn-edit">Editar</button>
                    </>
                )}
            </div>
        </>
    )
}

InformacionNiño.propTypes = {
    data: PropTypes.object.isRequired
}

export default InformacionNiño