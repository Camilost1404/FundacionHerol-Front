import Logo from '../../../assets/images/herol-logo.png'
import FormLogin from '../../../components/admin/login/FormLogin'
import './Login.css'

function Login() {
    return (
        <div className="login-wrapper">
            <div className='container-login'>
                <div className="login-header">
                    <img src={Logo} alt="Logo" />
                    <h2>Inicio de sesión</h2>
                </div>
                <FormLogin />
            </div>
        </div>
    )
}

export default Login