

let carrito = [];
let productos = [];
let iniciar;

let url = './script/valen.json';

/* Al cargar la web. */
document.addEventListener('DOMContentLoaded',() =>{

    carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    iniciar = new Gomitas();
    iniciar.iniciar();

})


/* Agregar articulos */
function addCarrito(id) {
    
    const prod = document.querySelector('#row_' + id);
    let producto = new Producto(   
        id,
        prod.querySelector("h3").textContent,
        prod.querySelector(".precio").textContent.substring(1,6),
        prod.querySelector("img").src
    );
                                
    iniciar.agregaCarrito(producto);
}


/* Eliminar carrito */
function eliminar(id) {   
    iniciar.eliminarArticulo(id);
}





