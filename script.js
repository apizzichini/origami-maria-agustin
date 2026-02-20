// Referencias globales
const canvas = document.getElementById('origamiCanvas');
const ctx = canvas.getContext('2d');
const editor = document.getElementById('codeEditor');
const consola = document.getElementById('console-output');

let nivelActual = 0;
let estadoPapel = { w: 300, h: 300, color: 'white' };

const niveles = [
    { inst: "Escribe: <code>pintar('purple')</code>", val: () => estadoPapel.color === 'purple' },
    { inst: "Escribe: <code>plegar('mitad')</code>", val: () => estadoPapel.w < 300 },
    { inst: "Usa un bucle: <br><code>for(let i=0; i<3; i++){ plegar('mitad'); }</code>", val: () => estadoPapel.w < 50 }
];

// FUNCIONES QUE LLAMA EL USUARIO
window.pintar = function(c) {
    estadoPapel.color = c;
    return "Pintado de " + c;
};

window.plegar = function(t) {
    if(t === 'mitad') {
        estadoPapel.w /= 2;
        return "Plegado realizado";
    }
};

function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = estadoPapel.color;
    const x = (canvas.width - estadoPapel.w) / 2;
    const y = (canvas.height - estadoPapel.h) / 2;
    ctx.fillRect(x, y, estadoPapel.w, estadoPapel.h);
    ctx.strokeRect(x, y, estadoPapel.w, estadoPapel.h);
}

// ESTA ES LA FUNCIÓN QUE ACTIVA EL BOTÓN
window.correrCodigo = function() {
    const texto = editor.value; // Leemos lo que escribiste
    
    try {
        const resultado = eval(texto); // Ejecutamos el código
        consola.innerText = "Resultado: " + resultado;
        dibujar();
        
        // Revisar si pasas de nivel
        if(niveles[nivelActual].val()) {
            consola.innerText += " | ¡Nivel Superado!";
            nivelActual++;
            setTimeout(actualizarInterfaz, 1000);
        }
    } catch(err) {
        consola.innerText = "Error: " + err.message;
    }
};

function actualizarInterfaz() {
    if(nivelActual < niveles.length) {
        document.getElementById('level-num').innerText = "NIVEL " + (nivelActual + 1);
        document.getElementById('level-instructions').innerHTML = niveles[nivelActual].inst;
        editor.value = "";
    } else {
        document.getElementById('level-instructions').innerText = "¡ERES UN CRACK DEL CÓDIGO!";
    }
}

dibujar();
