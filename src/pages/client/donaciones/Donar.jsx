import FormDonar from "../../../components/client/donaciones/FormDonar"
import Deporte from '../../../assets/images/futbol-americano.png'
import Comida from '../../../assets/images/comida.png'
import Educacion from '../../../assets/images/educacion.png'

import './Donar.css'

function Donar() {
    return (
        <>
            <div className='cartas'>
                <div className='deporte carta'>
                    <img className='imgcarta' src={Deporte} alt="" />
                    <p>Tu donación ayuda a desarrollar habilidades atléticas</p>
                </div>
                <div className='educación carta'>
                    <img className='imgcarta' src={Educacion} alt="" />
                    <p>Al donar, estás invirtiendo en el futuro de los jóvenes, abriendo oportunidades</p>
                </div>
                <div className='comida carta'>
                    <img className='imgcarta' src={Comida} alt="" />
                    <p>Con tu generosidad, podremos proporcionar alimentos nutritivos</p>
                </div>

            </div>
            <FormDonar />
        </>
    )
}

export default Donar