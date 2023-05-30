import Logo from '../../assets/images/herol-logo.png'
import './HomeAdmin.css'

function HomeAdmin() {
    return (
        <>
            <div className="admin-content-page">
                <div className='fondo'>
                    <div className='home-admin-content'>
                        <img src={Logo} alt="Logo Fundación Herol" className='logo-home-admin' />
                        <h2 className='title-home-admin'>Bienvenido al Panel Administrador de la Fundación Herol</h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeAdmin