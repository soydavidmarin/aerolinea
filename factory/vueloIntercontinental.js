const Vuelo = require('./vuelo');

class vueloIntercontinental extends Vuelo{
    constructor(vuelo){
        super(vuelo);
        vuelo.avion = 'doble piso';
    }
    
}
module.exports = vueloIntercontinental;
