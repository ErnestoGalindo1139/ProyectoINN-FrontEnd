// Limpiar
document.getElementById("btn-limpiar").addEventListener("click", function(event) {
    document.getElementById("nombreUsuario").value = "";
    document.getElementById("emailUsuario").value = "";
    document.getElementById("passwordUsuario").value = "";
});

// Consultar
document.getElementById("btn-consultar").addEventListener("click", function(event) {
    event.preventDefault();

    // Captura el valor del campo "Depor_Id"
    const Uio_Id = document.getElementById("Uio_Id").value;

    // Realiza una solicitud GET a la API para obtener los datos correspondientes al ID
    fetch(`http://localhost:3000/api/usuario/${Uio_Id}`)
        .then(response => {
            if (!response.ok) {
                document.getElementById("nombreUsuario").value = "";
                document.getElementById("emailUsuario").value = "";
                document.getElementById("passwordUsuario").value = "";
                throw new Error("El ID ingresado no existe en la base de datos");
            }
            return response.json();
        })
        .then(data => {
            // Llena los campos con los datos obtenidos
                document.getElementById("nombreUsuario").value = data.Uio_Nombre;
                document.getElementById("emailUsuario").value = data.Uio_Correo;
                document.getElementById("passwordUsuario").value = data.Uio_Contrasena;
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

    // Captura el valor del campo "Uio_Id"
    const Uio_Id = document.getElementById("Uio_Id").value;

    // Captura el valor del campo "nombreUsuario"
    const Uio_Nombre = document.getElementById("nombreUsuario").value;
    const Uio_Correo = document.getElementById("emailUsuario").value;
    const Uio_Contrasena = document.getElementById("passwordUsuario").value;

    // Validación: Asegurarse de que se ingrese un ID válido
    if (!Uio_Id) {
        alert("Por favor, ingrese un ID para consultar");
        return;
    }

    if (!Uio_Nombre || !Uio_Correo || !Uio_Contrasena) {
        alert("Por favor, complete todos los campos antes de modificar");
        return;
    }

    // Crea un objeto con los datos modificados
    const dataToModify = {
        Uio_Nombre: Uio_Nombre,
        Uio_Correo: Uio_Correo,
        Uio_Contrasena: Uio_Contrasena
    };

    // Realiza una solicitud PUT a la API para modificar el registro
    fetch(`http://localhost:3000/api/usuario/${Uio_Id}`, {
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

    
    const Uio_Id = document.getElementById("Uio_Id").value;

    // Realiza una solicitud DELETE a la API para borrar el registro correspondiente al ID
    fetch(`http://localhost:3000/api/usuario/${Uio_Id}`, {
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
    fetch("http://localhost:3000/api/usuario/${Uio_Id}", {
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

// TABLA USUARIOS
// document.addEventListener("DOMContentLoaded", () => {
const contenidoElement = document.getElementById("contenido");

function cargarTabla() {
    // Hacer una solicitud GET a la API del backend
    fetch('http://localhost:3000/api/usuario')
        .then(response => response.json())
        .then(data => {
            // Crear una tabla para mostrar los datos
            const table = document.createElement('table');
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Uio_Id</th>
                        <th>Uio_Correo</th>
                        <th>Uio_Contrasena</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(item => `
                    <tr>
                        <td>${item.Uio_Id}</td>
                        <td>${item.Uio_Correo}</td>
                        <td>${item.Uio_Contrasena}</td>
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

    // Cargar la tabla al inicio
    

document.getElementById("usuario").addEventListener("submit", function(event) {
    event.preventDefault();

    // Captura los valores de los campos
    const nombre = document.getElementById("nombreUsuario").value;
    const email = document.getElementById("emailUsuario").value;
    const password = document.getElementById("passwordUsuario").value;

    // Crea un objeto con los datos que se enviarán a la API
    const userData = {
        Uio_Nombre: nombre,
        Uio_Correo: email,
        Uio_Contrasena: password
    };

    // Realiza una solicitud POST a la API utilizando fetch
    fetch("http://localhost:3000/api/usuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Respuesta de la API:", data);

        // Si la inserción fue exitosa, vacía los campos
        document.getElementById("nombreUsuario").value = "";
        document.getElementById("emailUsuario").value = "";
        document.getElementById("passwordUsuario").value = "";

        alert("Datos enviados correctamente");
        
        // Actualizar la tabla con los nuevos datos
        cargarTabla();
    })
    .catch(error => {
        console.error("Error al enviar los datos:", error);
        alert("Ocurrió un error al enviar los datos");
    });
});

// });