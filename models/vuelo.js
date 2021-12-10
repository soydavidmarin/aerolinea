const { Schema, model} = require('mongoose');


const VueloSchema = Schema({
    origen: {
        type: String,
        required: true
    },
    destino: {
        type: String,
        required: true
    },
    fecha:{
        type: String,
        required: true
    },
    pasajeros:{
        type: String,
        required: true
    }  
});

VueloSchema.method('toJSON', function(){
    const { __v, _id, pasajeros, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Vuelo', VueloSchema);