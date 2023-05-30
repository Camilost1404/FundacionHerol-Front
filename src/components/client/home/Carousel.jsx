import { useEffect, useRef } from 'react';
import './Carousel.css';
import herol1 from '../../../assets/images/herol1.jpg';
import herol2 from '../../../assets/images/herol2.jpg';
import herol3 from '../../../assets/images/herol3.jpg';

const Carousel = () => {
    const intervalRef = useRef(null);

    useEffect(() => {
        // avanzar automáticamente al siguiente slide cada 5 segundos
        intervalRef.current = setInterval(() => {
            const nextButton = document.querySelector('#carouselExampleIndicators .carousel-control-next');
            nextButton.click();
        }, 5000);

        // Eliminar el intervalo al desmontar el componente
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <div className="container-sm">
            <div id="carouselExampleIndicators" className="carousel slide">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner" style={{ transition: 'transform 0.5s ease-in-out' }}>
                    <div className="carousel-item active">
                        <img src={herol1} className="w-100 img-fluid" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={herol2} className="w-100 img-fluid" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={herol3} className="w-100 img-fluid" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};

export default Carousel;
