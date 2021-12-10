const { response } = require('express');
const bcrypt = require('bcryptjs');
const Vuelo = require('../models/vuelo');
const { generarJWT } = require('../helpers/jwt');


const getVuelos = async (req,res) => {
    const vuelos = await Vuelo.find({}, 'origen destino fecha');

    res.json({
        ok: true,
        vuelos
    });
};

const crearVuelo = async (req,res = response) => {
    const { origen, destino, fecha, pasajeros} = req.body;

    try {
        const vuelo = new Vuelo(req.body);
        await vuelo.save();

        //Generar el token - JWT
        const token  = await generarJWT(vuelo.id);

        res.json({
            ok: true,
            vuelo,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Revisar logs'
        });
    }
};


const actualizarVuelo = async(req, res = response) => {

    //Validar Token y comprobar usuario correcto

    const uid = req.params.id;

    try {

        const vueloDB = await Vuelo.findById(uid);
        if (!vueloDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encuentra el vuelo con ese id'
            });
        }

        //Actualizaciones
        const {origen, destino, fecha, pasajeros, ...campos} = req.body;
        const vueloActualizado = await Vuelo.findByIdAndUpdate(uid,origen, destino, fecha, pasajeros , {new: true});

        res.json({
            ok: true,
            vuelo: vueloActualizado  
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const borrarVuelo = async (req, res = response) => {
    
    const uid = req.params.id;

    try {

        const vueloDB = await Vuelo.findById(uid);
        if (!vueloDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encuentra el usuario con ese id'
            });
        }

        await Vuelo.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Vuelo eliminado de manera exitosa'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se tiene el rol necesario para realizar esta operación'
        });
    }
}

module.exports = {
    getVuelos,
    crearVuelo,
    actualizarVuelo,
    borrarVuelo
}