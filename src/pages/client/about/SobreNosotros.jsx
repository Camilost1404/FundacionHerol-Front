import { useState, useEffect } from 'react';
import './SobreNosotros.css';
import herol1 from '../../../assets/images/herol1.jpg';
import herol2 from '../../../assets/images/herol2.jpg';
import herol3 from '../../../assets/images/herol3.jpg';

function SobreNosotros() {
    const [scrollPos, setScrollPos] = useState(0);

    useEffect(() => {
        function easyPeasyParallax() {
            setScrollPos(window.pageYOffset);
            document.getElementById('banner').style.backgroundPosition = `50% ${-scrollPos / 4}px`;
            document.getElementById('bannertext').style.marginTop = `${scrollPos / 4}px`;
            document.getElementById('bannertext').style.opacity = `${1 - scrollPos / 250}`;
        }

        window.addEventListener('scroll', easyPeasyParallax);
        return () => {
            window.removeEventListener('scroll', easyPeasyParallax);
        };
    }, [scrollPos]);



    return (

        <div className='container-nosotros'>

            <div id="banner">
                <div id="bannertext" >
                    <h1 className='fundacion-tittle'>Fundación Herol</h1>
                    <p>Organización sin ánimo de lucro</p>
                </div>
            </div>
            <div id="content">
                <h2 className='sobre-nosotros tittle-centrado'>Sobre nosotros</h2>
                <p>
                    En la Fundación Herol, construimos valores y fomentamos la transformación social. Somos una organización sin fines de lucro que promueve el bienestar y desarrollo de niños, adolescentes y sus comunidades en situaciones vulnerables a través del deporte y la formación integral. Creemos en el poder del fútbol como herramienta de transformación y por eso realizamos talleres socio-deportivos en los barrios de Calamar y Guayabal desde hace seis años, inspirando e impactando la salud física, emocional y mental de las comunidades en Villavicencio.
                </p>
                <p>
                    Tu generosidad nos ayuda a jugar como los grandes. Cuantas más donaciones recibimos, más familias felices podemos ayudar. Nuestro enfoque en el fútbol va más allá del juego en sí, pues fomentamos valores como el respeto, la disciplina y el aprovechamiento del tiempo libre, generando hábitos positivos en los niños y adolescentes que impactan sus vidas y las de su entorno. ¡Únete a nosotros y juntos continuemos transformando realidades!
                </p>
            </div>

            <div className='content-mision-vision'>
                <div className='content-mision'>
                    <div className='mision'>
                        <img src={herol1} className="img-mision" alt="..." />
                        <div className="mision-text">
                            <h2 className='tittle-centrado'>Misión</h2>
                            <p>En Fundación Herol, nuestra misión es construir valores y fomentar la transformación social en niños, adolescentes y sus comunidades en situaciones vulnerables a través del deporte y la formación integral.</p>
                        </div>
                    </div>
                </div>
                <div className='content-vision'>
                    <div className='vision'>
                        <img src={herol2} className="img-vision" alt="..." />
                        <div className="vision-text">
                            <h2 className='tittle-centrado'>Visión</h2>
                            <p>Nuestra visión es continuar transformando realidades en las comunidades vulnerables de Villavicencio a través de talleres socio-deportivos y fomentando valores como el respeto, la disciplina y el aprovechamiento del tiempo libre.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='content-directivos card-container'>

                <div className='content-directivos-tittle'>
                    <h2>Directivos</h2>
                    <h3>Fundación Herol</h3>
                </div>

                <div className='card-container'>
                    <div className="card-nosotros">
                        <div className="card-nosotros-info">
                            <div className="card-avatar">
                                {/* <img src={herol1} class="card-avatar" alt="..." /> */}
                            </div>
                            <div className="card-title">Pepito Perez</div>
                            <div className="card-subtitle">CEO &amp; Co-Founder</div>
                        </div>
                    </div>

                    <div className="card-nosotros">
                        <div className="card-nosotros-info">
                            <div className="card-avatar">
                                <img src={herol3} className="card-avatar" alt="..." />
                            </div>
                            <div className="card-title">Joselito Ramirez</div>
                            <div className="card-subtitle">Fundador</div>
                        </div>
                    </div>

                    <div className="card-nosotros">
                        <div className="card-nosotros-info">
                            <div className="card-avatar">
                                {/* <img src={herol1} class="card-avatar" alt="..." /> */}
                            </div>
                            <div className="card-title">Hernezto Chaves</div>
                            <div className="card-subtitle">Director Ejecutivo</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default SobreNosotros;