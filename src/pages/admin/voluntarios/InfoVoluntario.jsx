import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InformacionVoluntario from "../../../components/admin/voluntarios/InformacionVoluntario";

function InfoVoluntario() {
    const { id } = useParams();
    const [data, setData] = useState(null)

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/voluntario_esp?id_voluntario=${id}`)
            .then(response => {
                const responseData = response.data

                const data = {
                    id: responseData.id,
                    estado: responseData.estado,
                    experiencia: responseData.experiencia,
                    ...responseData.persona
                }

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
                    <InformacionVoluntario data={data} />
                )}
            </div>
        </>
    )
}

export default InfoVoluntario