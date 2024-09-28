const getConnection = require('./db');
const getServer = require('./server');

const server = getServer();

server.get('/series',async (_, res) => {
  const conn = await getConnection();
  
  if(!conn) {
    res.status(500).send('connection lost');
    return;
  }

  const [seriesResult] = await conn.query('Select * from series;');
  const series = []

  for(const serie of seriesResult) {
    serie.lanzamiento = serie.lanzamiento.toISOString().split('T')[0]
    const serieData = {
      ...serie,
      personajes: []
    };
    const [personajesResult] = await conn.query('Select * from personajes where serie_id = ?;',[serie.id]);
    for(const personaje of personajesResult) {
      const personajeData = {
        ...personaje,
        lugares: []
      };
      const [lugaresResult] = await conn.query('Select * from lugares where personaje_id=?;',[personaje.id]);
      personajeData.lugares = lugaresResult;
      serieData.personajes.push(personajeData);
    }    
    series.push(serieData);
  }

  const data = {
    success: true,
    series: series
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

  const [seriesResult] = await conn.query('Select * from series where id=?;',[req.params.id]);

  const series = []

  for(const serie of seriesResult) {
    serie.lanzamiento = serie.lanzamiento.toISOString().split('T')[0]
    const serieData = {
      ...serie,
      personajes: []
    };
    const [personajesResult] = await conn.query('Select * from personajes where serie_id = ?;',[serie.id]);
    for(const personaje of personajesResult) {
      const personajeData = {
        ...personaje,
        lugares: []
      };
      const [lugaresResult] = await conn.query('Select * from lugares where personaje_id=?;',[personaje.id]);
      personajeData.lugares = lugaresResult;
      serieData.personajes.push(personajeData);
    }    
    series.push(serieData);
  }
  
  const data = {
    success: true,
    serie: series
  };
  res.json(data);
  conn.close();
});

server.get('/series/:id/personajes',async (req, res) => {
  const conn = await getConnection();

  if(!conn) {
    res.status(500).send('connection lost');
    return;
  }

  const [results] = await conn.query('Select * from personajes where serie_id = ?;',[req.params.id]);

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
  
  const [seriesResult] = await conn.query('Select * from series where titulo like ?;',[`%${req.params.titulo}%`]);
  const series = []

  for(const serie of seriesResult) {
    const serieData = {
      ...serie,
      personajes: []
    };
    const [personajesResult] = await conn.query('Select * from personajes where serie_id = ?;',[serie.id]);
    for(const personaje of personajesResult) {
      const personajeData = {
        ...personaje,
        lugares: []
      };
      const [lugaresResult] = await conn.query('Select * from lugares where personaje_id=?;',[personaje.id]);
      personajeData.lugares = lugaresResult;
      serieData.personajes.push(personajeData);
    }    
    series.push(serieData);
  }
  const data = {
    success: true,
    series: series
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
  
  try {
    await conn.beginTransaction();
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
    await conn.commit();
    res.json({
      success: true,
      id: serieId
    });
  } catch (err) {
    await conn.rollback();
    console.log(err)
    res.status(400).json({
      success: false,
      id: serieId
    });
  }
  conn.close();
});

server.post('/series/:id', async(req, res) => {
  const conn = await getConnection();
  
  if (!conn) {
    res.status(500).send('Se rompió');
    return;
  }

  const serieId = req.params.id;

  const [seriesResult] = await conn.query('Select * from series where id=?;',[req.params.id]);
  if (seriesResult.length === 0) {
    res.status(404).json({ message: 'Serie no encontrada' });
    return
  }

  const updatedPersonajes = []

  try {
    await conn.beginTransaction();
    const titulo = seriesResult[0].titulo; 
    if(titulo !== req.body.tipo) {
      await conn.execute(
        `UPDATE series SET titulo = ?, creador = ?, lanzamiento = ?, genero = ? WHERE id = ?`,
        [req.body.titulo, req.body.creador, req.body.lanzamiento, req.body.genero, serieId]
      );
    } else {
      await conn.execute(
        `UPDATE series SET creador = ?, lanzamiento = ?, genero = ? WHERE id = ?`,
        [req.body.titulo, req.body.creador, req.body.lanzamiento, req.body.genero, serieId]
      );
    }


    for (const personaje of req.body.personajes) {
      if (personaje.id) {
        await conn.execute(
          `UPDATE personajes SET nombre = ?, descripcion = ?, tipo = ? WHERE id = ?`,
          [personaje.nombre, personaje.descripcion, personaje.tipo, personaje.id]
        );
        updatedPersonajes.push(personaje.id)
      } else {
        const [personajeResult] = await conn.execute(
          `INSERT INTO personajes (nombre, descripcion, tipo, serie_id) VALUES (?, ?, ?, ?)`,
          [personaje.nombre, personaje.descripcion, personaje.tipo, serieId]
        );
        personaje.id = personajeResult.insertId;
        updatedPersonajes.push(personajeResult.insertId)
      }
      for (const lugar of personaje.lugares) {
        if (lugar.id) {
          await conn.execute(
            `UPDATE lugares SET nombre = ?, caracteristicas = ? WHERE id = ?`,
            [lugar.nombre, lugar.caracteristicas, lugar.id]
          );
        } else {
          await conn.execute(
            `INSERT INTO lugares (nombre, caracteristicas, personaje_id) VALUES (?, ?, ?)`,
            [lugar.nombre, lugar.caracteristicas, personaje.id]
          );
        }
      }
    }
    const presentProjectsId = updatedPersonajes.map(() => '?').join(', ');
    await conn.execute(
      `DELETE FROM personajes WHERE id NOT IN (${presentProjectsId}) AND serie_id = ?`,
      [...updatedPersonajes, serieId]
    );

    await conn.commit();
    res.json({
      success: true,
      id: serieId
    });
  } catch (err) {
    await conn.rollback();
    console.log(err)
    res.status(400).json({
      success: false,
      id: serieId
    });
  }
  conn.close();
});

server.delete('/series/:id', async(req, res) => {
  const conn = await getConnection();
  
  if (!conn) {
    res.status(500).send('Se rompió');
    return;
  }

  const serieId = req.params.id;

  try {
    await conn.execute(
      `DELETE FROM series WHERE id = ?`,
      [serieId]
    );
    res.json({
      success: true,
      id: serieId
    });
  } catch (err) {
    console.log(err)
    res.status(400).json({
      success: false,
      id: serieId
    });
  }
  conn.close();

})