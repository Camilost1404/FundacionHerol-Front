import axios from "axios";
import TablaDonaciones from "../../../components/admin/donaciones/TablaDonaciones"
import { useEffect, useState } from "react";

function Donaciones() {

    const [data, setData] = useState([]);
    const [headers, setheaders] = useState([]);

    useEffect(() => {

        axios.get('http://127.0.0.1:8000/api/ver_donacion/')
            .then(response => {
                let responseData = response.data;

                setheaders([
                    "Número de Documento",
                    "Nombre",
                    "Apellido",
                    "Email",
                    "Fecha Donación",
                    "Valor",
                    "Moneda",
                ])

                console.log(responseData)
                setData(responseData)
            })
            .catch(error => {
                console.log(error);
            });

    }, [])

    return (
        <>
            <div className="admin-content-page">
                <TablaDonaciones
                    title="Información Donaciones"
                    headers={headers}
                    data={data}
                />
            </div>
        </>
    )
}

export default Donaciones