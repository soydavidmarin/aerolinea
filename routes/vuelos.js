//RUTA: /api/vuelos

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getVuelos, crearVuelo, actualizarVuelo, borrarVuelo } = require('../controllers/vuelos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',getVuelos);
router.post('/',
    [
        check('origen', 'El origen es obligatorio !').not().isEmpty(),
        check('destino', 'El destino es obligatorio !').not().isEmpty(),
        check('fecha', 'La fecha es obligatoria !').not().isEmpty(), 
        check('pasajeros', 'El número de pasajeros e obligatorio !').isNumeric(),            
        validarCampos,
    ], 
    crearVuelo
);

router.put('/:id',
    [
        check('origen', 'El origen es obligatorio !').not().isEmpty(),   
        check('destino', 'El destino es obligatorio !').not().isEmpty(),
        check('fecha', 'La fecha es obligatoria !').not().isEmpty(),
        check('pasajeros', 'El número de pasajeros e obligatorio !').isNumeric(),     
        validarCampos,
    ],
    actualizarVuelo
);

router.delete('/:id', borrarVuelo);

module.exports = router;