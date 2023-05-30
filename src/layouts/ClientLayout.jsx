import { Outlet } from 'react-router-dom'
import './ClientLayout.css'
import Navbar from '../components/client/NavBar'
import Footer from '../components/client/Footer'

function ClientLayout() {
    return (
        <div className="client-main">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default ClientLayout