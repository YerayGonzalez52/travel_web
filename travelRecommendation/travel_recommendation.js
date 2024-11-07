const btnSearch = document.getElementById('btnSearch');

function recommendationResult() {
    const input = document.getElementById("travelInput").value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch("travel_recommendation_api.json")
    .then(response => response.json())
    .then(data => {
        // Buscar en las ciudades de cada país
        let destination = null;

        // Buscar en las ciudades
        for (let country of data.countries) {
            destination = country.cities.find(city => city.name.toLowerCase().includes(input));
            if (destination) break;
        }

        // Buscar en los templos
        if (!destination) {
            destination = data.temples.find(temple => temple.name.toLowerCase().includes(input));
        }

        // Buscar en las playas
        if (!destination) {
            destination = data.beaches.find(beach => beach.name.toLowerCase().includes(input));
        }

        // Mostrar resultados
        if (destination) {
            resultDiv.innerHTML += `<img src="${destination.imageUrl}" alt="${destination.name}">`;
            resultDiv.innerHTML += `<h2>${destination.name}</h2>`;
            resultDiv.innerHTML += `<p>${destination.description}</p>`;
        } else {
            resultDiv.innerHTML = 'Destination not found.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
    });
}

btnSearch.addEventListener('click', recommendationResult);
