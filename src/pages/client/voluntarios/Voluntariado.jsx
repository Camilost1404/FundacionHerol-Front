import niños from '../../../assets/images/herol2.jpg'
import voluntariado from '../../../assets/images/voluntariado.jpg'
import FormVoluntarios from '../../../components/client/voluntario/FormVoluntarios'
import './Voluntariado.css'

const Voluntariado = () => {
    return (
        <>
            <div className='imgheader'>
                <img src={niños} alt="Imagen" />
            </div>
            <div className='mt-4'>
                <h2 className='titulo'>Voluntarios</h2>
                <div className='d-flex flex-lg-row flex-column info-voluntario'>
                    <div className='imagen-voluntario'>
                        <img className='imgvoluntariado' src={voluntariado} alt="Imagen" />
                    </div>
                    <div className='container-info-voluntario'>
                        <div className="items">
                            <h3>Deporte</h3>
                            <p>Buscamos gente entusiasta que quiera ser parte de nuestros programas deportivos. Algunas oportunidades las puedes encontrar en voluntariados.org</p>
                        </div>
                        <div className="items">
                            <h3>Educación</h3>
                            <p>Nuestros programas de nivelación académica necesitan de profesores en todas las disciplinas.</p>
                        </div>
                        <div className="items">
                            <h3>Trabajo Social</h3>
                            <p>Estamos trabajando en las poblaciones más desfavorecidas, y necesitamos asesoría, si eres un experto y quieres colaborar, contáctanos.</p>
                        </div>
                        <div className="items">
                            <h3>Nutrición</h3>
                            <p>la alimentación es una de nuestras grandes preocupaciones. Buscamos nutricionistas que tengan el deseo de colaborar con nosotros.</p>
                        </div>
                    </div>
                </div>

                <h2 className='titulo'>Postúlate</h2>

                <FormVoluntarios />

            </div>
        </>


    )
}

export default Voluntariado
