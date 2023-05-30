import { useEffect, useState } from 'react';
import '../Tablas.css'
import PropTypes from 'prop-types'

function TablaDonaciones(props) {
    const [currentPage, setCurrentPage] = useState(1);
    const elementsPerPage = 10;
    const totalPages = Math.ceil(props.data.length / elementsPerPage);
    const indexOfLastRecord = currentPage * elementsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - elementsPerPage;
    const [currentRecords, setCurrentRecords] = useState([]);

    useEffect(() => {
        setCurrentRecords(props.data.slice(indexOfFirstRecord, indexOfLastRecord))
    }, [indexOfFirstRecord, indexOfLastRecord, props.data])

    return (
        <>
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
                                    <td>{ data.numero_documento }</td>
                                    <td>{ data.nombre }</td>
                                    <td>{ data.apellido }</td>
                                    <td>{ data.email }</td>
                                    <td>{ new Date(data.fecha).toLocaleString("es-ES", { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }) }</td>
                                    <td>{ data.valor.toLocaleString(data.moneda==='cop'? 'es-CO' : 'en-US') }</td>
                                    <td>{ data.moneda.toUpperCase() }</td>
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

TablaDonaciones.propTypes = {
    data: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    headers: PropTypes.array.isRequired,
}

export default TablaDonaciones