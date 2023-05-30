import TablaUsuarios from "../../../components/admin/usuarios/TablaUsuarios";
import { useEffect, useState } from "react";
import axios from "axios";

function Usuarios() {

    const [data, setData] = useState([]);
    const [headers, setheaders] = useState([]);

    useEffect(() => {

        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                let responseData = response.data;

                responseData.map((usuario) => {

                    if (usuario.last_login) {
                        const fecha = new Date(usuario.last_login)
                        const formattedDate = fecha.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
                        const formattedTime = fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

                        usuario.last_login = `${formattedDate} ${formattedTime}`
                    }
                    else {
                        usuario.last_login = 'No ha ingresado'
                    }

                })

                setheaders([
                    "Nombre",
                    "Apellido",
                    "Email",
                    "Último Acceso",
                    "Super Admin",
                    "Activo",
                    "Acciones",
                ])

                setData(responseData)
            })
            .catch(error => {
                console.log(error);
            });

    }, [])

    return (
        <>
            <div className="admin-content-page">
                <TablaUsuarios
                    title="Información Usuarios"
                    headers={headers}
                    data={data}
                />
            </div>
        </>
    )

}

export default Usuarios