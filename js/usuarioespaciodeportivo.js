document.getElementById("btn-limpiar").addEventListener("click", function(event) {
    document.getElementById("UED_Uio_Id").value = "";
    document.getElementById("UED_ED_Id").value = "";
});

document.getElementById("usuarioespaciodeportivo").addEventListener("submit", function(event) {
    event.preventDefault();

    // Captura los valores de los campos
    const UED_Uio_Id = document.getElementById("UED_Uio_Id").value;
    const UED_ED_Id = document.getElementById("UED_ED_Id").value;

    // Validación: Asegurarse de que ambos campos tengan valores
    if (!UED_Uio_Id || !UED_ED_Id) {
        alert("Por favor, complete ambos campos");
        return;
    }

    // Crea un objeto con los datos que se enviarán a la API
    const dataToSend = {
        UED_Uio_Id: UED_Uio_Id,
        UED_ED_Id: UED_ED_Id
    };

    // Realiza una solicitud POST a la API utilizando fetch
    fetch("http://localhost:3000/api/usuarioespaciodeportivo", {
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
        document.getElementById("UED_Uio_Id").value = "";
        document.getElementById("UED_ED_Id").value = "";

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
    fetch('http://localhost:3000/api/usuarioespaciodeportivo')
        .then(response => response.json())
        .then(data => {
            // Crear una tabla para mostrar los datos
            const table = document.createElement('table');
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>UED_Id</th>
                        <th>UED_Uio_Id</th>
                        <th>UED_ED_Id</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(item => `
                    <tr>
                        <td>${item.UED_Id}</td>
                        <td>${item.UED_Uio_Id}</td>
                        <td>${item.UED_ED_Id}</td>
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
