import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import CorpoDaTabela from './components/CorpoDaTabela/CorpoDaTabela'
import Detalhes from './components/detalhes/Detalhes'
import Editar from './components/editar/Editar'
import './index.css'
import Home from './pages/home/Home'
import Registrar from './pages/registrar/Registrar'
import RegistroPorCPF from './pages/registroPorCPF/RegistroPorCPF'
import Registros from './pages/registros/Registros'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter >
      <Routes>
        <Route element={<App/>}>
          <Route path='/' element={<Home />}/>
          <Route path='/registrar' element={<Registrar />}/>
              <Route  path='/registros/editar/:cpf' element={<Editar />} />
              <Route  path='/registros/detalhes/:cpf' element={<Detalhes />} />
        </Route>
        <Route element={<Registros/>}>
          <Route path='/registros' element={<CorpoDaTabela />}/>
          <Route path='/registros/cpf/:cpf' element={<RegistroPorCPF />}/>
        </Route>
          
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
