import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;
const LOG_FILE = 'logs.txt';

app.use(bodyParser.json());

// POST /log — guardar un registro
app.post('/log', (req, res) => {
  const { source, level, message } = req.body;

  if (!source || !level || !message) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  const logEntry = ${new Date().toISOString()} [${level}] (${source}): ${message}\n;

  fs.appendFile(LOG_FILE, logEntry, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to write log' });
    }
    res.json({ success: true });
  });
});

// GET /logs — devolver todos los registros
app.get('/logs', (req, res) => {
  fs.readFile(LOG_FILE, 'utf8', (err, data) => {
    if (err) {
      // Si no existe el archivo aún, devolvemos un arreglo vacío
      if (err.code === 'ENOENT') {
        return res.json({ logs: [] });
      }
      return res.status(500).json({ error: 'Failed to read log file' });
    }

    // Separar las líneas y filtrar vacíos
    const logs = data.split('\n').filter(line => line.trim() !== '');
    res.json({ logs });
  });
});

app.listen(PORT, () => {
  console.log(Logger app running on http://localhost:${PORT});
});
