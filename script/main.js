

let carrito = [];
let productos = [];
let iniciar;

let url = './script/valen.json';


document.addEventListener('DOMContentLoaded',() =>{

    carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    iniciar = new Gomitas();
    iniciar.iniciar();

})


/* se agregan los productos a el carrito */
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


/* se eliminan los productos de el carrito */
function eliminar(id) {   
    iniciar.eliminarArticulo(id);
}



