import { useState } from "react";
import './FormLogin.css'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function FormLogin() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {

        event.preventDefault();

        const formData = new FormData();

        formData.append('email', username)
        formData.append('password', password)

        axios.post('http://127.0.0.1:8000/api/token/', formData)
            .then(response => {
                console.log(response)
                localStorage.setItem('token', response.data.access)
                localStorage.setItem('refresh', response.data.refresh)
                window.location.reload()
            })
            .catch(error => {
                console.error(error)
                toast.error('Usuario o contraserña incorrectos', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
                setUsername('')
                setPassword('')
            })
    };

    return (
        <>
            <ToastContainer />
            <form onSubmit={handleSubmit} className="login-form">
                <div>
                    <label htmlFor="username">Email:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button type="submit">Acceder</button>
            </form>
        </>
    )
}

export default FormLogin