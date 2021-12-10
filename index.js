const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

//Se crea el servidor de express
const app = express();

//Configuración CORS
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//base de datos
dbConnection();

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/vuelos', require('./routes/vuelos'));


//Lectura del puerto en el administrador
app.listen(process.env.PORT, () => {
    console.log('Servidor activo en puerto '+ process.env.PORT)
});