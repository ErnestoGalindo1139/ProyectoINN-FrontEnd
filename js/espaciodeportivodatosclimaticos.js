document.getElementById("btn-limpiar").addEventListener("click", function(event) {
    document.getElementById("EDDC_ED_Id").value = "";
    document.getElementById("EDDC_DC_Id").value = "";
});

document.getElementById("usuario").addEventListener("submit", function(event) {
    event.preventDefault();

    // Captura los valores de los campos
    const EDDC_ED_Id = document.getElementById("EDDC_ED_Id").value;
    const EDDC_DC_Id = document.getElementById("EDDC_DC_Id").value;

    // Crea un objeto con los datos que se enviarán a la API
    const dataToSend = {
        EDDC_ED_Id: EDDC_ED_Id,
        EDDC_DC_Id: EDDC_DC_Id
    };

    // Realiza una solicitud POST a la API utilizando fetch
    fetch("http://localhost:3000/api/espaciodeportivodatosclimaticos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToSend)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Respuesta de la API:", data);

        // Si la inserción fue exitosa, vacía los campos
        document.getElementById("EDDC_ED_Id").value = "";
        document.getElementById("EDDC_DC_Id").value = "";

        alert("Datos enviados correctamente");
        
        // Actualizar la tabla con los nuevos datos
        cargarTabla();
    })
    .catch(error => {
        console.error("Error al enviar los datos:", error);
        alert("Ocurrió un error al enviar los datos");
    });
});

function cargarTabla() {
    // Hacer una solicitud GET a la API del backend
    fetch('http://localhost:3000/api/espaciodeportivodatosclimaticos')
        .then(response => response.json())
        .then(data => {
            // Crear una tabla para mostrar los datos
            const table = document.createElement('table');
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>EDDC_Id</th>
                        <th>EDDC_ED_Id</th>
                        <th>EDDC_DC_Id</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(item => `
                    <tr>
                        <td>${item.EDDC_Id}</td>
                        <td>${item.EDDC_ED_Id}</td>
                        <td>${item.EDDC_DC_Id}</td>
                    </tr>
                    `).join('')}
                </tbody>
            `;
            
            // Reemplazar el contenido anterior con la nueva tabla
            contenidoElement.innerHTML = '';
            contenidoElement.appendChild(table);
        })
        .catch(error => {
            console.error('Error al obtener datos del backend:', error);
            contenidoElement.innerHTML = 'Error al obtener datos del backend';
        });
}

// Define contenidoElement para mostrar la tabla
const contenidoElement = document.getElementById("contenido");
