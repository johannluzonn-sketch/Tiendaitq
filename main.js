//Objeto 
//const estudiante ={
    //nombre: "Juan",
    //edad: 30,
    //estatura: 1.75
//}
//console.log("------Objeto estudiante---");
//console.log(estudiante.nombre);
//console.log(estudiante.edad);
//console.log(estudiante.estatura);
//console.log(`Hola ${estudiante.nombre}, tu edad es ${estudiante.edad} y tu estatura es ${estudiante.estatura}`);
//console.log("--------------------------")
//

// variables constantes 
//const nombre = "Juan";
//const edad = 30;
//const estatura = 1.75;

//console.log("Hola",nombre);
//console.log(edad);
//console.log(estatura);

//variables let
//let numero1= 2.5
//let numero2= 3.5
//let segundonombre = "Pedro"
//let edad2 = 26
//let bool = true
//let suma = numero1 + numero2

//console.log("La suma es: ",numero1, "+", numero2, "=",  suma);
//console.log("Segundo nombre",segundonombre,"\n","Edad",edad2,"\n","Booleano",bool);



//Funciones
//console.log("------Funciones---");
//function saludar(nombre,){
    //console.log(`Hola ${nombre}`);
    //return `Hola ${nombre}`;
//}

//saludar('Maximilianao');
//saludar('Ana');
//saludar('Pedro');
//saludar('Mariana');

//const saludar2 = (nombre) => {
    //console.log(`Hola ${nombre}`);
    //return `Hola ${nombre}`;
//}

//saludar2('Funcion2');

//const saludar3 = (nombre) => console.log(`Hola ${nombre}`);

//saludar3('Funcion3');

//Funcion de sumar
//const sumar = (a,b) => a + b;
//console.log(sumar(5,10));


//funcion de perid pizza
//function pedirPizza(sabor, avisar){
    //console.log(`Preparando pizza de ${sabor}`);
    //avisar(sabor);
//}

//cuando llama el cliente
//pedirPizza(`peperoni`, (sabor) => {
    //console.log(`Listo su pizza de ${sabor}`);
//});

//exprese funciona igual 


//Un arreglo es una lista , entre []
//const productos = [
    //{id: 1, nombre: "Coca Cola", precio: 1.5},
    //{id: 2, nombre: "Pepsi", precio: 1.4},
//];

// push agrega al final 

//productos.push({id: 3, nombre: "Fanta", precio: 1.3});

//find> buca uno que cumpla las condiciones 

//const econtrado = productos.find((producto) => producto.id === 2);
//console.log(econtrado.nombre, econtrado.precio);

// filter se queda con todos los que cumplen 

//const sinmause = productos.filter((producto) => producto.id !== 2);
//console.log(sinmause);


//const express = require('express');
//const pool = require('./configdb/db.js');

//const app = express();

//app.use(express.json()); // para leer req.body

