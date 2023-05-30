import { FaEdit, FaSave, FaTimes } from "react-icons/fa"
import { Link } from "react-router-dom"
import PropTypes from 'prop-types'
import { ToastContainer } from "react-toastify"

import '../Tablas.css'
import { useEffect, useState } from "react"
import axios from "axios"

function TablaPodios(props) {

    const [data, setData] = useState([]);
    const [headers, setheaders] = useState([]);
    const [editing, setEditing] = useState(false);

    const [niños, setNiños] = useState([])

    const [last, setLast] = useState(null)

    useEffect(() => {

        axios.get('http://127.0.0.1:8000/api/podios')
            .then(response => {

                let responseData = response.data;

                const newData = responseData.map(podio => {

                    return {
                        id: podio.id,
                        info: {
                            tipo_podio: podio.tipo_podio,
                            tipo_documento: podio.persona.tipo_documento,
                            numero_documento: podio.persona.numero_documento,
                            nombre: `${podio.persona.nombre} ${podio.persona.apellido}`
                        }
                    }

                })

                setheaders([
                    "Tipo de Podio",
                    "Tipo de Documento",
                    "Número de Documento",
                    "Nombre",
                    "Acciones",
                ])

                setData(newData)

            })
            .catch(error => {
                console.log(error);
            });

    }, [])

    useEffect(() => {

        axios.get('http://127.0.0.1:8000/api/docum_niños')
            .then(response => {
                setNiños(response.data)
            })
            .catch(error => {
                console.error(error)
            })

    }, [])

    const cambioPodio = (event, id, index_data) => {

        const selectedValue = event.target.value
        const formData = new FormData()

        formData.append('persona', selectedValue)

        axios.put(`http://127.0.0.1:8000/api/podios/${id}/edit`, formData)
            .then(response => {
                setData(prevData =>
                    prevData.map((item, index) =>
                        index_data === index ? {
                            id: response.data.id,
                            info: {
                                tipo_podio: response.data.tipo_podio,
                                tipo_documento: response.data.persona.tipo_documento,
                                numero_documento: response.data.persona.numero_documento,
                                nombre: `${response.data.persona.nombre} ${response.data.persona.apellido}`
                            }
                        } : item
                    )
                );
            })

    }

    const edit = (index_data) => {
        setEditing(true)
        setLast(data[index_data])
    }

    const handleGuardar = () => {
        setEditing(false)
        setLast(null)
    }

    const handleCancelar = (index_data) => {

        const formData = new FormData()

        formData.append('persona', last.info.numero_documento)

        if (last.info.numero_documento !== data[index_data].info.numero_documento) {
            axios.put(`http://127.0.0.1:8000/api/podios/${last.id}/edit`, formData)
                .then(response => {
                    setData(prevData =>
                        prevData.map((item, index) =>
                            index_data === index ? {
                                id: response.data.id,
                                info: {
                                    tipo_podio: response.data.tipo_podio,
                                    tipo_documento: response.data.persona.tipo_documento,
                                    numero_documento: response.data.persona.numero_documento,
                                    nombre: `${response.data.persona.nombre} ${response.data.persona.apellido}`
                                }
                            } : item
                        )
                    );
                })
        }

        setLast(null)
        setEditing(false)
    }

    return (
        <>
            <ToastContainer />
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-6 align-self-center">
                            <h2>{props.title}</h2>
                        </div>
                    </div>
                </div>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ?
                            <tr>
                                <td colSpan={headers.length + 1}>No hay regitros para mostrar.</td>
                            </tr>
                            :
                            data.map((element, index) => (
                                <tr key={element.id}>
                                    <td>{element.info.tipo_podio}</td>
                                    <td>{element.info.tipo_documento}</td>
                                    {
                                        editing ?
                                            (
                                                <td>
                                                    <select id="persona" value={element.info.numero_documento} onChange={(e) => cambioPodio(e, element.id, index)}>
                                                        {
                                                            niños.map((niño, index) => (
                                                                <option key={index} value={niño.persona_id}>
                                                                    {niño.persona_id}
                                                                </option>
                                                            ))
                                                        }
                                                    </select>
                                                </td>
                                            )
                                            :
                                            (
                                                <td>{element.info.numero_documento}</td>
                                            )
                                    }
                                    <td>{element.info.nombre}</td>
                                    <td>
                                        {
                                            editing ?
                                                (
                                                    <div className='actions'>
                                                        <Link
                                                            className="save"
                                                            onClick={() => handleGuardar(element.id, index)}
                                                        >
                                                            <FaSave />
                                                        </Link>
                                                        <Link
                                                            className="cancel"
                                                            onClick={() => handleCancelar(index)}
                                                        >
                                                            <FaTimes />
                                                        </Link>
                                                    </div>
                                                )
                                                :
                                                (
                                                    <div className='actions'>
                                                        <Link
                                                            className="info"
                                                            onClick={() => edit(index)}
                                                        >
                                                            <FaEdit />
                                                        </Link>
                                                    </div>
                                                )
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )

}

TablaPodios.propTypes = {
    title: PropTypes.string.isRequired,

}

export default TablaPodios