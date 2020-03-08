/// <reference types="jquery">

const POKEAPI_BASE = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40"

function fetchPokemon (URL) {

    $.ajax({
        method: "GET",
        url: URL,
        success: response => {
            agregarCarta (response)
            contarCartas ()
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

function contarCartas () {
    if($(".carta").length===40){
        $("#cargando").detach()
    }
}

fetchPokemon (POKEAPI_BASE)