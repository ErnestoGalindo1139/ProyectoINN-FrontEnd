document.getElementById("btn-limpiar").addEventListener("click", function(event) {
    document.getElementById("nombreRecomendacionMensaje").value = "";
});


// Tabla EspacioDeportivo
const contenidoElementRecomendacionMensaje = document.getElementById("contenidoRecomendacionMensaje");

function cargarTablaRecomendacionMensaje() {
    // Hacer una solicitud GET a la API del backend
    fetch('http://localhost:3000/api/recomendacionmensaje')
        .then(response => response.json())
        .then(data => {
            // Crear una tabla para mostrar los datos
            const table = document.createElement('table');
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>RecoM_Id</th>
                        <th>RecoM_Mensaje</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(item => `
                    <tr>
                        <td>${item.RecoM_Id}</td>
                        <td>${item.RecoM_Mensaje}</td>
                    </tr>
                    `).join('')}
                </tbody>
            `;
            
            // Reemplazar el contenido anterior con la nueva tabla
            contenidoElementRecomendacionMensaje.innerHTML = '';
            contenidoElementRecomendacionMensaje.appendChild(table);
        })
        .catch(error => {
            console.error('Error al obtener datos del backend:', error);
            contenidoElementRecomendacionMensaje.innerHTML = 'Error al obtener datos del backend';
        });
}

document.getElementById("recomendacionMensaje").addEventListener("submit", function(event) {
    event.preventDefault();

    // Captura los valores de los campos
    const nombreRecomendacionMensaje = document.getElementById("nombreRecomendacionMensaje").value;

    // Crea un objeto con los datos que se enviarán a la API
    const EspacioRecomendacionMensaje = {
        RecoM_Mensaje: nombreRecomendacionMensaje
    };

    // Realiza una solicitud POST a la API utilizando fetch
    fetch("http://localhost:3000/api/recomendacionmensaje", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(EspacioRecomendacionMensaje)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Respuesta de la API:", data);

        // Si la inserción fue exitosa, vacía los campos
        document.getElementById("nombreRecomendacionMensaje").value = "";

        alert("Datos enviados correctamente");
        
        // Actualizar la tabla con los nuevos datos
        cargarTablaRecomendacionMensaje();
    })
    .catch(error => {
        console.error("Error al enviar los datos:", error);
        alert("Ocurrió un error al enviar los datos");
    });
    cargarTablaRecomendacionMensaje();
});