class Tienda {

    constructor() {
        this.ventasAcumuladas = 0;
    }

    registrarVenta(valor) {
        this.ventasAcumuladas += valor;
    }

    obtenerVentasAcumuladas() {
        return this.ventasAcumuladas;
    }
}

module.exports = Tienda;