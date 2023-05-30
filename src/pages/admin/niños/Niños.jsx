import { useEffect, useState } from "react";
import axios from "axios";
import TablaNiños from "../../../components/admin/niño/TablaNiños";

function Niños() {

    const [data, setData] = useState([]);
    const [headers, setheaders] = useState([]);

    useEffect(() => {

        axios.get('http://127.0.0.1:8000/api/ver_niños/')
            .then(response => {
                let responseData = response.data;

                const newData = responseData.map((niño) => {
                    const { persona, ...resto } = niño;
                    const nuevoNiño = { ...resto, data: persona };

                    nuevoNiño.data['edad'] = calcular(niño.persona.fecha_nacimiento)

                    delete nuevoNiño.data.fecha_nacimiento;

                    return nuevoNiño

                })

                newData.sort((a, b) => a.id - b.id);

                setheaders([
                    "Tipo de Documento",
                    "Número de Documento",
                    "Nombre",
                    "Apellido",
                    "Edad",
                    "Acciones",
                ])

                setData(newData)
            })
            .catch(error => {
                console.log(error);
            });

    }, [])

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
                <TablaNiños
                    title="Información Niños"
                    headers={headers}
                    data={data}
                />
            </div>
        </>
    )
}

export default Niños