
import Buscar from "./components/Buscar";
import Principal from './components/Principal.jsx'
import FormCriarEditar from './components/FormCriarEditar.jsx'
import BuscarPorId from './components/BuscarPorId.jsx'
import Deletar from './components/Deletar'
import React from "react";

import { BrowserRouter, Route, Routes } from 'react-router-dom';



function App(){
    return (
      <main>
      <BrowserRouter>
          <Routes>
              <Route index path="/" element={<Principal />} />
              <Route  path="/buscar" element={<Buscar />} />
              <Route  path="/buscarporid" element={<BuscarPorId />} />
              <Route  path="/formcriareditar" element={<FormCriarEditar />} />
              <Route  path="/deletar" element={<Deletar />} /> 
          </Routes>
      </BrowserRouter>
  </main>
);
}
    
export default App;