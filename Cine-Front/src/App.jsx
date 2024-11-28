import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./paginas/Login";
import Peliculas from "./paginas/Peliculas";
import Pagina3 from "./paginas/Pagina3";
import Menu from "./paginas/Menu";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/peliculas" element={<Peliculas />} />
        <Route path="/pagina3" element={<Pagina3 />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </Router>
  );
}

export default App;
