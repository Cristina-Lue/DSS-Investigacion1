const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Configura las variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware para parsear el cuerpo de las peticiones
app.use(express.json());

// Ruta para login y obtener el token JWT
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Aquí validamos el usuario y contraseña (esto es solo un ejemplo)
  if (username === 'usuario' && password === 'contraseña') {
    // Crear un token con la información del usuario
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ access_token: token });
  }

  return res.status(401).json({ msg: 'Credenciales incorrectas' });
});

// Middleware para proteger las rutas con JWT
function authenticateJWT(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ msg: 'Acceso denegado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ msg: 'Token inválido' });
    }

    req.user = user;
    next();
  });
}

// Ruta protegida que solo puede ser accedida con un token válido
app.get('/data', authenticateJWT, (req, res) => {
  res.json({
    message: 'Este es un dato seguro',
    status: 'OK',
    user: req.user,
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});
