//RUTA: /api/usuarios

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');

const router = Router();

router.get('/', getUsuarios);
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
        check('nombre', 'El nombre es obligatorio !').not().isEmpty(),
        check('email', 'El correo debe ser diligenciado y debe tener el formato de correo').isEmail(),
        check('role', 'El role es obligatorio').isEmail(),
        validarCampos,
    ],
    actualizarUsuario
);

router.delete('/:id', borrarUsuario);


module.exports = router;