const express = require('express');
const multer  = require('multer');
const cors = require('cors');

const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());

// Esta es la ruta que procesa el archivo
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // La respuesta JSON que te pide el ejercicio
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

// Configuración del puerto para Render
const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
