// Obtener referencias a elementos del DOM
const btnConsultaMes = document.getElementById("btn-consultaMes");
const selectMes = document.getElementById("selectMes");
const inputAnio = document.getElementById("inputAnio");
const contenidoElement = document.getElementById("contenido");

// Escuchar el evento de clic en el botón "Ejecutar"
btnConsultaMes.addEventListener("click", function(event) {
    event.preventDefault();

    // Obtener el mes y el año seleccionados
    const selectedMonth = selectMes.value;
    const selectedYear = inputAnio.value;

    // Verificar si se ha seleccionado un mes y un año
    if (!selectedMonth || !selectedYear) {
        alert("Por favor, seleccione un mes y un año.");
        return;
    }

    // Verificar si el año está dentro del rango permitido
    if (selectedYear < 2023 || selectedYear > 2033) {
        alert("Por favor, introduzca un año entre 2023 y 2033.");
        return;
    }

    // Realizar la solicitud GET a la API del backend con el mes y el año
    fetch(`http://localhost:3000/api/consultaMes?mes=${selectedMonth}&anio=${selectedYear}`)
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
            <th>ID</th>
            <th>Fecha</th>
            <th>HoraRegistro</th>
            <th>Temperatura</th>
            <th>Humedad</th>
            <th>Nivel de Lluvia</th>
            <th>Índice UV</th>
            <th>EDDC_ED_Id</th>
            <th>ED_Nombre</th>
        </tr>
        </thead>
        <tbody>
        ${data.map(item => `
            <tr>
            <td>${item.DC_Id}</td>
            <td>${formatFecha(item.DC_Fecha)}</td>
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

// Función para formatear la fecha
function formatFecha(fecha) {
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}
