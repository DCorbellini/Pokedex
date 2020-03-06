const POKEAPI = "https://pokeapi.co/api/v2/pokemon/"

function fetchPokemon () {
fetch(`${POKEAPI}`).then(response => response.json())
.then (responseJSON => {
    fetchName(responseJSON)
})
.catch(err => {
    console.log ('Error: ', err)
})
}

function fetchName(responseJSON){
    let nombrePokemon
    let $main = document.querySelector("#main")

    for (i=0; i < responseJSON.results.length; i++){
        nombrePokemon = responseJSON.results[i].name;
        let $nuevoP = document.createElement('p')
        $nuevoP.textContent = nombrePokemon
        $main.appendChild($nuevoP)
    }
}

fetchPokemon ()