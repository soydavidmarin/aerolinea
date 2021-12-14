const Vuelo = require('./vuelo');

class vueloCharter extends Vuelo{
    constructor(vuelo){
        super(vuelo);
        vuelo.avion = "airJet";
        
    }
    
}
module.exports = vueloCharter;
