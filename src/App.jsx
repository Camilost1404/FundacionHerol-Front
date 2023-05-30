import { BrowserRouter, Route, Routes } from "react-router-dom"
import AdminLayout from "./layouts/AdminLayout"
import HomeAdmin from "./pages/admin/HomeAdmin"
import Niños from "./pages/admin/niños/Niños"
import AgregarNiño from "./pages/admin/niños/AgregarNiño"
import Voluntarios from "./pages/admin/voluntarios/Voluntarios"
import InfoNiño from "./pages/admin/niños/InfoNiño"
import Podios from "./pages/admin/podios/Podios"
import InfoVoluntario from "./pages/admin/voluntarios/InfoVoluntario"
import ClientLayout from "./layouts/ClientLayout"
import HomeClient from "./pages/client/home/HomeClient"
import SobreNosotros from "./pages/client/about/SobreNosotros"
import Ubicacion from "./pages/client/ubicacion/Ubicacion"
import Voluntariado from "./pages/client/voluntarios/Voluntariado"
import Contactanos from "./pages/client/contactanos/Contactanos"
import Apadrinamiento from "./pages/client/apadrinamiento/Apadrinamiento"
import Usuarios from "./pages/admin/usuarios/Usuarios"
import AgregarUsuario from "./pages/admin/usuarios/AgregarUsuario"
import InfoUsuario from "./pages/admin/usuarios/InfoUsuario"
import Donar from "./pages/client/donaciones/Donar"
import PagoExitoso from "./pages/client/pagos/PagoExitoso"
import PagoCancelado from "./pages/client/pagos/PagoCancelado"
import Donaciones from "./pages/admin/donaciones/Donaciones"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/admin"
            element={<AdminLayout />}
          >
            <Route index element={<HomeAdmin />} />
            <Route
              path="niños"
            >
              <Route index element={<Niños />} />
              <Route path="agregar" element={<AgregarNiño />} />
              <Route path="informacion/:id" element={<InfoNiño />} />
            </Route>
            <Route
              path="voluntarios"
            >
              <Route index element={<Voluntarios />} />
              <Route path="informacion/:id" element={<InfoVoluntario />} />
            </Route>
            <Route
              path="podios"
            >
              <Route index element={<Podios />} />
            </Route>
            <Route
              path="donaciones"
            >
              <Route index element={<Donaciones />} />
            </Route>
            <Route
              path="usuarios"
            >
              <Route index element={<Usuarios />} />
              <Route path="agregar" element={<AgregarUsuario />} />
              <Route path="informacion/:id" element={<InfoUsuario />} />
            </Route>
          </Route>

          <Route
            path="/"
            element={<ClientLayout />}
          >
            <Route index element={<HomeClient />} />
            <Route path="nosotros" element={<SobreNosotros />} />
            <Route path="ubicacion" element={<Ubicacion />} />
            <Route path="voluntariados" element={<Voluntariado />} />
            <Route path="contactanos" element={<Contactanos />} />
            <Route path="apadrinamiento" element={<Apadrinamiento />} />
            <Route path="dona" element={<Donar />} />

            {/* Pagos */}
            <Route path="pago_exitoso" element={<PagoExitoso />} />
            <Route path="pago_rechazado" element={<PagoCancelado />} />
          </Route>

          {/* <Route path='*' element={} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
