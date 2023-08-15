// Obtener referencias a elementos del DOM
const btnFecha = document.getElementById("btn-Fecha");
const inputFecha = document.getElementById("consultaFechaEspecifica");
const contenidoElement = document.getElementById("contenido");

// Escuchar el evento de clic en el botón "Ejecutar"
btnFecha.addEventListener("click", function(event) {
    event.preventDefault();

    // Obtener la fecha seleccionada
    const selectedDate = inputFecha.value;

    // Verificar si se ha seleccionado una fecha
    if (!selectedDate) {
        alert("Por favor, seleccione una fecha.");
        return;
    }

    // Realizar la solicitud GET a la API del backend con la fecha
    fetch(`http://localhost:3000/api/consultasFechaEspecifica?fecha=${selectedDate}`)
        .then(response => response.json())
        .then(data => {
            // Mostrar los resultados en forma de tabla
            mostrarTabla(data);
        })
        .catch(error => {
            console.error('Error al obtener datos del backend:', error);
            contenidoElement.innerHTML = 'Error al obtener datos del backend';
        });
});

function mostrarTabla(data) {
    // Crear una tabla para mostrar los datos
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
        <tr>
            <th>Id</th>
            <th>Fecha</th>
            <th>Hora de Registro</th>
            <th>Temperatura</th>
            <th>Humedad</th>
            <th>NivelLluvia</th>
            <th>IndiceUV</th>
            <th>EDDC_ED_Id</th>
            <th>Nombre</th>
        </tr>
        </thead>
        <tbody>
        ${data.map(item => `
            <tr>
            <td>${item.DC_Id}</td>
            <td>${formatoFecha(item.DC_Fecha)}</td>
            <td>${item.DE_HoraRegistro}</td>
            <td>${item.DC_Temperatura}</td>
            <td>${item.DC_Humedad}</td>
            <td>${item.DC_NivelLluvia}</td>
            <td>${item.DC_IndiceUV}</td>
            <td>${item.EDDC_ED_Id}</td>
            <td>${item.ED_Nombre}</td>
            </tr>
        `).join('')}
        </tbody>
    `;

    // Reemplazar el contenido anterior con la nueva tabla
    contenidoElement.innerHTML = '';
    contenidoElement.appendChild(table);
}

function formatoFecha(fecha) {
    const fechaObj = new Date(fecha);
    const year = fechaObj.getFullYear();
    const month = String(fechaObj.getMonth() + 1).padStart(2, '0');
    const day = String(fechaObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
