const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

//Se crea el servidor de express
const app = express();

//Configuración CORS
app.use(cors());

//base de datos
dbConnection();

console.log(process.env);

//Rutas
app.get('/', (req,res) => {
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    });
});

//Lectura del puerto en el administrador
app.listen(process.env.PORT, () => {
    console.log('Servidor activo en puerto '+ process.env.PORT)
});