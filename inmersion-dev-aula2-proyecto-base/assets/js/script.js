let listaNombresGastos = [];
let listaValoresGastos = [];
let listaDescripcionesGastos = [];
let gastoSeleccionado = -1; // Para llevar el índice del gasto seleccionado para modificar

// Se invoca en el momento que el usuario hace click en el botón
function clickBoton() {
    let nombreGasto = document.getElementById("nombreGasto").value;
    let valorGasto = document.getElementById("valorGasto").value; // Cambié de nombreGasto a valorGasto
    let descripcionGasto = document.getElementById("descripcionGasto").value;

    // Verificación de campos vacíos
    if (nombreGasto === '' || valorGasto === '' || isNaN(valorGasto) || valorGasto <= 0) {
        alert("Por favor, ingresa un nombre y un valor de gasto válidos.");
        return;
    }
    // Alerta si el gasto es mayor a 150
    if (parseFloat(valorGasto) > 150) {
        alert("¡Alerta! Se ha registrado un gasto mayor a 150 dólares.");
    }
    // Guardar valores en las listas
    listaNombresGastos.push(nombreGasto);
    listaValoresGastos.push(parseFloat(valorGasto)); // Cambié a parseFloat para convertir a número
    listaDescripcionesGastos.push(descripcionGasto);

    console.log(listaNombresGastos);
    console.log(listaValoresGastos);

    // Actualizar la lista de gastos
    actualizarListaGastos();
}

function actualizarListaGastos() {
    const listaElementos = document.getElementById("listaDeGastos");
    const totalElementos = document.getElementById("totalGastos");
    let htmlLista = '';
    let totalGastos = 0;

    listaNombresGastos.forEach((elemento, posicion) => {
        const valorGasto = Number(listaValoresGastos[posicion]);
        htmlLista += `<li>${elemento} - USD ${valorGasto.toFixed(2)}
            <button onclick="eliminarGasto(${posicion});">Eliminar</button>
        <button onclick="prepararModificacion(${posicion});">Modificar</button></li>`;
        totalGastos += valorGasto;
    });

    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos.toFixed(2);
    limpiar();
}

function limpiar() {
    document.getElementById("nombreGasto").value = '';
    document.getElementById("valorGasto").value = '';
    document.getElementById("descripcionGasto").value = '';
    document.getElementById("botonModificar").style.display = 'none'; 
    // Ocultar botón de modificar
}

function eliminarGasto(posicion) {
    listaNombresGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);
    listaDescripcionesGastos.splice(posicion, 1);
    actualizarListaGastos();
}
function prepararModificacion(posicion) {
    gastoSeleccionado = posicion;
    document.getElementById("nombreGasto").value = listaNombresGastos[posicion];
    document.getElementById("valorGasto").value = listaValoresGastos[posicion];
    document.getElementById("descripcionGasto").value = listaDescripcionesGastos[posicion];
    document.getElementById("botonModificar").style.display = 'inline'; // Mostrar botón de modificar
}

function modificarGasto() {
    if (gastoSeleccionado >= 0) {
        listaNombresGastos[gastoSeleccionado] = document.getElementById("nombreGasto").value;
        listaValoresGastos[gastoSeleccionado] = parseFloat(document.getElementById("valorGasto").value);
        listaDescripcionesGastos[gastoSeleccionado] = document.getElementById("descripcionGasto").value;

        actualizarListaGastos();
        gastoSeleccionado = -1; // Resetear selección
    }
}