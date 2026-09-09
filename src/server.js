const express = require('express');

const productos = require('./data/productos');
const ManejadorReglas = require('./reglas/ManejadorReglas');
const Item = require('./modelos/Item');
const Carrito = require('./modelos/Carrito');
const Tienda = require('./modelos/Tienda');

const app = express();

app.use(express.json());
app.use(express.static('public'));

const PORT = 3000;


// ==============================
// MODELO DE LA APLICACIÓN
// ==============================

const carrito = new Carrito();
const tienda = new Tienda();
const manejadorReglas = new ManejadorReglas();


// ==============================
// PRODUCTOS
// ==============================

app.get('/api/productos', (req, res) => {

    res.json(productos);

});


// ==============================
// CARRITO
// ==============================

app.get('/api/carrito', (req, res) => {

    res.json({
        items: carrito.items,
        totalCompra: carrito.calcularTotal()
    });

});


app.post('/api/carrito', (req, res) => {

    const { sku, cantidad } = req.body;

    const producto = productos.find(
        producto => producto.sku === sku
    );


    // Validar que el producto exista

    if (!producto) {
        return res.status(404).json({
            mensaje: 'Producto no encontrado'
        });
    }


    // Validar cantidad

    if (cantidad <= 0) {
        return res.status(400).json({
            mensaje: 'La cantidad debe ser mayor que cero'
        });
    }


    // Buscar si el producto ya existe en el carrito

    const itemExistente =
        carrito.buscarItem(sku);


    const cantidadEnCarrito =
        itemExistente
            ? itemExistente.cantidad
            : 0;


    const cantidadTotalSolicitada =
        cantidadEnCarrito + cantidad;


    // Validar disponibilidad

    if (
        !producto.tieneDisponibilidad(
            cantidadTotalSolicitada
        )
    ) {
        return res.status(400).json({
            mensaje: 'No hay suficientes unidades disponibles'
        });
    }


    // Obtener regla de precio según el SKU

    const regla =
        manejadorReglas.obtenerRegla(
            producto.sku
        );


    // Si ya existe en el carrito

    if (itemExistente) {

        const nuevaCantidad =
            itemExistente.cantidad + cantidad;


        const nuevoTotal =
            regla.calcular(
                producto.precioUnitario,
                nuevaCantidad
            );


        itemExistente.actualizarCantidad(
            nuevaCantidad,
            nuevoTotal
        );


        return res.json(itemExistente);
    }


    // Crear un nuevo Item

    const total =
        regla.calcular(
            producto.precioUnitario,
            cantidad
        );


    const item = new Item(
        producto,
        cantidad,
        total
    );


    carrito.agregarItem(item);


    res.json(item);

});


// ==============================
// ELIMINAR DEL CARRITO
// ==============================

app.delete('/api/carrito/:sku', (req, res) => {

    const sku = req.params.sku;

    const eliminado =
        carrito.eliminarItem(sku);


    if (!eliminado) {

        return res.status(404).json({
            mensaje: 'El producto no está en el carrito'
        });

    }


    res.json({
        mensaje: 'Producto eliminado del carrito'
    });

});


// ==============================
// TIENDA
// ==============================

app.get('/api/tienda', (req, res) => {

    res.json({
        ventasAcumuladas:
            tienda.obtenerVentasAcumuladas()
    });

});


// ==============================
// REALIZAR COMPRA
// ==============================

app.post('/api/comprar', (req, res) => {


    // Validar carrito vacío

    if (carrito.estaVacio()) {

        return res.status(400).json({
            mensaje: 'El carrito está vacío'
        });

    }


    // Calcular total de la compra

    const totalCompra =
        carrito.calcularTotal();


    // Descontar inventario

    carrito.items.forEach(item => {

        const producto = productos.find(
            producto =>
                producto.sku === item.sku
        );


        producto.descontarUnidades(
            item.cantidad
        );

    });


    // Registrar venta en la tienda

    tienda.registrarVenta(
        totalCompra
    );


    // Vaciar carrito

    carrito.vaciar();


    // Respuesta

    res.json({

        mensaje:
            'Compra realizada correctamente',

        totalCompra:
            totalCompra,

        ventasAcumuladas:
            tienda.obtenerVentasAcumuladas()

    });

});


// ==============================
// SERVIDOR
// ==============================

app.listen(PORT, () => {

    console.log(
        `Servidor ejecutándose en el puerto ${PORT}`
    );

});