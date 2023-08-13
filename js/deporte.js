document.getElementById("btn-limpiar").addEventListener("click", function(event) {
    document.getElementById("nombreDeporte").value = "";
});

// Tabla Deporte
const contenidoElementDeporte = document.getElementById("contenidoDeporte");

function cargarTablaDeporte() {
    // Hacer una solicitud GET a la API del backend
    fetch('http://localhost:3000/api/deporte')
        .then(response => response.json())
        .then(data => {
            // Crear una tabla para mostrar los datos
            const table = document.createElement('table');
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Depor_Id</th>
                        <th>Depor_Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(item => `
                    <tr>
                        <td>${item.Depor_Id}</td>
                        <td>${item.Depor_Nombre}</td>
                    </tr>
                    `).join('')}
                </tbody>
            `;
            
            // Reemplazar el contenido anterior con la nueva tabla
            contenidoElementDeporte.innerHTML = '';
            contenidoElementDeporte.appendChild(table);
        })
        .catch(error => {
            console.error('Error al obtener datos del backend:', error);
            contenidoElementDeporte.innerHTML = 'Error al obtener datos del backend';
        });
}

document.getElementById("deporte").addEventListener("submit", function(event) {
    event.preventDefault();

    // Captura los valores de los campos
    const nombreDeporte = document.getElementById("nombreDeporte").value;

    // Crea un objeto con los datos que se enviarán a la API
    const deporteData = {
        Depor_Nombre: nombreDeporte
    };

    // Realiza una solicitud POST a la API utilizando fetch
    fetch("http://localhost:3000/api/deporte", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(deporteData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Respuesta de la API:", data);

        // Si la inserción fue exitosa, vacía los campos
        document.getElementById("nombreDeporte").value = "";

        alert("Datos enviados correctamente");
        
        // Actualizar la tabla con los nuevos datos
        cargarTablaDeporte();
    })
    .catch(error => {
        console.error("Error al enviar los datos:", error);
        alert("Ocurrió un error al enviar los datos");
    });
    cargarTablaDeporte();
});