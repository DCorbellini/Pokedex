/// <reference types="jquery">

const POKEAPI_BASE = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40"

function fetchPokemon(URL) {

    $.ajax({
        method: "GET",
        url: URL,
        success: response => {
            agregarCarta(response)
            contarCartas()
        },

        error: () => {
            mensajeError("ajax")
        }

    })

}

function agregarCarta(response) {
    const $contenedorCartas = $("#contenedor-cartas")
    response.results.forEach(pokemon => {
        $contenedorCartas.append(`<div class="col m-1 rounded carta">${pokemon.name}</div>`)
    });
}

function contarCartas() {
    if ($(".carta").length === 40) {
        $("#cargando").detach()
        manejarCartas()
    } else (
        mensajeError('contarCartas')
    )
}

function manejarCartas() {
    $('.carta').click(e => {
        mostarInfoPokemon(e.target.innerText)
    })
}

function mostarInfoPokemon(pokemon) {
    console.log(pokemon)
}


function mensajeError(err) {
    switch (err) {
        case 'ajax':
            $('#cargando').text('Error al cargar la informacion de la API')
            break
        case 'contarCartas':
            $('#cargando').text('Error al mostrar los pokemones')
            break
    }
}

fetchPokemon(POKEAPI_BASE)