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
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  if (!req.file) {
    return res.json({ error: "No file uploaded" });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
