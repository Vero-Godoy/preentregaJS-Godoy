

// Función para pedir el nombre al usuario
function pedirNombre() {
    let nombre = "";
    while (!nombre) { 
        nombre = prompt("Por favor, ingresa tu nombre para continuar:");
        if (!nombre) {
            alert("Debes ingresar tu nombre para avanzar.");
        }
    }
    return nombre;
}

//Función para mensaje de bienvenida
const mostrarBienvenida = () => alert('¡Bienvenid@ ' + nombreUsuario + ' a nuestra tienda online!');


// Array de productos
let productos = [
    { id: 1, nombre: 'Velador cuadrado', precio: 35000 },
    { id: 2, nombre: 'Lámpara "Mandala"', precio: 45000 },
    { id: 3, nombre: 'Velador triángulo', precio: 50000 }
];

// Función para mostrar productos
function mostrarProductos() {
    let mensaje = 'Nuestros productos (por favor recordá el ID)\n';
    for (let i = 0; i < productos.length; i++) {
        mensaje += '☑ ID de producto ' + productos[i].id + "- " + productos[i].nombre + " - $" + productos[i].precio + "\n";
    }
    alert(mensaje);
}

// Función para comprar un producto
function comprarProducto() {
    const idProducto = prompt('Ingresá el ID del producto que deseas comprar:');
    const producto = productos.find(parametro => parametro.id == idProducto);

    if (producto) {
        alert('🛒 - Resumen de tu compra:\n' + producto.nombre + ' por $' + producto.precio);
    } else {
        alert('Producto no encontrado.');
    }
}



// Menú de opciones
function mostrarMenu() {
    let opcion = prompt('Elegí una opción:\n1. Conocé nuestras lámparas y veladores:\n2. Quiero comprar\n3. Salir');
    switch (opcion) {
        case '1':
            mostrarProductos();
            break;
        case '2':
            comprarProducto();
            break;
        case '3':
            alert('Gracias ' + nombreUsuario + ' por visitar nuestra tienda.\n¡Te esperamos para tu próxima compra 😉!');
            return false;
        default:
            alert('Opción no válida.');
    }
    return true;
}

// Primero pedimos el nombre del usuario
let nombreUsuario = pedirNombre();
mostrarBienvenida(nombreUsuario);  

// Ciclo while para el menú
let seguir = true;
while (seguir) {
    seguir = mostrarMenu();
}
