window.onload = function() {
    document.getElementById("formulario").addEventListener('submit' , function (event) {
        var palabra = event.target.elements[0].value

        if (palabra.length > 0){
            fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + palabra)
            .then(res => {
                if (res.ok)
                    return res.json()
                insertarMensajeError(palabra)
            })
            .then(value => {
                if (value)
                    insertarDefiniciones(value[0].meanings)
                    insertarAudios(value[0].phonetics)
            })
        } else {
            const div = document.getElementById("resultado").innerHTML = "<p> Por favor ingrese una palabra </p>"
            document.getElementById("audios").innerHTML = ''
        }

    })
}

function insertarMensajeError(palabra){
    const div = document.getElementById("resultado")
    const div2 = document.getElementById("audios")
    div.innerHTML = ''
    div2.innerHTML = ''
    const mensaje = document.createElement("p")
    mensaje.innerHTML = "Lo sentimos, la palabra " + "<strong>" +palabra + "</strong>" + " no se encuentra en el diccionario"

    div.appendChild(mensaje)
}

function insertarDefiniciones(definiciones){
    const div = document.getElementById("resultado")
    div.innerHTML = ''
    const titulo = document.createElement('h4')
    titulo.innerHTML = "Las definciones dadas son:"
    const defs = document.createElement("ol")
    definiciones.forEach(function (def) {
        const significado = document.createElement("li")
        const lista = document.createElement('ul')
        significado.innerHTML = "<strong>"+ def.partOfSpeech + "</strong>: "
        def.definitions.forEach(function (i) {
            const definicion = document.createElement("li")
            definicion.innerHTML = i.definition
            if (i.example) definicion.innerHTML += " Ej: " + i.example
            lista.appendChild(definicion)
            
        })
        significado.appendChild(lista)
        defs.appendChild(significado)
    })

    div.appendChild(defs)
}

function insertarAudios(urls) {
    console.log(urls);
    const div = document.getElementById("audios")
    div.innerHTML = ''
    urls.forEach(function (url){
        const pronunciacion = document.createElement('p')
        pronunciacion.innerHTML = "Pronunciacion: " + "<strong>" + url.text + "</strong>"
        if (url.audio){
            const audio = document.createElement('audio')
            audio.setAttribute("controls", true)
            const source = document.createElement('source')
            source.src = url.audio
            source.type = "audio/mpeg"
            audio.appendChild(source)
            div.appendChild(pronunciacion)
            div.appendChild(audio)
        }
    })
}