// Limpiar
document.getElementById("btn-limpiar").addEventListener("click", function(event) {
    document.getElementById("idRecoM").value = "";
    document.getElementById("temperaturaDC").value = "";
    document.getElementById("humedadDC").value = "";
    document.getElementById("nivelLluviaDC").value = "";
    document.getElementById("indiceUV").value = "";
    document.getElementById("idRecoPDC").value = "";
});

// Consultar
document.getElementById("btn-consultar").addEventListener("click", function(event) {
    event.preventDefault();

    // Captura el valor del campo "DC_Id"
    const DC_Id = document.getElementById("DC_Id").value;

    // Realiza una solicitud GET a la API para obtener los datos correspondientes al ID
    fetch(`http://localhost:3000/api/datosclimaticos/${DC_Id}`)
        .then(response => {
            if (!response.ok) {
                document.getElementById("idRecoM").value = "";
                document.getElementById("temperaturaDC").value = "";
                document.getElementById("humedadDC").value = "";
                document.getElementById("nivelLluviaDC").value = "";
                document.getElementById("indiceUV").value = "";
                document.getElementById("idRecoPDC").value = "";
                throw new Error("El ID ingresado no existe en la base de datos");
            }
            return response.json();
        })
        .then(data => {
            // Llena los campos con los datos obtenidos
            document.getElementById("idRecoM").value = data.DC_IdRecoM;
            document.getElementById("temperaturaDC").value = data.DC_Temperatura;
            document.getElementById("humedadDC").value = data.DC_Humedad;
            document.getElementById("nivelLluviaDC").value = data.DC_NivelLluvia;
            document.getElementById("indiceUV").value = data.DC_IndiceUV;
            document.getElementById("idRecoPDC").value = data.DC_IdRecoP;
        })
        .catch(error => {
            console.error("Error al obtener los datos:", error);
            alert(error.message); // Muestra el mensaje de error
        });

    cargarTabla();
});

// Modificar
document.getElementById("btn-modificar").addEventListener("click", function(event) {
    event.preventDefault();

    // Captura el valor del campo "DC_Id"
    const DC_Id = document.getElementById("DC_Id").value;
    
    // Validación: Asegurarse de que se ingrese un ID válido
    if (!DC_Id) {
        alert("Por favor, ingrese un ID para consultar");
        return;
    }

    // Realiza una solicitud GET a la API para verificar si el ID existe
    fetch(`http://localhost:3000/api/datosclimaticos/${DC_Id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("El ID ingresado no existe en la base de datos");
            }
            return response.json();
        })
        .then(data => {
            // Verifica que todos los campos tengan información
            const idRecoM = document.getElementById("idRecoM").value;
            const temperatura = document.getElementById("temperaturaDC").value;
            const humedad = document.getElementById("humedadDC").value;
            const nivelLluvia = document.getElementById("nivelLluviaDC").value;
            const indiceUV = document.getElementById("indiceUV").value;
            const idRecoPDC = document.getElementById("idRecoPDC").value;

            if (!idRecoM || !temperatura || !humedad || !nivelLluvia || !indiceUV || !idRecoPDC) {
                alert("Por favor, complete todos los campos antes de modificar");
                return;
            }

            // Crea un objeto con los datos modificados
            const dataToModify = {
                idRecoM: idRecoM,
                temperatura: temperatura,
                humedad: humedad,
                nivelLluvia: nivelLluvia,
                indiceUV: indiceUV,
                idRecoPDC: idRecoPDC
            };

            // Realiza una solicitud PUT a la API para modificar el registro
            fetch(`http://localhost:3000/api/datosclimaticos/${DC_Id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToModify)
            })
            .then(response => response.json())
            .then(data => {
                console.log("Respuesta de la API:", data);
                alert("Registro modificado correctamente");

                // Actualizar la tabla con los nuevos datos
                cargarTabla();
            })
            .catch(error => {
                console.error("Error al modificar el registro:", error);
                alert("Ocurrió un error al modificar el registro");
            });
        })
        .catch(error => {
            console.error("Error al obtener los datos:", error);
            alert(error.message);
        });
});

// Borrar
document.getElementById("btn-borrar").addEventListener("click", function(event) {
    event.preventDefault();

    // Captura el valor del campo "DC_Id"
    const DC_Id = document.getElementById("DC_Id").value;

    // Realiza una solicitud DELETE a la API para borrar el registro correspondiente al ID
    fetch(`http://localhost:3000/api/datosclimaticos/${DC_Id}`, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
        console.log("Respuesta de la API:", data);
        alert("Registro eliminado correctamente");
        
        // Actualizar la tabla con los nuevos datos después del borrado
        cargarTabla();
    })
    .catch(error => {
        console.error("Error al borrar el registro:", error);
        alert("Ocurrió un error al borrar el registro");
    });
});



document.getElementById("datosclimaticos").addEventListener("submit", function(event) {
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
