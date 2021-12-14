const Vuelo = require('./vuelo');

class vueloDirecto extends Vuelo{
    constructor(vuelo){
        super(vuelo);
        vuelo.avion = 'AirBuss';
    }
    
}
module.exports = vueloDirecto;