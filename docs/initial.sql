INSERT INTO series(titulo, creador, lanzamiento, genero) 
VALUES ('After Life', 'Ricky Gervais', '2019-03-08', 'Comedia dramática');

INSERT INTO personajes(nombre, descripcion, tipo, serie_id)
VALUES ('Tony Johnson', 'Un periodista que lidia con la muerte de su esposa', 'humano', 1);
INSERT INTO personajes(nombre, descripcion, tipo, serie_id)
VALUES ('Lisa', 'La esposa fallecida de Tony', 'humano', 1);
INSERT INTO personajes(nombre, descripcion, tipo, serie_id)
VALUES ('Anne', 'La amiga de Tony que intenta ayudarlo', 'humano', 1);

INSERT INTO lugares(nombre, caracteristicas, personaje_id)
VALUES ('Cafetería local', 'Lugar donde Tony suele reflexionar', 1);
INSERT INTO lugares(nombre, caracteristicas, personaje_id)
VALUES ('Parque', 'Donde Tony pasea y recuerda a su esposa', 2);
INSERT INTO lugares(nombre, caracteristicas, personaje_id)
VALUES ('Oficina de periódico', 'Lugar de trabajo de Tony', 3);

INSERT INTO series(titulo, creador, lanzamiento, genero) 
VALUES ('The Big Bang Theory', 'Chuck Lorre y Bill Prady', '2007-09-24', 'Comedia');

INSERT INTO personajes(nombre, descripcion, tipo, serie_id)
VALUES ('Sheldon Cooper', 'Físico teórico con una personalidad peculiar', 'humano', 2);
INSERT INTO personajes(nombre, descripcion, tipo, serie_id)
VALUES ('Leonard Hofstadter', 'Físico experimental y compañero de Sheldon', 'humano', 2);
INSERT INTO personajes(nombre, descripcion, tipo, serie_id)
VALUES ('Penny', 'Vecina de Sheldon y Leonard, aspirante a actriz', 'humano', 2);

INSERT INTO lugares(nombre, caracteristicas, personaje_id)
VALUES ('Departamento de Sheldon y Leonard', 'Departamento compartido de los protagonistas', 4);
INSERT INTO lugares(nombre, caracteristicas, personaje_id)
VALUES ('Departamento de Sheldon y Leonard', 'Departamento compartido de los protagonistas', 5);
INSERT INTO lugares(nombre, caracteristicas, personaje_id)
VALUES ('Apartamento de Penny', 'El apartamento de la vecina de los chicos', 6);