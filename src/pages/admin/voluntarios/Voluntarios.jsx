import { useEffect, useState } from "react";
import TablaVoluntarios from "../../../components/admin/voluntarios/TablaVoluntarios"
import axios from "axios";

function Voluntarios() {

    const [data, setData] = useState([]);
    const [headers, setheaders] = useState([]);

    useEffect(() => {

        axios.get('http://127.0.0.1:8000/api/ver_voluntarios')
            .then(response => {
                let responseData = response.data;

                const newData = responseData.map((voluntario) => {
                    const { persona, estado, ...resto } = voluntario;
                    const nuevoVoluntario = { ...resto, data: { ...persona, estado: estado ? 'Aprobado' : 'En espera' } };

                    nuevoVoluntario.data['edad'] = calcular(voluntario.persona.fecha_nacimiento)
                    delete nuevoVoluntario.data.fecha_nacimiento;

                    return nuevoVoluntario
                })

                newData.sort((a, b) => a.id - b.id);

                setheaders([
                    "Tipo de Documento",
                    "Número de Documento",
                    "Nombre",
                    "Apellido",
                    "Estado",
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
                <TablaVoluntarios
                    title="Información Voluntarios"
                    headers={headers}
                    data={data}
                />
            </div>
        </>
    )
}

export default Voluntarios