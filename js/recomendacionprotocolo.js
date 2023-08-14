// Limpiar
document.getElementById("btn-limpiar").addEventListener("click", function(event) {
    document.getElementById("nombreRecomendacionProtocolo").value = "";;
});

// Consultar
document.getElementById("btn-consultar").addEventListener("click", function(event) {
    event.preventDefault();

    // Captura el valor del campo "Depor_Id"
    const RecoP_Id = document.getElementById("RecoP_Id").value;

    // Realiza una solicitud GET a la API para obtener los datos correspondientes al ID
    fetch(`http://localhost:3000/api/recomendacionprotocolo/${RecoP_Id}`)
        .then(response => {
            if (!response.ok) {
                document.getElementById("nombreRecomendacionProtocolo").value = "";
                throw new Error("El ID ingresado no existe en la base de datos");
            }
            return response.json();
        })
        .then(data => {
            // Llena los campos con los datos obtenidos
            document.getElementById("nombreRecomendacionProtocolo").value = data.RecoP_Protocolo;
        })
        .catch(error => {
            console.error("Error al obtener los datos:", error);
            alert(error.message); // Muestra el mensaje de error
        });

        cargarTablaRecomendacionProtocolo();
});

// Modificar
document.getElementById("btn-modificar").addEventListener("click", function(event) {
    event.preventDefault();

    // Captura el valor del campo "Depor_Id"
    const RecoP_Id = document.getElementById("RecoP_Id").value;

    // Captura el valor del campo "nombreDeporte"
    const nombreRecomendacionProtocolo = document.getElementById("nombreRecomendacionProtocolo").value;

    // Validación: Asegurarse de que se ingrese un ID válido
    if (!RecoP_Id) {
        alert("Por favor, ingrese un ID para consultar");
        return;
    }

    // Validación: Asegurarse de que el campo nombreDeporte tenga un valor
    if (!nombreRecomendacionProtocolo) {
        alert("Por favor, complete todos los campos antes de modificar");
        return;
    }

    // Crea un objeto con los datos modificados
    const dataToModify = {
        RecoP_Protocolo: nombreRecomendacionProtocolo
    };

    // Realiza una solicitud PUT a la API para modificar el registro
    fetch(`http://localhost:3000/api/recomendacionprotocolo/${RecoP_Id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToModify)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al modificar el registro");
        }
        return response.json();
    })
    .then(data => {
        console.log("Respuesta de la API:", data);
        alert("Registro modificado correctamente");

        // Actualizar la tabla con los nuevos datos
        cargarTablaRecomendacionProtocolo();
    })
    .catch(error => {
        console.error("Error al modificar el registro:", error);
        alert("Ocurrió un error al modificar el registro");
    });
});

// Borrar
document.getElementById("btn-borrar").addEventListener("click", function(event) {
    event.preventDefault();

    // Captura el valor del campo "DC_Id"
    const RecoP_Id = document.getElementById("RecoP_Id").value;

    // Realiza una solicitud DELETE a la API para borrar el registro correspondiente al ID
    fetch(`http://localhost:3000/api/recomendacionprotocolo/${RecoP_Id}`, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
        console.log("Respuesta de la API:", data);
        alert("Registro eliminado correctamente");
        
        // Actualizar la tabla con los nuevos datos después del borrado
        cargarTablaRecomendacionProtocolo();
    })
    .catch(error => {
        console.error("Error al borrar el registro:", error);
        alert("Ocurrió un error al borrar el registro");
    });
});

// Tabla RecomendacionProtocolo
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