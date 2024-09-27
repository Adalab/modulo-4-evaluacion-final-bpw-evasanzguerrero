const express = require('express');
const cors = require('cors');

function getServer() {
  const server = express();

  server.use(cors());
  server.use(express.json());
  
  const port = 4000;
  
  server.listen( port, () => {
    console.log(`Servidor iniciado escuchando en http://localhost:${port}`);
  });
  return server
}

module.exports = getServer;