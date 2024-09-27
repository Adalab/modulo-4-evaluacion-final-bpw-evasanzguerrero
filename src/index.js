const getConnection = require('./db');
const getServer = require('./server');

const server = getServer();

server.get('/series',async (_, res) => {
  const conn = await getConnection();
  
  if(!conn) {
    res.status(500).send('Se rompió');
    return;
  }

  const [results] = await conn.query('Select * from serie;');

  res.send(results);
});

server.get('/series/:id',async (req, res) => {
  const conn = await getConnection();
  
  if(!conn) {
    res.status(500).send('Se rompió');
    return;
  }

  const [results] = await conn.query('Select * from serie where id=?;',[req.params.id]);

  res.send(results);
});