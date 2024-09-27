const express = require('express');
const cors = require('cors');

const server = express();

server.use(cors());
server.use(express.json());

const port = 4000;

server.listen( port, () => {
  console.log(`Servidor iniciado escuchando en http://localhost:${port}`);
});

server.get('/', (_, res) => {
  res.send('ozu killo que jartura');
});

