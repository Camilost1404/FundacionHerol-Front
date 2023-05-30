import "./Cards.css";
import Niño from '../../../assets/images/niño.jpg';
import PlanRegular from '../../../assets/images/planregular.jpg';
import PlanEmpresarial from '../../../assets/images/planempresarial.jpg';
import PlanInternacional from '../../../assets/images/planinternacional.jpg';
import { useEffect, useState } from "react";
import axios from "axios";

function Cards() {

    const [cardsInfo, setCardsInfo] = useState([])

    useEffect(() => {

        const cards = [
            {
                id: 1,
                title: 'Jugador',
                subtitle: 'Mejor Rendimiento',
                podio: 'Podio Niño',
                image: Niño
            },
            {
                id: 2,
                title: 'Donador',
                subtitle: 'Top Donante',
                podio: 'Podio Padrino',
                image: PlanRegular
            },
            {
                id: 3,
                title: 'Empresa',
                subtitle: 'Top Empresa',
                podio: 'Podio Padrino Empresa',
                image: PlanEmpresarial
            },
            {
                id: 4,
                title: 'Extranjero',
                subtitle: 'Top Donante',
                podio: 'Podio Padrino Extranjero',
                image: PlanInternacional
            }
        ]

        axios.get('http://127.0.0.1:8000/api/podios')
            .then(response => {
                const updatedCardsInfo = cards.map(card => {
                    const podioUpdate = response.data.find(podio => podio.tipo_podio === card.podio);
                    if (podioUpdate) {
                        return {
                            ...card,
                            title: `${podioUpdate.persona.nombre} ${podioUpdate.persona.apellido}`,
                            image: `http://127.0.0.1:8000/${podioUpdate.persona.foto}`,
                        };
                    }
                    return card;
                });

                setCardsInfo(updatedCardsInfo)

            })
            .catch(error => {
                console.error(error)
            })
    }, [])


    return (

        <>
            <h2 className="tittle-podios">Podios</h2>
            <div className='cards-container'>
                <section className="cards">
                    {cardsInfo.map(card => (
                        <article className="card card--1" key={card.id}>
                            <div className="card__info-hover"></div>
                            <div className="card__img" style={{ backgroundImage: `url(${card.image})` }}></div>
                            <a href="#" className="card_link">
                                <div className="card__img--hover" style={{ backgroundImage: `url(${card.image})` }}></div>
                            </a>
                            <div className="card__info">
                                <span className="card__category">{card.subtitle}</span>
                                <h3 className="card__title">{card.title}</h3>
                                <span className="card__by">
                                    Podio <span className="card__author" title="author">Del mes</span>
                                </span>
                            </div>
                        </article>
                    ))}
                </section>
            </div>
        </>
    );
}

export default Cards;