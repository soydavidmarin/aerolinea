//RUTA: /api/usuarios

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getUsuario, getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:id', validarJWT ,getUsuario);
router.get('/', validarJWT ,getUsuarios);

router.post('/',
    [
        check('nombre', 'El nombre es obligatorio !').not().isEmpty(),
        check('password', 'La contraseña es obligatoria !').not().isEmpty(),
        check('email', 'El correo debe ser diligenciado y debe tener el formato de correo').isEmail(),
        validarCampos,
    ], 
    crearUsuario
);

router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio !').not().isEmpty(),
        check('email', 'El correo debe ser diligenciado y debe tener el formato de correo').isEmail(),
        check('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarUsuario
);

router.delete('/:id',validarJWT, borrarUsuario);


module.exports = router;