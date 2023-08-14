// Limpiar
document.getElementById("btn-limpiar").addEventListener("click", function(event) {
    document.getElementById("nombreRecomendacionMensaje").value = "";
});

// Consultar
document.getElementById("btn-consultar").addEventListener("click", function(event) {
    event.preventDefault();

    // Captura el valor del campo "Depor_Id"
    const RecoM_Id = document.getElementById("RecoM_Id").value;

    // Realiza una solicitud GET a la API para obtener los datos correspondientes al ID
    fetch(`http://localhost:3000/api/recomendacionmensaje/${RecoM_Id}`)
        .then(response => {
            if (!response.ok) {
                document.getElementById("nombreRecomendacionMensaje").value = "";
                throw new Error("El ID ingresado no existe en la base de datos");
            }
            return response.json();
        })
        .then(data => {
            // Llena los campos con los datos obtenidos
            document.getElementById("nombreRecomendacionMensaje").value = data.RecoM_Mensaje;
        })
        .catch(error => {
            console.error("Error al obtener los datos:", error);
            alert(error.message); // Muestra el mensaje de error
        });

        cargarTablaRecomendacionMensaje();
});

// Modificar
document.getElementById("btn-modificar").addEventListener("click", function(event) {
    event.preventDefault();

    // Captura el valor del campo "Depor_Id"
    const RecoM_Id = document.getElementById("RecoM_Id").value;

    // Captura el valor del campo "nombreDeporte"
    const nombreRecomendacionMensaje = document.getElementById("nombreRecomendacionMensaje").value;

    // Validación: Asegurarse de que se ingrese un ID válido
    if (!RecoM_Id) {
        alert("Por favor, ingrese un ID para consultar");
        return;
    }

    // Validación: Asegurarse de que el campo nombreDeporte tenga un valor
    if (!nombreRecomendacionMensaje) {
        alert("Por favor, complete todos los campos antes de modificar");
        return;
    }

    // Crea un objeto con los datos modificados
    const dataToModify = {
        RecoM_Mensaje: nombreRecomendacionMensaje
    };

    // Realiza una solicitud PUT a la API para modificar el registro
    fetch(`http://localhost:3000/api/recomendacionmensaje/${RecoM_Id}`, {
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
        cargarTablaRecomendacionMensaje();
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
    const RecoM_Id = document.getElementById("RecoM_Id").value;

    // Realiza una solicitud DELETE a la API para borrar el registro correspondiente al ID
    fetch(`http://localhost:3000/api/recomendacionmensaje/${RecoM_Id}`, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
        console.log("Respuesta de la API:", data);
        alert("Registro eliminado correctamente");
        
        // Actualizar la tabla con los nuevos datos después del borrado
        cargarTablaRecomendacionMensaje();
    })
    .catch(error => {
        console.error("Error al borrar el registro:", error);
        alert("Ocurrió un error al borrar el registro");
    });
});

// Tabla EspacioDeportivo
const contenidoElementRecomendacionMensaje = document.getElementById("contenidoRecomendacionMensaje");

function cargarTablaRecomendacionMensaje() {
    // Hacer una solicitud GET a la API del backend
    fetch('http://localhost:3000/api/recomendacionmensaje')
        .then(response => response.json())
        .then(data => {
            // Crear una tabla para mostrar los datos
            const table = document.createElement('table');
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>RecoM_Id</th>
                        <th>RecoM_Mensaje</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(item => `
                    <tr>
                        <td>${item.RecoM_Id}</td>
                        <td>${item.RecoM_Mensaje}</td>
                    </tr>
                    `).join('')}
                </tbody>
            `;
            
            // Reemplazar el contenido anterior con la nueva tabla
            contenidoElementRecomendacionMensaje.innerHTML = '';
            contenidoElementRecomendacionMensaje.appendChild(table);
        })
        .catch(error => {
            console.error('Error al obtener datos del backend:', error);
            contenidoElementRecomendacionMensaje.innerHTML = 'Error al obtener datos del backend';
        });
}

document.getElementById("recomendacionMensaje").addEventListener("submit", function(event) {
    event.preventDefault();

    // Captura los valores de los campos
    const nombreRecomendacionMensaje = document.getElementById("nombreRecomendacionMensaje").value;

    // Crea un objeto con los datos que se enviarán a la API
    const EspacioRecomendacionMensaje = {
        RecoM_Mensaje: nombreRecomendacionMensaje
    };

    // Realiza una solicitud POST a la API utilizando fetch
    fetch("http://localhost:3000/api/recomendacionmensaje", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(EspacioRecomendacionMensaje)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Respuesta de la API:", data);

        // Si la inserción fue exitosa, vacía los campos
        document.getElementById("nombreRecomendacionMensaje").value = "";

        alert("Datos enviados correctamente");
        
        // Actualizar la tabla con los nuevos datos
        cargarTablaRecomendacionMensaje();
    })
    .catch(error => {
        console.error("Error al enviar los datos:", error);
        alert("Ocurrió un error al enviar los datos");
    });
    cargarTablaRecomendacionMensaje();
});