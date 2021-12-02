const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async (req,res) => {
    const usuarios = await Usuario.find({}, 'nombre email rol google');

    res.json({
        ok: true,
        usuarios
    });
};

const crearUsuario = async (req,res = response) => {
    const { email, password} = req.body;

    try {
        const existeEmail = await Usuario.findOne({ email}); 
        if (existeEmail) {
            return res.status(400).json({
                ok:false,
                msg: 'El correo ya se encuentra registrado'
            });
        }

        const usuario = new Usuario(req.body);
        //Encriptar contraseña del usuario.
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        //Almacenar usuario
        await usuario.save();

        //Generar el token - JWT
        const token  = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
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


const actualizarUsuario = async(req, res = response) => {

    //Validar Token y comprobar usuario correcto

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encuentra el usuario con ese id'
            });
        }

        //Actualizaciones
        const {password, gooogle, email, ...campos} = req.body;

        if(usuarioDB.email !== email){
            const existeEmail = await Usuario.findOne({email});
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe ese email asociado a un usuario'
                });
            }
        }
        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

        res.json({
            ok: true,
            usuario: usuarioActualizado  
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const borrarUsuario = async (req, res = response) => {
    
    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encuentra el usuario con ese id'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario eliminado de manera exitosa'
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
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}