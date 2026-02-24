const express = require('express');
const cors = require('cors');
const multer = require('multer'); // Importamos multer
require('dotenv').config();

const app = express();
const upload = multer({ dest: 'uploads/' }); // Configuración básica de subida

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// ESTA ES LA RUTA QUE TE PIDE FREECODECAMP
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.json({ error: "No file uploaded" });
  }

  // Los nombres de las propiedades DEBEN ser estos:
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size // Asegúrate de que no esté entre comillas
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Tu app está escuchando en el puerto ' + port);
});
