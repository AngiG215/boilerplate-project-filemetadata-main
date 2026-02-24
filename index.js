const express = require('express');
const cors = require('cors');
const multer = require('multer'); // Importamos multer
require('dotenv').config();

const app = express();
const upload = multer({ dest: 'uploads/' });// Configuración básica de subida

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// ESTA ES LA RUTA QUE TE PIDE FREECODECAMP
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  // Verificamos que el archivo exista para evitar errores
  if (!req.file) {
    return res.json({ error: 'Archivo no encontrado' });
  }

  // Los nombres de las llaves deben ser exactamente estos y en minúsculas
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Tu app está escuchando en el puerto ' + port);
});
