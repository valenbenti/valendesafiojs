/* ----------- Stock ----------- */

let stockProductos = [
    {id: 1, nombre: "Tupper", tipo: "Gomitas", cantidad: 1, desc: "Tupper con 600 grs de gomitas importadas", precio: "1500",},
    {id: 2, nombre: "Lata de gomitas", tipo: "Gomitas", cantidad: 1, desc: "Lata de gomitas acidas imperdible", precio: "1500",},
    {id: 3, nombre: "Vaso starbucks", tipo: "Gomitas", cantidad: 1, desc: "Vaso transparente con 400 grs de gomitas acidas", precio: "900",},
    {id: 4, nombre: "Box 6 divisiones", tipo: "Gomitas", cantidad: 1, desc: "Podes elegir hasta 6 tipos diferentes de gomitas acidas o importadas", precio: "1200",},
    {id: 3, nombre: "Box chocolates", tipo: "Gomitas", cantidad: 1, desc: "Caja llena de chocolates ", precio: "2000",},
]


/* ----------- Contenedor del stock ----------- */

const contenedorProductos = document.getElementById('contenedor-productos')



const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

const contadorCarrito = document.getElementById('contadorCarrito')


const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})


stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
    `
    contenedorProductos.appendChild(div)

    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => {

        agregarAlCarrito(producto.id)

    })
})




const agregarAlCarrito = (prodId) => {


    const existe = carrito.some (prod => prod.id === prodId)

    if (existe){
        const prod = carrito.map (prod => {

            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else {
        const item = stockProductos.find((prod) => prod.id === prodId)

        carrito.push(item)
    }

    actualizarCarrito()

}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) 

    carrito.splice(indice, 1)

    actualizarCarrito()

    console.log(carrito)
}

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""



    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })

    contadorCarrito.innerText = carrito.length 

    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)


}


/* ------------------------------------------- MODAL ---------------------------------------------------- */

const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]


botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})
botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})

contenedorModal.addEventListener('click', (event) =>{
    contenedorModal.classList.toggle('modal-active')

})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation() //cuando clickeo sobre el modal se finaliza la propagacion del click a los elementos
    //padre
})