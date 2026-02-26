var express = require('express');
var cors = require('cors');
var multer = require('multer');
require('dotenv').config();

var app = express();
app.use(express.json()); // Crucial para que el paso 4 funcione
// Usamos memoria para que sea ultra rápido y no falle en Render
var storage = multer.memoryStorage();
var upload = multer();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// ESTA ES LA RUTA FINAL
 app.post('/upload', upload.single('file'), (req, res) => {
  // SEGURIDAD: Si no hay archivo, respondemos error antes de seguir
  if (!req.file) {
    return res.status(400).json({ error: "No se envió ningún archivo" });
  }

  // LA FÓRMULA CORRECTA (Sin paréntesis, solo llaves)
  res.json({
    name: req.file.originalname, 
    type: req.file.mimetype,
    size: req.file.size
  });
});/ Se envía como JSON

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port' + port);
});
