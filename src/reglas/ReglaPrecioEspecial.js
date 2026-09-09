class ReglaPrecioEspecial {

    calcular(precioUnitario, cantidad) {

        const precioSinDescuento = precioUnitario * cantidad;

        const gruposDeTres = Math.floor(cantidad / 3);

        let descuento = gruposDeTres * 0.20;

        if (descuento > 0.50) {
            descuento = 0.50;
        }

        const total = precioSinDescuento * (1 - descuento);

        return total;
    }

}

module.exports = ReglaPrecioEspecial;