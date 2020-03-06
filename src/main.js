const POKEAPI = "https://pokeapi.co/api/v2/pokemon/"

function fetchPokemon () {
fetch(`${POKEAPI}`).then(response => response.json())
.catch(err => {
    console.log ('Error: ', err)
})
}

fetchPokemon ()