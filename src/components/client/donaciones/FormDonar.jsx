import { useState } from "react";
import './Forms.css'
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import Swal from 'sweetalert2'
import { ToastContainer, toast } from "react-toastify";

function FormDonar() {

    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [documento, setDocumento] = useState('');
    const [monto, setMonto] = useState('');
    const [tipoDocumento, setTipoDocumento] = useState('')

    const [moneda, setMoneda] = useState('cop')

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData()

        formData.append('tipo_documento', tipoDocumento)
        formData.append('moneda', moneda)
        formData.append('numero_documento', documento)
        formData.append('nombre', nombres)
        formData.append('apellido', apellidos)
        formData.append('email', correo)
        formData.append('telefono', telefono)
        formData.append('precio', monto)

        axios.post('http://127.0.0.1:8000/api/donacion', formData)
            .then(response => {
                Swal.fire({
                    title: 'Serás redirigido a otra página para realizar el pago!',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    html: 'Redirigiendo...',
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                    },
                    allowOutsideClick: false,
                }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log(response.data)
                        window.open(response.data.id, "_blank");
                    }
                })
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
            <div className="formu-container formu-container_donar">
                <div className="container-form_donar">
                    <h2>Participa Donando</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <select className="form-control_donar" name="tipo_documento" value={tipoDocumento} onChange={(e) => setTipoDocumento(e.target.value)}>
                                <option value="" disabled>Seleccionar</option>
                                <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
                                <option value="Cédula de Extranjería">Cédula de Extranjería</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="documento" className="form-label">Número de documento::</label>
                            <input
                                type="text"
                                className="form-control_donar"
                                id="documento"
                                value={documento}
                                onChange={(e) => setDocumento(e.target.value)}
                                maxLength={18}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nombres" className="form-label">
                                Nombres:
                            </label>
                            <input
                                type="text"
                                className="form-control_donar"
                                id="nombres"
                                value={nombres}
                                onChange={(e) => setNombres(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="apellidos" className="form-label">
                                Apellidos:
                            </label>
                            <input
                                type="text"
                                className="form-control_donar"
                                id="apellidos"
                                value={apellidos}
                                onChange={(e) => setApellidos(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="telefono" className="form-label">
                                Teléfono:
                            </label>
                            <input
                                type="tel"
                                className="form-control_donar"
                                id="telefono"
                                value={telefono}
                                maxLength={12}
                                onChange={(e) => setTelefono(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="correo" className="form-label">
                                Correo:
                            </label>
                            <input
                                type="email"
                                className="form-control_donar"
                                id="correo"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="documento" className="form-label" >Monto a donar:</label>
                            <div className='monto'>
                                <input
                                    type="text"
                                    className="form-control_donar"
                                    id="documento"
                                    value={monto}
                                    onChange={(e) => setMonto(e.target.value)}
                                    placeholder='$'
                                />
                                <select name="tipo_moneda" value={moneda} className="moneda" onChange={(e) => setMoneda(e.target.value)}>
                                    <option value="cop">COP</option>
                                    <option value="usd">USD</option>
                                </select>
                                {/* <p className='moneda'>COP</p> */}
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-confirm-donar">
                            <FaHeart /> <span>Donar</span>
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default FormDonar