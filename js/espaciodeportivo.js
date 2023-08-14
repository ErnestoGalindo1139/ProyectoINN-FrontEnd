// Limpiar
document.getElementById("btn-limpiar").addEventListener("click", function(event) {
    document.getElementById("nombreEspacioDeportivo").value = "";
});

// Consultar
document.getElementById("btn-consultar").addEventListener("click", function(event) {
    event.preventDefault();

    // Captura el valor del campo "Depor_Id"
    const ED_Id = document.getElementById("ED_Id").value;

    // Realiza una solicitud GET a la API para obtener los datos correspondientes al ID
    fetch(`http://localhost:3000/api/espaciodeportivo/${ED_Id}`)
        .then(response => {
            if (!response.ok) {
                document.getElementById("nombreEspacioDeportivo").value = "";
                throw new Error("El ID ingresado no existe en la base de datos");
            }
            return response.json();
        })
        .then(data => {
            // Llena los campos con los datos obtenidos
            document.getElementById("nombreEspacioDeportivo").value = data.ED_Nombre;
        })
        .catch(error => {
            console.error("Error al obtener los datos:", error);
            alert(error.message); // Muestra el mensaje de error
        });

        cargarTablaEspacioDeportivo();
});

// Modificar
document.getElementById("btn-modificar").addEventListener("click", function(event) {
    event.preventDefault();

    // Captura el valor del campo "Depor_Id"
    const ED_Id = document.getElementById("ED_Id").value;

    // Captura el valor del campo "nombreDeporte"
    const nombreEspacioDeportivo = document.getElementById("nombreEspacioDeportivo").value;

    // Validación: Asegurarse de que se ingrese un ID válido
    if (!ED_Id) {
        alert("Por favor, ingrese un ID para consultar");
        return;
    }

    // Validación: Asegurarse de que el campo nombreDeporte tenga un valor
    if (!nombreEspacioDeportivo) {
        alert("Por favor, complete todos los campos antes de modificar");
        return;
    }

    // Crea un objeto con los datos modificados
    const dataToModify = {
        ED_Nombre: nombreEspacioDeportivo
    };

    // Realiza una solicitud PUT a la API para modificar el registro
    fetch(`http://localhost:3000/api/espaciodeportivo/${ED_Id}`, {
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
        cargarTablaEspacioDeportivo();
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
    const ED_Id = document.getElementById("ED_Id").value;

    // Realiza una solicitud DELETE a la API para borrar el registro correspondiente al ID
    fetch(`http://localhost:3000/api/espaciodeportivo/${ED_Id}`, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
        console.log("Respuesta de la API:", data);
        alert("Registro eliminado correctamente");
        
        // Actualizar la tabla con los nuevos datos después del borrado
        cargarTablaEspacioDeportivo();
    })
    .catch(error => {
        console.error("Error al borrar el registro:", error);
        alert("Ocurrió un error al borrar el registro");
    });
});

// Tabla EspacioDeportivo
const contenidoElementEspacioDeportivo = document.getElementById("contenidoEspacioDeportivo");

function cargarTablaEspacioDeportivo() {
    // Hacer una solicitud GET a la API del backend
    fetch('http://localhost:3000/api/espaciodeportivo')
        .then(response => response.json())
        .then(data => {
            // Crear una tabla para mostrar los datos
            const table = document.createElement('table');
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>ED_Id</th>
                        <th>ED_Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(item => `
                    <tr>
                        <td>${item.ED_Id}</td>
                        <td>${item.ED_Nombre}</td>
                    </tr>
                    `).join('')}
                </tbody>
            `;
            
            // Reemplazar el contenido anterior con la nueva tabla
            contenidoElementEspacioDeportivo.innerHTML = '';
            contenidoElementEspacioDeportivo.appendChild(table);
        })
        .catch(error => {
            console.error('Error al obtener datos del backend:', error);
            contenidoElementEspacioDeportivo.innerHTML = 'Error al obtener datos del backend';
        });
}

document.getElementById("espacioDeportivo").addEventListener("submit", function(event) {
    event.preventDefault();

    // Captura los valores de los campos
    const nombreEspacioDeportivo = document.getElementById("nombreEspacioDeportivo").value;

    // Crea un objeto con los datos que se enviarán a la API
    const EspacioDeportivoData = {
        ED_Nombre: nombreEspacioDeportivo
    };

    // Realiza una solicitud POST a la API utilizando fetch
    fetch("http://localhost:3000/api/espaciodeportivo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(EspacioDeportivoData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Respuesta de la API:", data);

        // Si la inserción fue exitosa, vacía los campos
        document.getElementById("nombreEspacioDeportivo").value = "";

        alert("Datos enviados correctamente");
        
        // Actualizar la tabla con los nuevos datos
        cargarTablaEspacioDeportivo();
    })
    .catch(error => {
        console.error("Error al enviar los datos:", error);
        alert("Ocurrió un error al enviar los datos");
    });
    cargarTablaEspacioDeportivo();
});