var express = require('express');
var cors = require('cors');
var multer = require('multer');
require('dotenv').config();

var app = express();
var upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Ruta para el análisis de archivos
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  var file = req.file;
  
  if (!file) {
    return res.json({ error: "File not found" });
  }

  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  });
}); // <--- ¡Asegúrate de que esta llave esté!

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
}); // <--- Y esta también!
