/// <reference types="jquery">

const POKEAPI_BASE = "https://pokeapi.co/api/v2/pokemon/"

function fetchPokemon (URL) {

    $.ajax({
        method: "GET",
        url: URL,
        success: response => {
            qTotalPokemons = response.count
            const $contenedorCartas = $("#contenedor_cartas")
        },

        error: () => {
            $("#cargando").text("Hubo un error al cargar")
        }
        
    })
    
}

fetchPokemon (POKEAPI_BASE)