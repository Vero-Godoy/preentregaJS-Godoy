// Captura el evento de envío del formulario y maneja la validación
document.getElementById('formulario').addEventListener('submit', (e) => {
    e.preventDefault();
    const nombreUsuario = document.getElementById('nombre').value;
    if (nombreUsuario) {
        mostrarBienvenida(nombreUsuario);
        cargarProductos();
        cargarComentarios();
    } else {
        alert('Por favor, ingresa tu nombre.');
    }
});

// Muestra un mensaje de bienvenida personalizado
function mostrarBienvenida(nombreUsuario) {
    const titulo = document.getElementById('titulo');
    titulo.innerText = `¡Bienvenid@ ${nombreUsuario} a nuestra tienda!`;
    titulo.classList.add("texto-bienvenida");
}


// Clase Producto que define los atributos de cada producto
class Producto {
    constructor(id, nombre, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
    }
}

let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Carga los productos desde un archivo JSON y los muestra en la tienda
async function cargarProductos() {
    try {
        const response = await fetch('./JS/productos.json');
        productos = await response.json();
        mostrarProductos();
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}

// Muestra los productos en el DOM
function mostrarProductos() {
    const contenedor = document.getElementById('productos');
    contenedor.innerHTML = '';
    productos.forEach((producto) => {
        const div = document.createElement('div');
        div.className = 'producto';
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" width="100">
            <h4>${producto.nombre} - $${producto.precio}</h4>
            <button class="comprar btn" onclick="agregarAlCarrito(${producto.id})">Comprar</button>
        `;
        contenedor.appendChild(div);
    });
    actualizarCarrito();
}

// Función para agregar productos al carrito
function agregarAlCarrito(id) {
    const productoExistente = carrito.find(prod => prod.id === id);
    
    if (productoExistente) {
        // Si el producto ya está en el carrito, aumenta la cantidad
        productoExistente.cantidad += 1;
        Swal.fire('Producto añadido!', `${productoExistente ? productoExistente.nombre : producto.nombre} ha sido agregado al carrito.`, 'success');
    } else {
        // Si no está en el carrito, lo agrega con cantidad 1
        const producto = productos.find(p => p.id === id);
        carrito.push({ ...producto, cantidad: 1 });
        Swal.fire('Producto añadido!', `${productoExistente ? productoExistente.nombre : producto.nombre} ha sido agregado al carrito.`, 'success');
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();   
}

// Función para eliminar una unidad del producto seleccionado
function eliminarDelCarrito(id) {
    const productoIndex = carrito.findIndex(prod => prod.id === id);

    if (productoIndex !== -1) {
        const producto = carrito[productoIndex];
        
        if (producto.cantidad > 1) {
            producto.cantidad -= 1;
        } else {
            // Si solo hay una unidad, elimina el producto del carrito
            carrito.splice(productoIndex, 1);
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
    }
}

// Función para actualizar la visualización del carrito en el DOM
function actualizarCarrito() {
    const totalDiv = document.getElementById('total');
    
    // Calcular el total del carrito
    const totalAPagar = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);


    // Generar el contenido HTML del carrito con botones para agregar y eliminar productos
    totalDiv.innerHTML = `
        <h3>Carrito de Compras</h3>
        <ul class="list-group">
            ${carrito.map(prod => `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${prod.nombre} - $${prod.precio} x ${prod.cantidad} = $${prod.precio * prod.cantidad}
                    <div>
                        <button class="btn btn-success btn-sm" onclick="agregarAlCarrito(${prod.id})">+</button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${prod.id})">-</button>
                    </div>
                </li>
            `).join('')}
        </ul>
        <p class="mt-3">Total a pagar: $${totalAPagar}</p>
        <button class="btn btn-danger" onclick="vaciarCarrito()">Vaciar carrito</button>
        <button class="btn btn-success" onclick="finalizarCompra()">Finalizar compra</button>
    `;
    totalDiv.classList.add("caja-total");
}

// Función para vaciar todo el carrito
function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem("carrito");
    actualizarCarrito();
}


function finalizarCompra() {
    Swal.fire({
        title: 'Finalizar compra',
        html: `
            <label for="nombreCompleto">Nombre Completo</label>
            <input type="text" id="nombreCompleto" class="swal2-input" placeholder='Nombre completo'>
            <label for="direccion">Dirección</label>
            <input type="text" id="direccion" class="swal2-input" placeholder='Dirección'>
        `,
        confirmButtonText: 'Comprar',
        focusConfirm: false,
        preConfirm: () => {
            const nombreCompleto = Swal.getPopup().querySelector('#nombreCompleto').value;
            const direccion = Swal.getPopup().querySelector('#direccion').value;
            if (!nombreCompleto || !direccion) {
                Swal.showValidationMessage(`Por favor completa todos los campos`);
            }
            return { nombreCompleto, direccion };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = [];
            localStorage.removeItem("carrito");
            actualizarCarrito();
            Swal.fire('Compra realizada!', `Gracias, ${result.value.nombreCompleto}! Tu pedido será enviado a ${result.value.direccion}.`, 'success');
        }
    });
}

// Carga y muestra los comentarios de clientes desde una API
async function cargarComentarios() {
    try { 
        const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=3');
        const comentarios = await response.json();

        // Selecciona el contenedor de comentarios
        const contenedorComentarios = document.getElementById('comentarios');
        const divTituloComentario = document.createElement('div');
            divTituloComentario.classList.add('comentarios', 'mt-5');
            divTituloComentario.innerHTML = `
                <h2>Comentarios de nuestros clientes</h2>
            `;
            contenedorComentarios.appendChild(divTituloComentario);
        

        // Agrega cada comentario al contenedor
        comentarios.forEach(comentario => {
            const divComentario = document.createElement('div');
            divComentario.classList.add('comentario');
            divComentario.innerHTML = `
                <h5>${comentario.name}</h5>
                <p><strong>Email:</strong> ${comentario.email}</p>
                <p>${comentario.body}</p>
            `;
            contenedorComentarios.appendChild(divComentario);
        });
    } catch (error) {
        console.error("Error al cargar los comentarios:", error);
    }
}
