class Carrito {

    constructor() {
        this.items = [];
    }

    agregarItem(item) {
        this.items.push(item);
    }

    buscarItem(sku) {
        return this.items.find(
            item => item.sku === sku
        );
    }

    eliminarItem(sku) {
        const indice = this.items.findIndex(
            item => item.sku === sku
        );

        if (indice === -1) {
            return false;
        }

        this.items.splice(indice, 1);

        return true;
    }

    calcularTotal() {
        return this.items.reduce(
            (acumulado, item) => acumulado + item.total,
            0
        );
    }

    vaciar() {
        this.items = [];
    }

    estaVacio() {
        return this.items.length === 0;
    }
}

module.exports = Carrito;