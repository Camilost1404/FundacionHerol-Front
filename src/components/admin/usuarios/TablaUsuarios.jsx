import { useEffect, useState } from 'react';
import PropTypes from 'prop-types'

import '../Tablas.css'
import { FaMinus, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function TablaUsuarios(props) {
    const [currentPage, setCurrentPage] = useState(1);
    const elementsPerPage = 10;
    const totalPages = Math.ceil(props.data.length / elementsPerPage);
    const indexOfLastRecord = currentPage * elementsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - elementsPerPage;
    const [currentRecords, setCurrentRecords] = useState([]);

    useEffect(() => {
        setCurrentRecords(props.data.slice(indexOfFirstRecord, indexOfLastRecord))
    }, [indexOfFirstRecord, indexOfLastRecord, props.data])


    const [showUndo, setShowUndo] = useState(false);
    const [timerId, setTimerId] = useState(null);
    const [prevData, setPrevData] = useState([])

    const eliminarNiño = (id) => {

        setPrevData(props.data)

        setCurrentRecords(props.data.filter(niño => niño.id !== parseInt(id)).slice(indexOfFirstRecord, indexOfLastRecord))

        // Se muestra el mensaje de deshacer y se establece un temporizador para ocultarlo después de 5 segundos
        setShowUndo(true);

        const idTimeOut = setTimeout(() => {

            setShowUndo(false);
            axios.delete(`http://127.0.0.1:8000/api/eliminar_user?id_user=${id}`)
                .then(() => {
                    setTimerId(null)
                    toast.success('Registro Eliminado', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                    });
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

            setTimerId(null)

        }, 5000);

        setTimerId(idTimeOut);
    }

    const undoDelete = () => {
        // Se cancela el temporizador para ocultar el mensaje de deshacer
        clearTimeout(timerId);

        setTimerId(null);
        setShowUndo(false);

        // Se vuelve al estado anterior
        // Esta vez no se usa Axios porque la acción ya se realizó y no hay nada que deshacer en la base de datos
        // Simplemente se vuelve al estado anterior de la lista de items
        setCurrentRecords(prevData.slice(indexOfFirstRecord, indexOfLastRecord));
        setPrevData([])
    };

    return (
        <>
            <ToastContainer />
            {showUndo && (
                <div className="undo-message">
                    Eliminando Registro... <button onClick={undoDelete}>Deshacer</button>
                </div>
            )}
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-6 align-self-center">
                            <h2>{props.title}</h2>
                        </div>
                        <div className="col-sm-6">
                            <Link to='agregar' className="btn btn-success btn-agregar"><FaPlus /> Añadir</Link>
                        </div>
                    </div>
                </div>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            {props.headers.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.length === 0 ?
                            <tr>
                                <td colSpan={props.headers.length + 1}>No hay regitros para mostrar.</td>
                            </tr>
                            :
                            currentRecords.map((data) => (
                                <tr key={data.id}>
                                    <td>
                                        {data.first_name}
                                    </td>
                                    <td>
                                        {data.last_name}
                                    </td>
                                    <td>
                                        {data.email}
                                    </td>
                                    <td>
                                        {data.last_login}
                                    </td>
                                    <td>
                                        {
                                            data.is_superuser ?
                                                'Sí'
                                                :
                                                'No'
                                        }
                                    </td><td>
                                        {
                                            data.is_active ?
                                                'Sí'
                                                :
                                                'No'
                                        }
                                    </td>
                                    <td>
                                        <div className='actions'>
                                            <Link
                                                className="info"
                                                to={`informacion/${data.id}`}
                                            >
                                                <FaPlus />
                                            </Link>
                                            <a className="delete" onClick={() => eliminarNiño(data.id)} style={{ cursor: 'pointer' }}><FaMinus /></a>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div className="clearfix">
                    <div className="hint-text">
                        Mostrando {indexOfFirstRecord + 1} - {Math.min(indexOfLastRecord, props.data.length)} de {props.data.length} Datos
                    </div>
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Anterior</button>
                        </li>
                        {Array(totalPages).fill().map((_, index) => (
                            <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Siguiente</button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

TablaUsuarios.propTypes = {
    data: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    headers: PropTypes.array.isRequired,
}


export default TablaUsuarios