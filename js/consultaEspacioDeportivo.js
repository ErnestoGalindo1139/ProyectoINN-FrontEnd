// Obtener referencias a elementos del DOM
const btnConsultaEspacio = document.getElementById("btn-consultaEspacio");
const selectEspacioDeportivo = document.getElementById("selectEspacioDeportivo");
const contenidoElement = document.getElementById("contenido");

// Escuchar el evento de clic en el botón "Ejecutar"
btnConsultaEspacio.addEventListener("click", function(event) {
    event.preventDefault();

    // Obtener el valor seleccionado del select
    const selectedEspacioDeportivo = selectEspacioDeportivo.value;

    // Verificar si se ha seleccionado una opción
    if (!selectedEspacioDeportivo || selectedEspacioDeportivo === "Seleccione una opcion:") {
        alert("Seleccione un espacio deportivo.");
        return;
    }

    // Realizar la solicitud GET a la API del backend con el espacio seleccionado
    fetch(`http://localhost:3000/api/consulta-espacio?espacio=${selectedEspacioDeportivo}`)
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
                <th>Nombre</th>
                <th>Id</th>
                <th>Fecha</th>
                <th>HoraRegistro</th>
                <th>Temperatura</th>
                <th>Humedad</th>
                <th>Nivel de Lluvia</th>
                <th>Indice UV</th>
            </tr>
        </thead>
        <tbody>
            ${data.map(item => `
                <tr>
                    <td>${item.ED_Nombre}</td>
                    <td>${item.DC_Id}</td>
                    <td>${formatoFecha(item.DC_Fecha)}</td>
                    <td>${item.DE_HoraRegistro}</td>
                    <td>${item.DC_Temperatura}</td>
                    <td>${item.DC_Humedad}</td>
                    <td>${item.DC_NivelLluvia}</td>
                    <td>${item.DC_IndiceUV}</td>
                </tr>
            `).join('')}
        </tbody>
    `;

    // Reemplazar el contenido anterior con la nueva tabla
    contenidoElement.innerHTML = '';
    contenidoElement.appendChild(table);
}

function formatoFecha(fecha) {
    return new Date(fecha).toISOString().split('T')[0];
}
