class Item {

    constructor(
        producto,
        cantidad,
        total
    ) {
        this.sku = producto.sku;
        this.nombre = producto.nombre;
        this.cantidad = cantidad;
        this.precioUnitario = producto.precioUnitario;
        this.total = total;
    }

    actualizarCantidad(cantidad, total) {
        this.cantidad = cantidad;
        this.total = total;
    }
}

module.exports = Item;