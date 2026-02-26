const express = require('express');
const cors = require('cors');
const multer = require('multer'); // Necesario para procesar el archivo
const app = express();

const upload = multer(); // Configuración básica para guardar en memoria

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// CUMPLIMIENTO DE PUNTOS 3 Y 4:
// El nombre 'upfile' debe coincidir con el atributo name del formulario
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.json({ error: "No se seleccionó ningún archivo" });
  }

  // Respuesta JSON con name, type y size
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log('Servidor funcionando en el puerto ' + port);
});
