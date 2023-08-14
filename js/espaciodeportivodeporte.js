// Limpiar
document.getElementById("btn-limpiar").addEventListener("click", function(event) {
    document.getElementById("EDDepor_ED_Id").value = "";
    document.getElementById("EDDepor_Depor_Id").value = "";
});

// Consultar
document.getElementById("btn-consultar").addEventListener("click", function(event) {
    event.preventDefault();

    // Captura el valor del campo "Depor_Id"
    const EDDepor_Id = document.getElementById("EDDepor_Id").value;

    // Realiza una solicitud GET a la API para obtener los datos correspondientes al ID
    fetch(`http://localhost:3000/api/espaciodeportivodeporte/${EDDepor_Id}`)
        .then(response => {
            if (!response.ok) {
                document.getElementById("EDDepor_ED_Id").value = "";
                document.getElementById("EDDepor_Depor_Id").value = "";
                throw new Error("El ID ingresado no existe en la base de datos");
            }
            return response.json();
        })
        .then(data => {
            // Llena los campos con los datos obtenidos
            document.getElementById("EDDepor_ED_Id").value = data.EDDepor_ED_Id;
            document.getElementById("EDDepor_Depor_Id").value = data.EDDepor_Depor_Id;
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

    // Captura el valor del campo "Depor_Id"
    const EDDepor_Id = document.getElementById("EDDepor_Id").value;

    // Captura el valor del campo "nombreDeporte"
    const EDDepor_ED_Id = document.getElementById("EDDepor_ED_Id").value;
    const EDDepor_Depor_Id = document.getElementById("EDDepor_Depor_Id").value;

    // Validación: Asegurarse de que se ingrese un ID válido
    if (!EDDepor_Id) {
        alert("Por favor, ingrese un ID para consultar");
        return;
    }

    if (!EDDepor_ED_Id || !EDDepor_Depor_Id) {
        alert("Por favor, complete todos los campos antes de modificar");
        return;
    }

    // Crea un objeto con los datos modificados
    const dataToModify = {
        EDDepor_ED_Id: EDDepor_ED_Id,
        EDDepor_Depor_Id: EDDepor_Depor_Id
    };

    // Realiza una solicitud PUT a la API para modificar el registro
    fetch(`http://localhost:3000/api/espaciodeportivodeporte/${EDDepor_Id}`, {
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
        cargarTabla();
    })
    .catch(error => {
        console.error("Error al modificar el registro:", error);
        alert("Ocurrió un error al modificar el registro");
    });
});


// Borrar
document.getElementById("btn-borrar").addEventListener("click", function(event) {
    event.preventDefault();

    
    const EDDepor_Id = document.getElementById("EDDepor_Id").value;

    // Realiza una solicitud DELETE a la API para borrar el registro correspondiente al ID
    fetch(`http://localhost:3000/api/espaciodeportivodeporte/${EDDepor_Id}`, {
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

document.getElementById("espaciodeportivodeporte").addEventListener("submit", function(event) {
    event.preventDefault();

    // Captura los valores de los campos
    const EDDepor_ED_Id = document.getElementById("EDDepor_ED_Id").value;
    const EDDepor_Depor_Id = document.getElementById("EDDepor_Depor_Id").value;

    // Validación: Asegurarse de que ambos campos tengan valores
    if (!EDDepor_ED_Id || !EDDepor_Depor_Id) {
        alert("Por favor, complete ambos campos");
        return;
    }

    // Crea un objeto con los datos que se enviarán a la API
    const dataToSend = {
        EDDepor_ED_Id: EDDepor_ED_Id,
        EDDepor_Depor_Id: EDDepor_Depor_Id
    };

    // Realiza una solicitud POST a la API utilizando fetch
    fetch("http://localhost:3000/api/espaciodeportivodeporte", {
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
        document.getElementById("EDDepor_ED_Id").value = "";
        document.getElementById("EDDepor_Depor_Id").value = "";

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
    fetch('http://localhost:3000/api/espaciodeportivodeporte')
        .then(response => response.json())
        .then(data => {
            // Crear una tabla para mostrar los datos
            const table = document.createElement('table');
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>EDDepor_Id</th>
                        <th>EDDepor_ED_Id</th>
                        <th>EDDepor_Depor_Id</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(item => `
                    <tr>
                        <td>${item.EDDepor_Id}</td>
                        <td>${item.EDDepor_ED_Id}</td>
                        <td>${item.EDDepor_Depor_Id}</td>
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
