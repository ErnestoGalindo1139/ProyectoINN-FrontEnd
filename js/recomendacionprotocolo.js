// Tabla EspacioDeportivo
const contenidoElementRecomendacionProtocolo = document.getElementById("contenidoRecomendacionProtocolo");

function cargarTablaRecomendacionProtocolo() {
    // Hacer una solicitud GET a la API del backend
    fetch('http://localhost:3000/api/recomendacionprotocolo')
        .then(response => response.json())
        .then(data => {
            // Crear una tabla para mostrar los datos
            const table = document.createElement('table');
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>RecoP_Id</th>
                        <th>RecoP_Protocolo</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(item => `
                    <tr>
                        <td>${item.RecoP_Id}</td>
                        <td>${item.RecoP_Protocolo}</td>
                    </tr>
                    `).join('')}
                </tbody>
            `;
            
            // Reemplazar el contenido anterior con la nueva tabla
            contenidoElementRecomendacionProtocolo.innerHTML = '';
            contenidoElementRecomendacionProtocolo.appendChild(table);
        })
        .catch(error => {
            console.error('Error al obtener datos del backend:', error);
            contenidoElementRecomendacionProtocolo.innerHTML = 'Error al obtener datos del backend';
        });
}

document.getElementById("recomendacionProtocolo").addEventListener("submit", function(event) {
    event.preventDefault();

    // Captura los valores de los campos
    const nombreRecomendacionProtocolo = document.getElementById("nombreRecomendacionProtocolo").value;

    // Crea un objeto con los datos que se enviarán a la API
    const EspacioRecomendacionProtocolo = {
        RecoP_Protocolo: nombreRecomendacionProtocolo
    };

    // Realiza una solicitud POST a la API utilizando fetch
    fetch("http://localhost:3000/api/recomendacionprotocolo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(EspacioRecomendacionProtocolo)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Respuesta de la API:", data);

        // Si la inserción fue exitosa, vacía los campos
        document.getElementById("nombreRecomendacionProtocolo").value = "";

        alert("Datos enviados correctamente");
        
        // Actualizar la tabla con los nuevos datos
        cargarTablaRecomendacionProtocolo();
    })
    .catch(error => {
        console.error("Error al enviar los datos:", error);
        alert("Ocurrió un error al enviar los datos");
    });
    cargarTablaRecomendacionProtocolo();
});