async function cargarProductos() {

    const respuesta = await fetch('/api/productos');

    const productos = await respuesta.json();

    const contenedor = document.getElementById('productos');

    contenedor.innerHTML = '';

    productos.forEach(producto => {

        const elemento = document.createElement('div');

       elemento.innerHTML = `
    <h3>${producto.nombre}</h3>
    <p>SKU: ${producto.sku}</p>
    <p>Regla: ${obtenerDescripcionRegla(producto.sku)}</p>
    <p>${producto.descripcion}</p>
    <p>Precio: $${producto.precioUnitario}</p>
    <p>Disponibles: ${producto.unidadesDisponibles}</p>

    <label>Cantidad:</label>

    <input 
        type="number"
        id="cantidad-${producto.sku}"
        min="1"
        value="1"
    >

    <button onclick="agregarAlCarrito('${producto.sku}')">
        Agregar al carrito
    </button>

    <hr>
`;  

        contenedor.appendChild(elemento);
    });
}

cargarProductos();
cargarCarrito();

async function agregarAlCarrito(sku) {

    const inputCantidad = document.getElementById(`cantidad-${sku}`);

    const cantidad = Number(inputCantidad.value);

    const respuesta = await fetch('/api/carrito', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sku: sku,
            cantidad: cantidad
        })
    });

    const resultado = await respuesta.json();

    if (!respuesta.ok) {
        alert(resultado.mensaje);
        return;
    }

    alert('Producto agregado al carrito');
    cargarCarrito();
}

async function cargarCarrito() {

    const respuesta = await fetch('/api/carrito');

    const carrito = await respuesta.json();

    const contenedor = document.getElementById('carrito');

    contenedor.innerHTML = '';

    carrito.items.forEach(item => {

        const elemento = document.createElement('div');

        elemento.innerHTML = `
    <p>
        <strong>${item.nombre}</strong>
        - Cantidad: ${item.cantidad}
        - Total: $${item.total}

        <button onclick="eliminarDelCarrito('${item.sku}')">
            Eliminar
        </button>
    </p>
`;

        contenedor.appendChild(elemento);
    });

    const total = document.createElement('h3');

    total.innerText = `Total de la compra: $${carrito.totalCompra}`;

    contenedor.appendChild(total);
}

async function eliminarDelCarrito(sku) {

    const respuesta = await fetch(`/api/carrito/${sku}`, {
        method: 'DELETE'
    });

    const resultado = await respuesta.json();

    if (!respuesta.ok) {
        alert(resultado.mensaje);
        return;
    }

    alert('Producto eliminado del carrito');

    cargarCarrito();
}
async function realizarCompra() {

    const respuesta = await fetch('/api/comprar', {
        method: 'POST'
    });

    const resultado = await respuesta.json();

    if (!respuesta.ok) {
        alert(resultado.mensaje);
        return;
    }

    alert(
        `Compra realizada correctamente. Total: $${resultado.totalCompra}`
    );

        cargarCarrito();
    cargarProductos();
    cargarVentas();
}

async function cargarVentas() {

    const respuesta = await fetch('/api/tienda');

    const tienda = await respuesta.json();

    const contenedor = document.getElementById('ventas');

    contenedor.innerText = `Ventas acumuladas: $${tienda.ventasAcumuladas}`;
}
function obtenerTipoProducto(sku) {

    if (sku.startsWith('EA')) {
        return 'Normal';
    }

    if (sku.startsWith('WE')) {
        return 'Por peso';
    }

    if (sku.startsWith('SP')) {
        return 'Especial';
    }

    return 'Desconocido';
}
function obtenerDescripcionRegla(sku) {

    if (sku.startsWith('EA')) {
        return 'Precio normal por cantidad';
    }

    if (sku.startsWith('WE')) {
        return 'Precio calculado por peso';
    }

    if (sku.startsWith('SP')) {
        return '20% de descuento por cada 3 unidades, máximo 50%';
    }

    return 'Sin regla definida';
}