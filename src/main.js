/// <reference types="jquery">

const POKEAPI_BASE = "https://pokeapi.co/api/v2/pokemon/"

function fetchPokemon (URL) {

    $.ajax({
        method: "GET",
        url: URL,
        success: response => {
            qTotalPokemons = response.count
            const $contenedorCartas = $("#contenedor-cartas")
            response.results.forEach(pokemon => {
                $contenedorCartas.append(`<div class="col m-1 rounded carta">${pokemon.name}</div>`)
            });
            
        },

        error: () => {
            $("#cargando").text("Hubo un error al cargar")
        }
        
    })
    
}

fetchPokemon (POKEAPI_BASE)