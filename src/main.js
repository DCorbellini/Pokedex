/// <reference types="jquery">

const POKEMONES_POR_PAGINA = 40
let paginaActual = 0
const LENGUAJE = 'es'
const POKEAPI_BASE = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${POKEMONES_POR_PAGINA}`
const POKEAPI_SPECIES = `https://pokeapi.co/api/v2/pokemon-species/`
const POKEAPI = `https://pokeapi.co/api/v2/pokemon/`



$('#boton-siguiente').click(e => {
    if(paginaActual>=24){return}
    paginaActual++
    console.log(paginaActual)
    console.log(`https://pokeapi.co/api/v2/pokemon/?offset=${paginaActual*POKEMONES_POR_PAGINA}&limit=${POKEMONES_POR_PAGINA}`)
    $('.carta').remove()
    fetchPokemon(`https://pokeapi.co/api/v2/pokemon/?offset=${paginaActual*POKEMONES_POR_PAGINA}&limit=${POKEMONES_POR_PAGINA}`)
})
$('#boton-anterior').click(e => {
    if(paginaActual<=0){return}
    paginaActual--
    console.log(paginaActual)
    console.log(`https://pokeapi.co/api/v2/pokemon/?offset=${paginaActual*POKEMONES_POR_PAGINA}&limit=${POKEMONES_POR_PAGINA}`)
    $('.carta').remove()
    fetchPokemon(`https://pokeapi.co/api/v2/pokemon/?offset=${paginaActual*POKEMONES_POR_PAGINA}&limit=${POKEMONES_POR_PAGINA}`)
})

function fetchPokemon(URL) {

    $.ajax({
        method: "GET",
        url: URL,
        success: response => {
            agregarCarta(response)
            contarCartas()
        },

        error: () => mensajeError("ajax")

    })

}

function agregarCarta(response) {
    const $contenedorCartas = $("#contenedor-cartas")
    response.results.forEach(pokemon => {
        $contenedorCartas.append(`<div class="col m-1 rounded carta">${pokemon.name}</div>`)
    });
}

function contarCartas() {
    if ($(".carta").length === POKEMONES_POR_PAGINA) {
        $("#cargando").detach()
        manejarCartas()
    } else (
        mensajeError('contarCartas')
    )
}

function manejarCartas() {
    $('.carta').click(e => {
        $('#modal-titulo').text('cargando...')
        $('#modal-imagen').attr('src', '')
        $('#modal-cuerpo').text('')
        $('#modal').modal('toggle')
        mostarInfoPokemon(e.target.innerText)
    })
}

function mostarInfoPokemon(pokemon) {
    $.ajax({
        method: 'GET',
        url: POKEAPI + pokemon,
        success: pokeapi => {
            $.ajax({
                method: 'GET',
                url: POKEAPI_SPECIES + pokemon,
                success: informacion => {
                    let infoPokemon = {
                        nombrePokemon: conseguirNombre(informacion.names),
                        descripcionPokemon: conseguirDescripcion(informacion.flavor_text_entries),
                        URLimagen: pokeapi.sprites.front_default
                    }

                    $('#modal-titulo').text(infoPokemon.nombrePokemon)
                    $('#modal-imagen').attr('src', infoPokemon.URLimagen)
                    $('#modal-cuerpo').text(infoPokemon.descripcionPokemon)
                },
                error: () => mensajeError('infoPokemon')
            })
        },

        error: () => mensajeError('infoPokemon')
    })
}


function conseguirNombre(nombres) {
    for (i = 0; i < nombres.length; i++) {
        if (nombres[i].language.name == LENGUAJE) {
            return nombres[i].name
        }
    }
}

function conseguirDescripcion(descripciones) {
    for (i = 0; i < descripciones.length; i++) {
        if (descripciones[i].language.name == LENGUAJE) {
            return descripciones[i].flavor_text
        }
    }
}


function mensajeError(err) {
    switch (err) {
        case 'ajax':
            $('#cargando').text('Error al cargar la informacion de la API')
            break
        case 'contarCartas':
            $('#cargando').text('Error al mostrar los pokemones')
            break
        case 'infoPokemon':
            $('#modal-titulo').text('Error al buscar la informacion del pokemon')
            break
    }
}

fetchPokemon(POKEAPI_BASE)