// ============================================================
// DATOS SIMULADOS (arreglo en memoria)
// ============================================================
//let productos = [
 // { id: 1, nombre: "Mause", precio: 1.5, stock: 20, categoria: "Tecnologia" },
 /* { id: 2, nombre: "Teclado", precio: 1.4, stock: 15, categoria: "Accesorios" },
  { id: 3, nombre: "Monitor", precio: 1.3, stock: 10, categoria: "Accesorios" }
];
*/
/*let siguienteId = 4;

// ============================================================
// CRUD CON ARREGLO EN MEMORIA (clase 3 y clase 4)
// ============================================================

// GET -> listar todos (200)
app.get('/verProductos', (req, res) => {
  res.status(200).json(productos);
});

// GET -> ver uno por id (200 o 404)
app.get('/verProductos/:id', (req, res) => {
  const id = Number(req.params.id);
  const producto = productos.find((p) => p.id === id);

  if (!producto) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }
  res.status(200).json(producto);
});

// POST /productos -> crear un producto nuevo (201 o 400)
app.post('/productos', (req, res) => {
  const datos = req.body; // el JSON que envió el cliente

  // Regla de negocio: nombre obligatorio y precio mayor a 0
  if (!datos.nombre || !datos.precio || datos.precio <= 0) {
    return res.status(400).json({ mensaje: 'Datos inválidos' });
  }

  const nuevo = {
    id: siguienteId,
    nombre: datos.nombre,
    precio: datos.precio,
    stock: datos.stock || 0,
    categoria: datos.categoria || "Sin Categoria"
  };

  siguienteId = siguienteId + 1;

  productos.push(nuevo); // lo agregamos a la lista
  res.status(201).json(nuevo); // 201 = creado
});

// PUT /productos/2 -> reemplazar los datos del producto 2 (200, 404 o 400)
app.put('/productos/:id', (req, res) => {
  const id = Number(req.params.id);
  const producto = productos.find((p) => p.id === id);

  // Primero: ¿existe?
  if (!producto) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }

  // Después: ¿los datos están bien?
  const datos = req.body;
  if (!datos.nombre || !datos.precio || datos.precio <= 0) {
    return res.status(400).json({ mensaje: 'Datos inválidos' });
  }

  producto.nombre = datos.nombre;
  producto.precio = datos.precio;
  producto.stock = datos.stock || 0;
  producto.categoria = datos.categoria || producto.categoria;
  res.status(200).json(producto);
});

// DELETE /productos/2 -> eliminar el producto 2 (204 o 404)
//app.delete('/productos/:id', (req, res) => {
  //const id = Number(req.params.id);
  //const producto = productos.find((p) => p.id === id);

  //if (!producto) {
  //  return res.status(404).json({ mensaje: 'Producto no encontrado' });
 // }

  // Nos quedamos con todos MENOS el que tiene ese id
  //productos = productos.filter((p) => p.id !== id);

  //res.status(204).send(); // 204 = listo, sin contenido
//});

// ============================================================
// PRUEBA DEL SERVIDOR
// ============================================================
app.get('/vermiservidor', (req, res) => {
  res.send('Hola mundo desde mi primer servidor Express');
});

// ============================================================
// RUTAS CON BASE DE DATOS (PostgreSQL)
// ============================================================

// Primer endpoint: obtenerProductos
app.get('/productos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error al obtener productos', error: error.message });
  }
});

// Producto por id desde la base de datos
app.get('/productos/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos WHERE id = $1', [req.params.id]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ message: 'Error al obtener productos', error: error.message });
  }
});

// Segundo endpoint: POST agregar producto
app.post('/crearProducto', async (req, res) => {
  const { nombre, precio, stock } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO productos (nombre, precio, stock) VALUES ($1, $2, $3) RETURNING *',
      [nombre, precio, stock]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ message: 'Error al crear producto', error: error.message });
  }
});

// Prueba de conexión a la base de datos
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.status(200).json({ message: 'Conexión exitosa a la base de datos', time: result.rows[0].now });
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    res.status(500).json({ message: 'Error al conectar a la base de datos', error: error.message });
  }
});

// Endpoint para actualizar producto por id

app.put('/productos/:id', async (req, res) => {
  const id = Number(req.params.id);
  const {nombre, precio, stock} = req.body;
  try{
    if(!nombre || !precio || !stock){
      return res.status(400).json({message: 'Faltan datos para actualizar el producto'});
    }
    const result = await pool.query(
      'UPDATE productos SET nombre = $1, precio = $2, stock = $3 WHERE id = $4 RETURNING *',
      [nombre, precio, stock, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ message: 'Error al actualizar producto', error: error.message });
  }
});
  // Endpoint para eliminar producto por id

  app.delete('/productos/:id', async (req, res)=>{
    const id = Number(req.params.id);
    const resultado = await pool.query('DELETE FROM productos WHERE id = $1', [id]);
    if (resultado.rowCount === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(204).send();
  });
*/
//lLamar a dotenv para leer las variables de entorno 
require('dotenv').config();
//llamar a la aplicacion express
const app = require('./app.js');


//Encriptar el servidor en el puerto 3000
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor listo en el puerto ${PORT}`);
});

