class Producto {

    constructor(
        sku,
        nombre,
        descripcion,
        unidadesDisponibles,
        precioUnitario
    ) {
        this.sku = sku;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.unidadesDisponibles = unidadesDisponibles;
        this.precioUnitario = precioUnitario;
    }

    tieneDisponibilidad(cantidad) {
        return cantidad <= this.unidadesDisponibles;
    }

    descontarUnidades(cantidad) {
        this.unidadesDisponibles -= cantidad;
    }
}

module.exports = Producto;