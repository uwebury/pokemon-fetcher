document.getElementById('fetch-button').addEventListener('click', function() {
    const pokemonInput = document.getElementById('pokemon-input').value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonInput}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon not found');
            }
            return response.json();
        })
        .then(data => {
            displayPokemonInfo(data);
        })
        .catch(error => {
            displayError(error);
        });
});

function displayPokemonInfo(pokemon) {
    const pokemonInfoDiv = document.getElementById('pokemon-info');
    pokemonInfoDiv.innerHTML = `
        <div class="pokemon-card">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <div class="pokemon-details">
                <h2>${pokemon.name}</h2>
                <p><strong>ID:</strong> ${pokemon.id}</p>
                <p><strong>Type:</strong> ${pokemon.types.map(type => type.type.name).join(', ')}</p>
                <p><strong>Height:</strong> ${pokemon.height / 10} m</p>
                <p><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>
            </div>
        </div>
    `;
}

function displayError(error) {
    const pokemonInfoDiv = document.getElementById('pokemon-info');
    pokemonInfoDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
}