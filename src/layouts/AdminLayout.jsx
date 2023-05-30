import { Outlet } from "react-router-dom";
import SideBar from "../components/admin/SideBar";

import './AdminLayout.css'
import Login from "../pages/admin/login/Login";

function AdminLayout() {

    const auth = !!localStorage.getItem('token')

    if (!auth) {
        return <Login />;
    }

    return (
        <div className="admin-main">
            <SideBar />
            <section className="admin-content">
                <Outlet />
            </section>
        </div>
    )
}

export default AdminLayout