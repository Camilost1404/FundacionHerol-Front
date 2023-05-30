import { useState } from "react";
import './FormAgregarNiño.css'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function FormAgregarNiño() {

    const [tipoDocumento, setTipoDocumento] = useState('');
    const [numeroDocumento, setNumeroDocumento] = useState({ formatted: '', raw: '' });
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [foto, setFoto] = useState(null);
    const [fotoPreview, setFotoPreview] = useState('');
    const [telefono, setTelefono] = useState({ formatted: '', raw: '' });
    const [genero, setGenero] = useState('')

    const handleFotoChange = (e) => {
        const selectedFile = e.target.files[0];
        setFoto(selectedFile)
        setFotoPreview(URL.createObjectURL(selectedFile));
    };

    const handleChangeNumber = (event) => {
        const inputValue = event.target.value;
        const formattedValue = inputValue
            .replace(/\D/g, "") // Eliminar caracteres que no sean dígitos
            .replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Agregar puntos de mil
        setNumeroDocumento({ formatted: formattedValue, raw: inputValue });
    }

    const handleChangeTelefono = (e) => {
        const input = e.target.value;
        const numericInput = input.replace(/\D/g, ''); // Remover caracteres no numéricos
        const formattedInput = formatPhoneNumber(numericInput); // Formatear el número de teléfono

        setTelefono({ formatted: formattedInput, raw: input });
    };

    const formatPhoneNumber = (numericInput) => {
        const phoneNumber = numericInput.replace(/(\d{3})(\d{3})(\d{4})/, '$1  $2  $3');
        return phoneNumber;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('tipo_documento', tipoDocumento)
        formData.append('numero_documento', numeroDocumento.raw.replace(/\./g, ''))
        formData.append('nombre', nombre)
        formData.append('apellido', apellido)
        formData.append('genero', genero)
        formData.append('fecha_nacimiento', fechaNacimiento)
        formData.append('telefono', telefono.raw.replace(' ', ''))
        formData.append('foto', foto)

        axios.post('http://127.0.0.1:8000/api/guardar_niño/', formData)
            .then(response => {

                if (response.status === 201) {
                    toast.success('Niño Creado con Éxito', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                    });
                }

                setTipoDocumento('')
                setApellido('')
                setFechaNacimiento('')
                setFoto(null)
                setFotoPreview('')
                setGenero('')
                setNombre('')
                setNumeroDocumento({ formatted: '', raw: '' })
                setTelefono({ formatted: '', raw: '' })

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
            <form onSubmit={handleSubmit} className='formulario-agregar'>
                <div className='columna'>
                    <div className='campo'>
                        <label htmlFor="tipoDocumento">Tipo de Documento:</label>
                        <select
                            id="tipoDocumento"
                            value={tipoDocumento}
                            onChange={(e) => setTipoDocumento(e.target.value)}
                        >
                            <option value="" disabled>Seleccionar</option>
                            <option value="Registro Civil">Registro Civil</option>
                            <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
                        </select>
                    </div>
                    <div className='campo'>
                        <label htmlFor="numeroDocumento">Número de Documento:</label>
                        <input
                            type="text"
                            id="numeroDocumento"
                            value={numeroDocumento.formatted}
                            onChange={handleChangeNumber}
                            maxLength={18}
                        />
                    </div>
                    <div className='campo'>
                        <label htmlFor="nombre">Nombre:</label>
                        <input
                            type="text"
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div className='campo'>
                        <label htmlFor="apellido">Apellido:</label>
                        <input
                            type="text"
                            id="apellido"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                        />
                    </div>
                    <div className='campo-genero'>
                        <div>
                            <input
                                type="checkbox"
                                id="masculino"
                                value="Masculino"
                                checked={genero === 'Masculino'}
                                onChange={(e) => setGenero(e.target.value)}
                                style={{ marginRight: `${10}px` }}
                            />
                            <label htmlFor="masculino">Masculino</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="femenino"
                                value="Femenino"
                                checked={genero === 'Femenino'}
                                onChange={(e) => setGenero(e.target.value)}
                                style={{ marginRight: `${10}px` }}
                            />
                            <label htmlFor="femenino">Femenino</label>
                        </div>
                    </div>
                    <div className='campo'>
                        <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
                        <input
                            type="date"
                            id="fechaNacimiento"
                            value={fechaNacimiento}
                            max={new Date().toISOString().split("T")[0]}
                            onChange={(e) => setFechaNacimiento(e.target.value)}
                        />
                    </div>
                    <div className='campo'>
                        <label htmlFor="telefono">Número de Teléfono:</label>
                        <input
                            type="tel"
                            id="telefono"
                            placeholder='XXX XXX XXXX'
                            value={telefono.formatted}
                            maxLength={10}
                            onChange={handleChangeTelefono}
                        />
                    </div>
                </div>
                <div className="linea-vertical"></div>
                <div className='columna'>
                    <div className='campo'>
                        <div className="input-file-container">
                            <input
                                type="file"
                                id="foto"
                                accept="image/*"
                                onChange={handleFotoChange}
                            />
                            <label htmlFor="foto" className="custom-file-upload">
                                Seleccionar Foto
                            </label>
                        </div>
                        <div className='preview-container'>
                            {fotoPreview ? (
                                <img src={fotoPreview} alt="Foto seleccionada" className='foto-preview' />
                            ) : (
                                <div className='placeholder-text'>Aquí se visualizará la imagen</div>
                            )}
                        </div>
                    </div>
                    <button type="submit" className='btn btn-success btn-enviar'>Enviar</button>
                </div>

            </form>
        </>
    )
}

export default FormAgregarNiño