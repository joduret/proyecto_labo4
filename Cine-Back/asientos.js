import express from "express";
import { db } from "./db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const [asientos] = await db.execute("select * from asientos");
  const [peliculas] = await db.execute("select * from peliculas");
  const [reservas] = await db.execute("select * from reservas");
  const [funciones] = await db.execute("select * from funciones");
  res.send({ asientos, reservas, funciones, peliculas });
});

router.post("/", async (req, res) => {
  const idfuncion = req.body.idfuncion;
  const idasiento = req.body.idasiento;
  const idventa = req.body.idventa;

  // const completada = req.body.completada;
  const [result] = await db.execute(
    "insert into reservas(idfuncion, idasiento, idventa ) value(?,?,?)",
    [idfuncion, idasiento, idventa]
  );
  res.status(201).send({
    reserva: { id: result.insertdId, idfuncion, idasiento, idventa },
  });
});

// router.post(
//   "/",
//   body("username").isAlphanumeric().notEmpty().isLength({ max: 15 }),
//   body("password").isStrongPassword({
//     minLength: 10,
//     minLowercase: 1,
//     minUppercase: 1,
//     minNumbers: 1,
//     minSymbols: 0,
//   }),
//   async (req, res) => {
//     const validacion = validationResult(req);
//     if (!validacion.isEmpty()) {
//       res.status(400).send({ errores: validacion.array() });
//       return;
//     }

//     const { username, password } = req.body;
//     const contraseña = await bcrypt.hash(password, 10);
//     const [result] = await db.execute(
//       "insert into usuarios (username, password) values (?,?)",
//       [username, contraseña]
//     );
//     res.status(201).send({ usuario: { idusuario: result.insertId, username } });
//   }
// );

export default router;
