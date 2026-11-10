
//lLamar a dotenv para leer las variables de entorno 
require('dotenv').config();
//llamar a la aplicacion express
const app = require('./src/app.js');


//Encriptar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor listo en el puerto ${PORT}`);
});

