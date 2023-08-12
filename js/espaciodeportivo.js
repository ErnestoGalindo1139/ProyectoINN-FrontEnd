// Tabla EspacioDeportivo
const contenidoElementEspacioDeportivo = document.getElementById("contenidoEspacioDeportivo");

function cargarTablaEspacioDeportivo() {
    // Hacer una solicitud GET a la API del backend
    fetch('http://localhost:3000/api/espaciodeportivo')
        .then(response => response.json())
        .then(data => {
            // Crear una tabla para mostrar los datos
            const table = document.createElement('table');
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>ED_Id</th>
                        <th>ED_Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(item => `
                    <tr>
                        <td>${item.ED_Id}</td>
                        <td>${item.ED_Nombre}</td>
                    </tr>
                    `).join('')}
                </tbody>
            `;
            
            // Reemplazar el contenido anterior con la nueva tabla
            contenidoElementEspacioDeportivo.innerHTML = '';
            contenidoElementEspacioDeportivo.appendChild(table);
        })
        .catch(error => {
            console.error('Error al obtener datos del backend:', error);
            contenidoElementEspacioDeportivo.innerHTML = 'Error al obtener datos del backend';
        });
}

document.getElementById("espacioDeportivo").addEventListener("submit", function(event) {
    event.preventDefault();

    // Captura los valores de los campos
    const nombreEspacioDeportivo = document.getElementById("nombreEspacioDeportivo").value;

    // Crea un objeto con los datos que se enviarán a la API
    const EspacioDeportivoData = {
        ED_Nombre: nombreEspacioDeportivo
    };

    // Realiza una solicitud POST a la API utilizando fetch
    fetch("http://localhost:3000/api/espaciodeportivo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(EspacioDeportivoData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Respuesta de la API:", data);

        // Si la inserción fue exitosa, vacía los campos
        document.getElementById("nombreEspacioDeportivo").value = "";

        alert("Datos enviados correctamente");
        
        // Actualizar la tabla con los nuevos datos
        cargarTablaEspacioDeportivo();
    })
    .catch(error => {
        console.error("Error al enviar los datos:", error);
        alert("Ocurrió un error al enviar los datos");
    });
    cargarTablaEspacioDeportivo();
});