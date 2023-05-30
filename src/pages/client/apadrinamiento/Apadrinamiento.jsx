import "./Apadrinamiento.css";
import apadrinamientoNiños from '../../../assets/images/apadrinamientoNiños.jpg'
import apadrinamientoPadrino from '../../../assets/images/apadrinamientoPadrino.jpg'
import apadrinamientoEmpresarial from '../../../assets/images/apadrinamientoEmpresarial.jpg'
import apadrinamientoInternacional from '../../../assets/images/apadrinamientoInternacional.jpg'
import { useState } from "react";


const Apadrinamiento = () => {

    const [planSeleccionado, setPlanSeleccionado] = useState('padrino');

    const handlePlanClick = (plan) => {
        setPlanSeleccionado(plan);
    };

    return (
        <>
            <img className='tituloimg' src={apadrinamientoNiños} alt="apadrinamiento niños" />
            <h1 className='titulo-apadrinado'>Convíertete en Padrino</h1>
            <div className='huevos'>
                <div className='huevo huevo1'>
                    <h4 className='huevoTexto'>El apadrinamiento de niños es un programa que permite a personas de todo el mundo apoyar a niños que viven en situaciones difíciles, como la pobreza, la falta de acceso a la educación y la falta de atención médica.</h4>
                </div>
                <div className='huevo huevo2'>
                    <h4 className='huevoTexto'>Al apadrinar a un niño, proporcionas apoyo financiero mensual para cubrir sus necesidades básicas, como comida, ropa y educación.</h4>
                </div>
                <div className='huevo huevo3'>
                    <h4 className='huevoTexto'>Al apadrinar a un niño, estás contribuyendo a hacer del mundo un lugar mejor y más justo para todos. Al ayudar a un niño en necesidad, estás haciendo una diferencia real en el mundo.</h4>
                </div>
            </div>
            <div className='planes-container'>
                <div className={`planes planPadrino  ${planSeleccionado === 'padrino' ? 'selected' : ''}`} onClick={() => handlePlanClick('padrino')}>
                    <h4 className='tituloPlan'>Plan Padrino</h4>
                    <img src={apadrinamientoPadrino} alt="apadrinamiento niños" />
                </div>
                <div className={`planes planEmpresarial  ${planSeleccionado === 'empresarial' ? 'selected' : ''}`} onClick={() => handlePlanClick('empresarial')}>
                    <h4 className='tituloPlan'>Plan Empresarial</h4>
                    <img src={apadrinamientoEmpresarial} alt="apadrinamiento niños" />
                </div>
                <div className={`planes planInternacional  ${planSeleccionado === 'internacional' ? 'selected' : ''}`} onClick={() => handlePlanClick('internacional')}>
                    <h4 className='tituloPlan'>Plan Internacional</h4>
                    <img src={apadrinamientoInternacional} alt="apadrinamiento niños" />
                </div>
            </div>
            <p>{planSeleccionado}</p>
            <h2 className='tituloForm'>Regístrate y alegra a un niño</h2>

        </>
    )
}

export default Apadrinamiento
