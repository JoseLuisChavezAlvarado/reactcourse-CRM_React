import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './layput/Layout'
import ClienteEditar from './pages/ClienteEditar'
import ClienteDetalle from './pages/ClienteDetalle'
import ClienteNuevo from './pages/ClienteNuevo'
import Inicio from './pages/Inicio'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/clientes' element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path='nuevo' element={<ClienteNuevo />} />
          <Route path='editar/:id' element={<ClienteEditar />} />
          <Route path=':id' element={<ClienteDetalle />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )

}

export default App