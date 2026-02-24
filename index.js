var express = require('express');
var cors = require('cors');
var multer = require('multer');
require('dotenv').config();

var app = express();

// 1. PRIMERO LOS PERMISOS
app.use(cors());

// 2. LUEGO LOS ARCHIVOS ESTÁTICOS
app.use('/public', express.static(process.cwd() + '/public'));

// 3. CONFIGURACIÓN DE MULTER (En memoria para evitar errores de carpetas en Render)
var upload = multer({ storage: multer.memoryStorage() });

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// 4. LA RUTA (Usa 'req.file' con cuidado)
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  if (!req.file) {
    return res.json({ error: 'No file uploaded' });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});
