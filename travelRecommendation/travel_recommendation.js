const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');

function recommendationResult() {
    const input = document.getElementById("travelInput").value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch("travel_recommendation_api.json")
    .then(response => response.json())
    .then(data => {
        // Array para almacenar todas las coincidencias
        let destinations = [];

        // Buscar en las ciudades de cada país
        data.countries.forEach(country => {
            const matchingCities = country.cities.filter(city => city.name.toLowerCase().includes(input));
            destinations = destinations.concat(matchingCities);
        });

        // Buscar en los templos
        const matchingTemples = data.temples.filter(temple => temple.name.toLowerCase().includes(input));
        destinations = destinations.concat(matchingTemples);

        // Buscar en las playas
        const matchingBeaches = data.beaches.filter(beach => beach.name.toLowerCase().includes(input));
        destinations = destinations.concat(matchingBeaches);

        // Mostrar resultados
        if (destinations.length > 0) {
            destinations.forEach(destination => {
                resultDiv.innerHTML += `
                    <div class="destination">
                        <img src="${destination.imageUrl}" alt="${destination.name}">
                        <h2>${destination.name}</h2>
                        <p>${destination.description}</p>
                    </div>
                `;
            });
        } else {
            resultDiv.innerHTML = 'Destination not found.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
    });
}

function clearResults(){
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
}

btnSearch.addEventListener('click', recommendationResult);
btnClear.addEventListener('click', clearResults);
