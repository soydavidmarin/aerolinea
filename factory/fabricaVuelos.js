const Charter = require('./vueloCharter')
const Directo = require('./vueloDirecto')
const Intercontinental = require('./vueloIntercontinental')
const Nacional = require('./vueloNacional')

class vuelosFactory {
    tipo
    constructor(vuelo){
        this.tipo=vuelo;
    }

    create() {
        switch (this.tipo.tipo) {
            case 'Charter': 
                return new Charter(vuelo);
            case 'Directo':
                return new Directo(vuelo);
            case 'Interconinental' :
                    return new Intercontinental(vuelo);
            case 'Nacional' : 
                return new Nacional(vuelo);
            default:{
                console.log('Tipo de avion desconocido');
            }
        }
    }
}
module.exports ={  vuelosFactory};