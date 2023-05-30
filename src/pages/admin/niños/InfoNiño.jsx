import { useParams } from "react-router-dom"
import InformacionNiño from "../../../components/admin/niño/InformacionNiño"
import { useEffect, useState } from "react";
import axios from "axios";

function InfoNiño() {

    const { id } = useParams();
    const [data, setData] = useState(null)

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/niño_esp?id_niño=${id}`)
            .then(response => {
                const data = response.data
                data['edad'] = calcular(data.fecha_nacimiento)
                setData(data)
            })
            .catch(error => {
                console.error(error)
            })
    }, [id])

    const calcular = (fecha) => {
        const fechaActual = new Date();
        const fechaNac = new Date(fecha);
        const diff = fechaActual.getTime() - fechaNac.getTime();
        const edadCalculada = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));

        return edadCalculada;
    };

    return (
        <>
            <div className="admin-content-page">
                {data && (
                    <InformacionNiño data={data} />
                )}
            </div>
        </>
    )
}

export default InfoNiño