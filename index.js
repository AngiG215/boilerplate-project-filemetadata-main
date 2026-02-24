var express = require('express');
var cors = require('cors');
var multer = require('multer'); // Puedes usar var aquí también
require('dotenv').config();

var app = express();
var upload = multer({ dest: 'uploads/' }); // Configuramos multer

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// ESTA ES LA RUTA QUE TE FALTA APROBAR
app.post('/api/fileanalyse', upload.single('upfile'), function(req, res) {
  if (!req.file) {
    return res.json({ error: "No file" });
  }
  
  // El test 4 busca este objeto exactamente
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
