const ReglaPrecioNormal = require('./ReglaPrecioNormal');
const ReglaPrecioPeso = require('./ReglaPrecioPeso');
const ReglaPrecioEspecial = require('./ReglaPrecioEspecial');

class ManejadorReglas {

    obtenerRegla(sku) {

        if (sku.startsWith('EA')) {
            return new ReglaPrecioNormal();
        }

        if (sku.startsWith('WE')) {
            return new ReglaPrecioPeso();
        }

        if (sku.startsWith('SP')) {
            return new ReglaPrecioEspecial();
        }

        throw new Error('No existe una regla de precio para este producto');
    }

}

module.exports = ManejadorReglas;