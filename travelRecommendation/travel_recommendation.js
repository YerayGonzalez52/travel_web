const btnSearch = document.getElementById('btnSearch');

function recommendationResult() {
    // Obtener el valor del input de búsqueda
    const input = document.getElementById("travelInput").value.toLowerCase();
    console.log("Buscando:", input);  // Verifica lo que se está buscando

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';  // Limpiar resultados previos

    if (!input) {
        resultDiv.innerHTML = 'Please enter a destination or keyword.';
        return;
    }

    // Hacer fetch al archivo JSON
    fetch("travel_recommendation_api.json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la carga del archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            console.log("Datos obtenidos:", data);  // Verifica si el archivo JSON es correcto

            // Buscar la ciudad que coincida con la entrada
            const destination = data.countries
                .flatMap(country => country.cities)
                .find(city => city.name.toLowerCase().includes(input));  // Compara en minúsculas

            // Verificar si se encontró una coincidencia
            if (destination) {
                const image = destination.imageUrl;
                const name = destination.name;
                const description = destination.description;

                resultDiv.innerHTML += `<img src="${image}" alt="${name}">`;
                resultDiv.innerHTML += `<h2>${name}</h2>`;
                resultDiv.innerHTML += `<p>${description}</p>`;
            } else {
                resultDiv.innerHTML = 'No destination found matching your search.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}

// Evento de clic en el botón de búsqueda
btnSearch.addEventListener('click', recommendationResult);
