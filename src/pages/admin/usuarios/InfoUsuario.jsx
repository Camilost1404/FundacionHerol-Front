import { useParams } from "react-router-dom";
import InformacionUsuario from "../../../components/admin/usuarios/InformacionUsuario"
import { useEffect, useState } from "react";
import axios from "axios";

function InfoUsuario() {

    const { id } = useParams();
    const [data, setData] = useState(null)

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/user_esp?id_user=${id}`)
            .then(response => {
                const data = response.data

                if (data.last_login) {
                    const fecha = new Date(data.last_login)
                    const formattedDate = fecha.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
                    const formattedTime = fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

                    data.last_login = `${formattedDate} ${formattedTime}`
                }
                else {
                    data.last_login = 'No ha ingresado'
                }

                setData(data)
            })
            .catch(error => {
                console.error(error)
            })
    }, [id])

    return (
        <>
            <div className="admin-content-page">
                {data && (
                    <InformacionUsuario data={data} />
                )}
            </div>
        </>
    )
}

export default InfoUsuario