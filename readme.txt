Uso del Proyecto
* Al ingresar a la página, el usuario debe escribir su nombre y hacer clic en "Ingresar".
* La tienda mostrará una bienvenida personalizada y cargará los productos disponibles y comentarios de clientes.
* El usuario puede añadir productos al carrito y modificar cantidades desde el mismo.
* Al hacer clic en "Finalizar compra", se solicita información personal para completar el proceso.
* Después de confirmar, el carrito se vacía y se muestra un mensaje de agradecimiento.


Funcionalidades JavaScript:

1- Inicio de Sesión Temporal
La función document.getElementById('formulario').addEventListener('submit', (e) => {...}) permite a los usuarios ingresar su nombre, el cual es verificado antes de continuar. Si no se ingresa un nombre, se muestra un mensaje de alerta. Al ingresar un nombre, la tienda despliega un mensaje de bienvenida, carga los productos y los comentarios.

2- Función mostrarBienvenida(nombreUsuario)
Cambia el título de la página para personalizar la bienvenida con el nombre del usuario.

3- Carga de Comentarios
* La función cargarComentarios() utiliza la API JSONPlaceholder para obtener tres comentarios de prueba. Estos comentarios son mostrados bajo un título, simulando una sección de opiniones de clientes.
* Esta función usa fetch para la solicitud asincrónica y try-catch para manejar errores en caso de fallos de red.

4- Clase Producto
Define los objetos de tipo producto con propiedades como id, nombre, precio e imagen. Estos datos son utilizados para mostrar la lista de productos y manejar el carrito de compras.

5- Carga y Despliegue de Productos
* cargarProductos(): Esta función carga los productos desde el archivo productos.json mediante fetch, y luego llama a mostrarProductos() para mostrarlos en la página.
* mostrarProductos(): Genera dinámicamente el HTML para cada producto. Cada producto incluye un botón "Comprar" que permite agregarlo al carrito.

6- Carrito de Compras
* agregarAlCarrito(id): Agrega productos al carrito, incrementando la cantidad si ya existe en el carrito. Utiliza SweetAlert para notificar al usuario cuando un producto es añadido.
* eliminarDelCarrito(id): Permite al usuario eliminar una unidad de un producto o, si solo queda una unidad, eliminar el producto del carrito completamente.
* actualizarCarrito(): Muestra el contenido actualizado del carrito, incluyendo el nombre, precio, cantidad y el total a pagar. También se agregan botones para modificar la cantidad de productos y vaciar el carrito o finalizar la compra.
* vaciarCarrito(): Vacía todo el carrito y actualiza el almacenamiento local, removiendo los productos.
* finalizarCompra(): Abre un formulario modal (con SweetAlert) para recopilar información de contacto. Al confirmar la compra, vacía el carrito y muestra un mensaje de confirmación con los datos ingresados.

7- Persistencia con Local Storage
El carrito de compras se almacena en localStorage, de modo que los productos seleccionados se mantengan al actualizar o cerrar la página.

8- Funciones Asincrónicas
Tanto cargarComentarios como cargarProductos utilizan la técnica de async-await para manejar operaciones de red. Esto permite que el sitio continúe funcionando mientras se espera la respuesta de la API o archivo local.