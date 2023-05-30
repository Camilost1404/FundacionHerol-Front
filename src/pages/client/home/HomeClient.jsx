import { Link } from "react-router-dom"
import Carousel from "../../../components/client/home/Carousel"
import './HomeClient.css'
import Cards from "../../../components/client/home/Cards"

function HomeClient() {
    return (
        <>
            <Carousel />
            <div className="section-diagonal">
                <div className="section-1">
                    <div className="sections-container">
                        <h2 className="sections-tittle">Apoya Donando</h2>
                        <p className="sections-p">Aquí podrás apoyar a uno de nuestros niños</p>
                        <Link className="btnn-apoya" to='dona'>Dona</Link>
                    </div>
                </div>

                <section className="sections section-2">
                    <div className="sections-container">
                        <h2 className="sections-tittle">Apoya Apadrinando</h2>
                        <p className="sections-p">Sé un Héroe para un niño</p>
                        <Link className="btnn-apoya" to='apadrinamiento'>Apadrina</Link>
                    </div>
                </section>

                <section className="sections section-3">
                    <div className="sections-container section-3-container">
                        <h2 className="sections-tittle">Apoya siendo voluntario</h2>
                        <p className="sections-p">Ayúdanos a guiar el futuro del país</p>
                        <Link className="btnn-apoya" to='voluntariados'>Voluntariado</Link>
                    </div>
                </section>
            </div>
            <Cards />
        </>
    )
}

export default HomeClient