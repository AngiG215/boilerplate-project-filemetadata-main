const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// 'upfile' es el nombre que pide el test en el atributo name del input
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.json({ error: "No se subió ningún archivo" });
  }

  // El objeto req.file contiene toda la información que necesitamos
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
