let productos = [];

function cargarProductos() {
    const productosGuardados = localStorage.getItem('productos');
    if (productosGuardados) {
        productos = JSON.parse(productosGuardados);
        actualizarTablaProductos();
    }
}

function guardarProductos() {
    localStorage.setItem('productos', JSON.stringify(productos));
}

function actualizarTablaProductos() {
    const tbody = document.querySelector('#products-table tbody');
    tbody.innerHTML = '';
    productos.forEach((producto, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td contenteditable="true">${producto.nombre}</td>
            <td contenteditable="true">${producto.cantidad}</td>
            <td contenteditable="true">${producto.precioCosto}</td>
            <td contenteditable="true">${producto.precioVenta}</td>
            <td contenteditable="true">${producto.descripcion}</td>
            <td>
                <button onclick="eliminarProducto(${index})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function agregarProducto(event) {
    event.preventDefault();
    const nombre = document.getElementById('input-nombre-producto').value;
    const cantidad = document.getElementById('input-cantidad-producto').value;
    const precioCosto = document.getElementById('input-precio-costo').value;
    const precioVenta = document.getElementById('input-precio-venta').value;
    const descripcion = document.getElementById('input-descripcion-producto').value;

    productos.push({ nombre, cantidad, precioCosto, precioVenta, descripcion });
    guardarProductos();
    actualizarTablaProductos();
    cerrarModal();
}

function eliminarProducto(index) {
    productos.splice(index, 1);
    guardarProductos();
    actualizarTablaProductos();
}

function abrirModal() {
    document.getElementById('producto-modal').style.display = 'block';
}

function cerrarModal() {
    document.getElementById('producto-modal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    document.getElementById('btn-ingresar-producto').addEventListener('click', abrirModal);
    document.querySelector('.close').addEventListener('click', cerrarModal);
    document.getElementById('form-nuevo-producto').addEventListener('submit', agregarProducto);

    document.querySelector('#products-table tbody').addEventListener('blur', (event) => {
        if (event.target.tagName === 'TD' && event.target.cellIndex < 5) {
            const row = event.target.parentElement;
            const index = row.rowIndex - 1;
            const producto = productos[index];
            const valores = Array.from(row.cells).slice(0, 5).map(cell => cell.textContent);
            [producto.nombre, producto.cantidad, producto.precioCosto, producto.precioVenta, producto.descripcion] = valores;
            guardarProductos();
        }
    }, true);
});
