import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [registrado, setRegistrado] = useState("");
  const [registrarUsuario, setRegistrarUsuario] = useState(false);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setError("");
    setRegistrado("");

    const response = await fetch("http://localhost:3000/autenticacion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const { token } = await response.json();

      setUsername("");
      setPassword("");
      setError("");

      navigate("/menu");
    } else {
      const errorData = await response.json();
      setError(errorData.error || "Error en el inicio de sesión");
    }
  };

  const registro = async (e) => {
    e.preventDefault();
    setError("");
    setRegistrado("");

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      setRegistrado(
        "username registrado exitosamente. Ahora puedes iniciar sesión."
      );
      setRegistrarUsuario(false);
      setUsername("");
      setPassword("");
    } else {
      const errorData = await response.json();
      setError(errorData.errores?.[0]?.msg || "Error al registrar el username");
    }
  };

  return (
    <>
      <div>
        <h1>{registrarUsuario ? "Registro" : "Inicio de Sesión"}</h1>
        <form onSubmit={registrarUsuario ? registro : login}>
          <div>
            <label htmlFor="username">username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {registrarUsuario ? (
            <button type="submit">Registrar</button>
          ) : (
            <button type="submit">Iniciar Sesión</button>
          )}
        </form>

        <p>
          {registrarUsuario ? (
            <span>
              ¿Ya tienes una cuenta?{" "}
              <button onClick={() => setRegistrarUsuario(false)}>
                Inicia sesión
              </button>
            </span>
          ) : (
            <span>
              ¿No tienes una cuenta?{" "}
              <button onClick={() => setRegistrarUsuario(true)}>
                Regístrate
              </button>
            </span>
          )}
        </p>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {registrado && <p style={{ color: "green" }}>{registrado}</p>}
        {token && <p>token:{token}</p>}
      </div>
    </>
  );
}

export default App;
