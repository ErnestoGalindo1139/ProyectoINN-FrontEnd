document.getElementById("usuario").addEventListener("submit", function(event) {
    event.preventDefault();

    // Captura los valores de los campos
    const idRecoM = document.getElementById("idRecoM").value;
    const temperaturaDC = document.getElementById("temperaturaDC").value;
    const humedadDC = document.getElementById("humedadDC").value;
    const nivelLluviaDC = document.getElementById("nivelLluviaDC").value;
    const indiceUV = document.getElementById("indiceUV").value;
    const idRecoPDC = document.getElementById("idRecoPDC").value;

    // Obtiene la fecha y hora actual en el formato deseado
    const currentDate = new Date();
    const fecha = currentDate.toISOString().split('T')[0];
    const hora = currentDate.toLocaleTimeString('en-US', { hour12: false });

    // Crea un objeto con los datos que se enviarán a la API
    const dataToSend = {
        idRecoM: idRecoM,
        temperatura: temperaturaDC,
        humedad: humedadDC,
        nivelLluvia: nivelLluviaDC,
        indiceUV: indiceUV,
        idRecoPDC: idRecoPDC,
        fecha: fecha,
        DE_HoraRegistro: hora
    };

    // Realiza una solicitud POST a la API utilizando fetch
    fetch("http://localhost:3000/api/datosclimaticos", {
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
        document.getElementById("idRecoM").value = "";
        document.getElementById("temperaturaDC").value = "";
        document.getElementById("humedadDC").value = "";
        document.getElementById("nivelLluviaDC").value = "";
        document.getElementById("indiceUV").value = "";
        document.getElementById("idRecoPDC").value = "";

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
    fetch('http://localhost:3000/api/datosclimaticos')
        .then(response => response.json())
        .then(data => {
            // Crear una tabla para mostrar los datos climáticos
            const table = document.createElement('table');
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>DC_Id</th>
                        <th>DC_IdRecoM</th>
                        <th>DC_Fecha</th>
                        <th>DE_HoraRegistro</th>
                        <th>DC_Temperatura</th>
                        <th>DC_Humedad</th>
                        <th>DC_NivelLluvia</th>
                        <th>DC_IndiceUV</th>
                        <th>DC_IdRecoP</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(item => `
                    <tr>
                        <td>${item.DC_Id}</td>
                        <td>${item.DC_IdRecoM}</td>
                        <td>${item.DC_Fecha}</td>
                        <td>${item.DE_HoraRegistro}</td>
                        <td>${item.DC_Temperatura}</td>
                        <td>${item.DC_Humedad}</td>
                        <td>${item.DC_NivelLluvia}</td>
                        <td>${item.DC_IndiceUV}</td>
                        <td>${item.DC_IdRecoP}</td>
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
