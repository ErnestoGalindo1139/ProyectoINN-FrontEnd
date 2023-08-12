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
    cargarTabla();
});

// });

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