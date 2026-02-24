var express = require('express');
var cors = require('cors');
var multer = require('multer');
require('dotenv').config();

var app = express();

// CONFIGURACIÓN CLAVE: Usar memoria en lugar de carpeta 'uploads'
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Esta ruta debe devolver exactamente name, type y size
// El nombre 'upfile' debe coincidir con el atributo 'name' de tu HTML
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  var file = req.file;

  // Si el usuario no seleccionó ningún archivo
  if (!file) {
    return res.json({ error: "No file uploaded" });
  }

  // ESTA ES LA RESPUESTA QUE EL TEST BUSCA (Punto 4)
  res.json({
    name: file.originalname, // Nombre del archivo (ej: "foto.jpg")
    type: file.mimetype,     // Tipo de archivo (ej: "image/jpeg")
    size: file.size         // Tamaño en bytes (ej: 12345)
  });
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
