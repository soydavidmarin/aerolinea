const Vuelo = require('./vuelo');

class vueloNacional extends Vuelo{
    constructor(vuelo){
        super(vuelo);
        vuelo.avion = 'avioneta_sencilla';
    }
    
}
module.exports = vueloNacional;