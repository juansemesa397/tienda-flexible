const Producto = require('../modelos/Producto');

const productos = [

    new Producto(
        "EA001",
        "Audifonos",
        "Audifonos Bluetooth",
        10,
        100000
    ),

    new Producto(
        "EA002",
        "Teclado",
        "Teclado mecanico",
        8,
        150000
    ),

    new Producto(
        "WE001",
        "Arroz",
        "Arroz vendido por peso",
        10000,
        5
    ),

    new Producto(
        "SP001",
        "Camiseta",
        "Camiseta con descuento especial",
        20,
        50000
    )

];

module.exports = productos;