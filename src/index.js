const getConnection = require('./db');
const getServer = require('./server');

const server = getServer();

server.get('/series',async (_, res) => {
  const conn = await getConnection();
  
  if(!conn) {
    res.status(500).send('connection lost');
    return;
  }

  const [results] = await conn.query('Select * from series;');

  const data = {
    success: true,
    series: results
  };
  res.json(data);

  conn.close();
});

server.get('/series/:id',async (req, res) => {
  const conn = await getConnection();

  if(!conn) {
    res.status(500).send('connection lost');
    return;
  }

  const [results] = await conn.query('Select * from series where id=?;',[req.params.id]);

  const data = {
    success: true,
    serie: results
  };
  res.json(data);

  conn.close();
});

server.get('/series/titulo/:titulo',async (req, res) => {
  const conn = await getConnection();
  
  if(!conn) {
    res.status(500).send('connection lost');
    return;
  }
  
  const [results] = await conn.query('Select * from series where titulo like ?;',[`%${req.params.titulo}%`]);

  const data = {
    success: true,
    series: results
  };
  res.json(data);

  conn.close();
});

server.get('/personajes',async (_, res) => {
  const conn = await getConnection();
  
  if(!conn) {
    res.status(500).send('connection lost');
    return;
  }

  const [results] = await conn.query('Select * from personajes;');

  const data = {
    success: true,
    personajes: results
  };
  res.json(data);

  conn.close();
});

server.get('/personajes/:id',async (req, res) => {
  const conn = await getConnection();

  if(!conn) {
    res.status(500).send('connection lost');
    return;
  }
  
  const [results] = await conn.query('Select * from personajes where id=?;',[req.params.id]);

  const data = {
    success: true,
    personaje: results
  };
  res.json(data);

  conn.close();
});

server.get('/personajes/nombre/:nombre',async (req, res) => {
  const conn = await getConnection();

  if(!conn) {
    res.status(500).send('connection lost');
    return;
  }
  
  const [results] = await conn.query('Select * from personajes where nombre like ?;',[`%${req.params.nombre}%`]);

  const data = {
    success: true,
    nombre: results
  };
  res.json(data);

  conn.close();
});

server.get('/lugares',async (req, res) => {
  const conn = await getConnection();
  
  if(!conn) {
    res.status(500).send('connection lost');
    return;
  }

  const [results] = await conn.query('Select * from lugares;');

  const data = {
    success: true,
    lugar: results
  };
  res.json(data);

  conn.close();
});

server.get('/lugares/:id',async (req, res) => {
  const conn = await getConnection();

  if(!conn) {
    res.status(500).send('connection lost');
    return;
  }
  
  const [results] = await conn.query('Select * from lugares where id=?;',[req.params.id]);

  const data = {
    success: true,
    lugares: results
  };
  res.json(data);

  conn.close();
});
