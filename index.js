var express = require('express');
var cors = require('cors');
var multer = require('multer'); // Usamos var para que coincida con el estilo original
require('dotenv').config();

var app = express();

// 1. Configuración de Multer: Definimos dónde se guardan los archivos temporalmente
var upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// 2. La ruta que está fallando (Punto 4)
// 'upfile' es el nombre que freeCodeCamp busca obligatoriamente
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  var file = req.file;

  // Si por alguna razón el archivo no llega, evitamos que la app se caiga
  if (!file) {
    return res.json({ error: "Please upload a file" });
  }

  // ESTA RESPUESTA ES LA CLAVE DEL ÉXITO:
  // Los nombres 'name', 'type' y 'size' deben estar así, sin mayúsculas.
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  });
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
