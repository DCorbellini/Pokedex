/// <reference types="jquery">

const POKEAPI_BASE = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40"

function fetchPokemon (URL) {

    $.ajax({
        method: "GET",
        url: URL,
        success: response => {
        },

        error: () => {
            $("#cargando").text("Hubo un error al cargar")
        }
        
    })
    
}

function agregarCarta (response) {
    const $contenedorCartas = $("#contenedor-cartas")
    response.results.forEach(pokemon => {
        $contenedorCartas.append(`<div class="col m-1 rounded carta">${pokemon.name}</div>`)
    });
}
fetchPokemon (POKEAPI_BASE)