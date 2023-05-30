import './Ubicacion.css'
import mapa from '../../../assets/images/mapa-de-colombia-para-colorear.png'
import { useState } from 'react';

const Ubicacion = () => {
    const [activeSection, setactiveSection] = useState('situacion');

    const activateSection = (sectionId) => {
        setactiveSection(sectionId);
    }
    return (
        <>
            <h1 className='titulo mt-4'>Donde nos encontramos</h1>
            <div className='d-flex flex-lg-row flex-column info-ubicacion'>
                <div className='mapa-container'>
                    <img className='mapaimg' src={mapa} alt="mapa colmbia" />
                </div>
                <div className='info-container col-lg-7'>
                    <div className='botones-info'>
                        <button className='boton-info-ubicacion' onClick={() => activateSection('situacion')}>Situacion</button>
                        <button className='boton-info-ubicacion' onClick={() => activateSection('beneficiados')}>Beneficiados</button>
                    </div>

                    <div id='situacion' className='situacion' style={{ display: activeSection === 'situacion' ? 'block' : 'none' }}>
                        <h2>Villavicencio - Meta</h2>
                        <p>Estas comunidades a menudo se enfrentan a desafíos socioeconómicos significativos, lo que puede limitar las oportunidades de desarrollo y bienestar de sus residentes más jóvenes. Creemos firmemente en el poder transformador de la educación y el acceso igualitario a oportunidades para todos los niños. Al proporcionarles apoyo académico, actividades extracurriculares enriquecedoras y recursos necesarios, estamos trabajando para romper el ciclo de desigualdad y ofrecerles un camino hacia un futuro mejor. Nuestro compromiso con los niños de las comunas 3 y 4 se basa en la creencia de que cada niño merece la oportunidad de alcanzar su máximo potencial y contribuir positivamente a su comunidad y sociedad en general.</p>
                    </div>
                    <div id='beneficiados' className='beneficiados' style={{ display: activeSection === 'beneficiados' ? 'block' : 'none' }}>
                        <h2>Beneficiados</h2>
                        <div className='cifras'>
                            <div className='comunidades'>
                                <h3>Comunidades Impactadas</h3>
                                <p>2</p>
                            </div>
                            <div className='niñosapadrinados'>
                                <h3>Niños Apadrinados</h3>
                                <p>80</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <h2 className='text-center my-4'>Localizanos en el mapa</h2>
            <div className="gmap_canvas">
                <iframe className="gmap_iframe" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Villavicencio&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                </iframe>
            </div>
        </>
    )
}

export default Ubicacion
