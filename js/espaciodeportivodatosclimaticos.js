// Limpiar
document.getElementById("btn-limpiar").addEventListener("click", function(event) {
    document.getElementById("EDDC_ED_Id").value = "";
    document.getElementById("EDDC_DC_Id").value = "";
});

// Consultar
document.getElementById("btn-consultar").addEventListener("click", function(event) {
    event.preventDefault();

    // Captura el valor del campo "Depor_Id"
    const EDDC_Id = document.getElementById("EDDC_Id").value;

    // Realiza una solicitud GET a la API para obtener los datos correspondientes al ID
    fetch(`http://localhost:3000/api/espaciodeportivodatosclimaticos/${EDDC_Id}`)
        .then(response => {
            if (!response.ok) {
                document.getElementById("EDDC_ED_Id").value = "";
                document.getElementById("EDDC_DC_Id").value = "";
                throw new Error("El ID ingresado no existe en la base de datos");
            }
            return response.json();
        })
        .then(data => {
            // Llena los campos con los datos obtenidos
            document.getElementById("EDDC_ED_Id").value = data.EDDC_ED_Id;
            document.getElementById("EDDC_DC_Id").value = data.EDDC_DC_Id;
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
    const EDDC_Id = document.getElementById("EDDC_Id").value;

    // Captura el valor del campo "nombreDeporte"
    const EDDC_ED_Id = document.getElementById("EDDC_ED_Id").value;
    const EDDC_DC_Id = document.getElementById("EDDC_DC_Id").value;

    // Validación: Asegurarse de que se ingrese un ID válido
    if (!EDDC_Id) {
        alert("Por favor, ingrese un ID para consultar");
        return;
    }

    if (!EDDC_ED_Id || !EDDC_DC_Id) {
        alert("Por favor, complete todos los campos antes de modificar");
        return;
    }

    // Crea un objeto con los datos modificados
    const dataToModify = {
        EDDC_ED_Id: EDDC_ED_Id,
        EDDC_DC_Id: EDDC_DC_Id
    };

    // Realiza una solicitud PUT a la API para modificar el registro
    fetch(`http://localhost:3000/api/espaciodeportivodatosclimaticos/${EDDC_Id}`, {
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

    
    const EDDC_Id = document.getElementById("EDDC_Id").value;

    // Realiza una solicitud DELETE a la API para borrar el registro correspondiente al ID
    fetch(`http://localhost:3000/api/espaciodeportivodatosclimaticos/${EDDC_Id}`, {
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
