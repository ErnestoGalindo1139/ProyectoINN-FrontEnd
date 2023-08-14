// Realizar la solicitud GET a la API del backend
fetch('http://localhost:3000/api/consultas')
    .then(response => response.json())
    .then(data => {
    const contenidoElement = document.getElementById('contenido');

    // Crear una tabla para mostrar los datos
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>DC_Id</th>
                <th>DC_Fecha</th>
                <th>DE_HoraRegistro</th>
                <th>DC_Temperatura</th>
                <th>DC_Humedad</th>
                <th>DC_NivelLluvia</th>
                <th>DC_IndiceUV</th>
                <th>EDDC_ED_Id</th>
                <th>ED_Nombre</th>
            </tr>
        </thead>
        <tbody>
        ${data.map(item => `
            <tr>
                <td>${item.DC_Id}</td>
                <td>${item.DC_Fecha}</td>
                <td>${item.DE_HoraRegistro}</td>
                <td>${item.DC_Temperatura}</td>
                <td>${item.DC_Humedad}</td>
                <td>${item.DC_NivelLluvia}</td>
                <td>${item.DC_IndiceUV}</td>
                <td>${item.EDDC_ED_Id}</td>
                <td>${item.ED_Nombre}</td>
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
    const contenidoElement = document.getElementById('contenido');
    contenidoElement.innerHTML = 'Error al obtener datos del backend';
    });
