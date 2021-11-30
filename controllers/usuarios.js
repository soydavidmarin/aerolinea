const { response } = require('express');
const Usuario = require('../models/usuario');


const getUsuarios = async (req,res) => {
    const usuarios = await Usuario.find({}, 'nombre email rol google');

    res.json({
        ok: true,
        usuarios
    });
};

const crearUsuario = async (req,res = response) => {
    const { email, password, nombre} = req.body;

    try {
        const existeEmail = await Usuario.findOne({ email}); 
        if (existeEmail) {
            return res.status(400).json({
                ok:false,
                msg: 'El correo ya se encuentra registrado'
            });
        }

        const usuario = new Usuario(req.body);
        await usuario.save();
        res.json({
            ok: true,
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado. Revisar logs'
        });
    }
};


module.exports = {
    getUsuarios,
    crearUsuario
}