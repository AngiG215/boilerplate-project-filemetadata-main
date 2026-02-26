var express = require('express');
var cors = require('cors');
var multer = require('multer');
require('dotenv').config();

var app = express();

// Usamos memoria para que sea ultra rápido y no falle en Render
var storage = multer.memoryStorage();
var upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// ESTA ES LA RUTA FINAL
  // Verificamos que el archivo exista para que no explote la app
 app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.json({ error: "No file was uploaded" });
  }

const respuesta = {
    name: req.file.originalname, // Nombre original
    type: req.file.mimetype,     // Tipo (ej. image/png)
    size: req.file.size          // Tamaño en bytes
  };
res.json(respuesta);
});
// Se envía como JSON

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port' + port);
});
