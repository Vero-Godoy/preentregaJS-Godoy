// Formulario de nombre 
let etiqueta = document.getElementById('formulario')
etiqueta.addEventListener('submit', (e)=> {
    e.preventDefault();

    // Mensaje de bienvenida y productos
    const nombreUsuario = document.getElementById('nombre').value;
    if (nombreUsuario) {
        mostrarBienvenida(nombreUsuario);
        mostrarProductos();
    } else {
        alert('Por favor, ingresa tu nombre.');
    }
});

// Función para saludo y nombre
function mostrarBienvenida(nombreUsuario) {
    const titulo = document.getElementById('titulo');
    titulo.innerText = `¡Bienvenid@ ${nombreUsuario} a nuestra tienda!`;
    titulo.classList.add("texto-bienvenida");
}

// Constructor de clase Producto
class Producto {
    constructor(id, nombre, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
    }

    // Mostrar la información del producto
    mostrarInfo() {
        return `${this.nombre} - $${this.precio}`;
    }
}


// Array de productos
const productos = [
    new Producto(1, 'Velador cuadrado', 35000, "/otros/veladorCuadrado.jpg"),
    new Producto(2, 'Lámpara "Mandala"', 45000, "/otros/lamparaMandala.jpg"),
    new Producto(3, 'Velador triángulo', 50000, "/otros/veladorTriangular.jpg")
];


// Mostrar productos y precio
function mostrarProductos() {
    const contenedor = document.getElementById('productos');
    contenedor.innerHTML = '';
    productos.forEach((producto, index) => {
        const div = document.createElement('div');
        div.className = 'producto';
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" width="100">
            <h4>${producto.nombre} - $${producto.precio}</h4>
            <button id="btn-comprar-${index}" class="comprar btn">Comprar</button>
        `;
        contenedor.appendChild(div);

        // Asociar evento al botón
        const botonComprar = document.getElementById(`btn-comprar-${index}`);
        botonComprar.addEventListener('click', ()=> {
            agregarAlCarrito(producto.precio);
        });
    });
}


// Total de la compra 
let totalCompra = 0;

// Actualizar el total
function actualizarTotal() {
    const totalDiv = document.getElementById('total');
    totalDiv.innerText = `Total a pagar: $${totalCompra}`
    totalDiv.classList.add("caja-total");
}


// Agregar el precio del producto al total
function agregarAlCarrito(precio) {
    totalCompra += precio;
    actualizarTotal();  
}