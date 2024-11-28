import { useState } from "react";
import "./Menu.css";
import { Link, useNavigate } from "react-router-dom";

function App() {
  //   const navigate = useNavigate();

  return (
    <>
      <Link to="/pagina2">
        <button>Agregar Peliculas a la Función</button>
      </Link>
      <Link to="/pagina3">
        <button>Vender Entradas</button>
      </Link>
    </>
  );
}

export default App;
