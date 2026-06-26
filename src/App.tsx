import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importando as páginas
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard/Dashboard'; 
import DashboardHome from './Pages/Dashboard/DashboardHome';
import Talhoes from './Pages/Dashboard/Talhoes';
import Culturas from './Pages/Dashboard/Culturas';
import Insumos from './Pages/Dashboard/Insumos';
import Maquinas from './Pages/Dashboard/Maquinas';
import Atividades from './Pages/Dashboard/Atividades';
import Gastos from './Pages/Dashboard/Gastos';
import Lucro from './Pages/Dashboard/Lucro';
import SobreNos from './Pages/SobreNos';
import Home from './Pages/Home';
import CadTalhoes from './Pages/Dashboard/CadTalhoes';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/sobre-nos" element={<SobreNos />} />
       
        <Route path="/login" element={<Login />} />
        
        
        <Route path="/dashboard" element={<Dashboard />}>
          
          
          <Route index element={<DashboardHome />} />
          
          
          <Route path="talhoes" element={<Talhoes />} />
          <Route path="CadTalhoes" element={<CadTalhoes />} /> 
          <Route path="maquinas" element={<Maquinas />} />
          <Route path="culturas" element={<Culturas />} />
          <Route path="insumos" element={<Insumos />} />
          <Route path="atividades" element={<Atividades />} />
          <Route path="lucro" element={<Lucro />} />
          <Route path="gastos" element={<Gastos />} />
          
          
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;