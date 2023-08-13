// Limpiar
document.getElementById("btn-limpiar").addEventListener("click", function(event) {
    document.getElementById("nombreDeporte").value = "";
});

// Consultar
document.getElementById("btn-consultar").addEventListener("click", function(event) {
    event.preventDefault();

    // Captura el valor del campo "Depor_Id"
    const Depor_Id = document.getElementById("Depor_Id").value;

    // Realiza una solicitud GET a la API para obtener los datos correspondientes al ID
    fetch(`http://localhost:3000/api/deporte/${Depor_Id}`)
        .then(response => {
            if (!response.ok) {
                document.getElementById("nombreDeporte").value = "";
                throw new Error("El ID ingresado no existe en la base de datos");
            }
            return response.json();
        })
        .then(data => {
            // Llena los campos con los datos obtenidos
            document.getElementById("nombreDeporte").value = data.Depor_Nombre;
        })
        .catch(error => {
            console.error("Error al obtener los datos:", error);
            alert(error.message); // Muestra el mensaje de error
        });

        cargarTablaDeporte();
});

// Modificar
document.getElementById("btn-modificar").addEventListener("click", function(event) {
    event.preventDefault();

    // Captura el valor del campo "Depor_Id"
    const Depor_Id = document.getElementById("Depor_Id").value;

    // Captura el valor del campo "nombreDeporte"
    const nombreDeporte = document.getElementById("nombreDeporte").value;

    // Validación: Asegurarse de que se ingrese un ID válido
    if (!Depor_Id) {
        alert("Por favor, ingrese un ID para consultar");
        return;
    }

    // Validación: Asegurarse de que el campo nombreDeporte tenga un valor
    if (!nombreDeporte) {
        alert("Por favor, complete todos los campos antes de modificar");
        return;
    }

    // Crea un objeto con los datos modificados
    const dataToModify = {
        Depor_Nombre: nombreDeporte
    };

    // Realiza una solicitud PUT a la API para modificar el registro
    fetch(`http://localhost:3000/api/deporte/${Depor_Id}`, {
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
        cargarTablaDeporte();
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
    const Depor_Id = document.getElementById("Depor_Id").value;

    // Realiza una solicitud DELETE a la API para borrar el registro correspondiente al ID
    fetch(`http://localhost:3000/api/deporte/${Depor_Id}`, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
        console.log("Respuesta de la API:", data);
        alert("Registro eliminado correctamente");
        
        // Actualizar la tabla con los nuevos datos después del borrado
        cargarTablaDeporte();
    })
    .catch(error => {
        console.error("Error al borrar el registro:", error);
        alert("Ocurrió un error al borrar el registro");
    });
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