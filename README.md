# Tienda Flexible

Aplicación web desarrollada como parte de la actividad de la asignatura Diseño de Software Flexible y Reusable.

## Descripción

La aplicación simula una tienda con diferentes tipos de productos y reglas de precio.

Los productos pueden ser:

- EA: producto con precio normal.
- WE: producto vendido por peso.
- SP: producto con regla de descuento especial.

La aplicación permite:

- Consultar productos disponibles.
- Agregar productos al carrito.
- Validar disponibilidad.
- Calcular el precio según el tipo de producto.
- Eliminar productos del carrito.
- Calcular el total de la compra.
- Finalizar la compra.
- Descontar unidades del inventario.
- Acumular las ventas realizadas por la tienda.

## Tecnologías utilizadas

### Backend
- Node.js
- Express

### Frontend
- HTML
- CSS
- JavaScript

## Diseño de la solución

La solución utiliza un diseño orientado a objetos con las siguientes clases principales:

- Producto
- Item
- Carrito
- Tienda
- ManejadorReglas
- ReglaPrecioNormal
- ReglaPrecioPeso
- ReglaPrecioEspecial

Las reglas de precio se encuentran desacopladas de la lógica principal de la aplicación, permitiendo agregar o modificar reglas con un menor impacto sobre el resto del sistema.

## Ejecución del proyecto

Instalar dependencias:

```bash
npm install