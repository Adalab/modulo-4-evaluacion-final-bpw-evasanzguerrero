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

server.post('/series', async(req, res) => {
  
  const conn = await getConnection();
  
  if( !conn ) {
    res.status(500).send('Se rompió');
    return;
  }

  console.log(req.body)
  
  const [results] = await conn.execute(
    `INSERT INTO series (titulo, creador, lanzamiento, genero) VALUES (?, ?, ?, ?)` ,
    [req.body.titulo, req.body.creador, req.body.lanzamiento, req.body.genero]);
    
  const serieId = results.insertId;

  for (const personaje of req.body.personajes) {
    const [personajeResult] = await conn.execute(
      `INSERT INTO personajes (nombre, descripcion, tipo, serie_id) VALUES (?, ?, ?, ?)` ,
      [personaje.nombre, personaje.descripcion, personaje.tipo, serieId]);
    const personajeId = personajeResult.insertId;
    
    for (const lugar of personaje.lugares) {
      await conn.execute(
        `INSERT INTO lugares (nombre, caracteristicas, personaje_id) VALUES (?, ?, ?)` ,
        [lugar.nombre, lugar.caracteristicas, personajeId]);
    }
  }

  res.json({
    success: true,
    id: serieId
  });

  conn.close();
});
