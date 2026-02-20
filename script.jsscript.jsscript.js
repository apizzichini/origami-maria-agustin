const canvas = document.getElementById('origamiCanvas');
const ctx = canvas.getContext('2d');

let nivelActual = 0;
let estadoPapel = { w: 300, h: 300, color: 'white', pliegues: 0 };

const niveles = [
    {
        instrucciones: "NIVEL 1: Variables. Define el color del papel escribiendo: <code>pintar('purple')</code>",
        validar: () => estadoPapel.color === 'purple'
    },
    {
        instrucciones: "NIVEL 2: Funciones. Ahora dobla el papel. Usa <code>plegar('mitad')</code>",
        validar: () => estadoPapel.w < 300
    },
    {
        instrucciones: "NIVEL 3: Bucles (Loops). Vamos a hacer varios pliegues. Escribe un ciclo for: <br><code>for(let i=0; i<3; i++) { plegar('mitad'); }</code>",
        validar: () => estadoPapel.w < 50
    }
];

// Comandos que el usuario puede usar
function pintar(color) {
    estadoPapel.color = color;
    return `Estado: Color cambiado a ${color}`;
}

function plegar(tipo) {
    if(tipo === 'mitad') {
        estadoPapel.w /= 2;
        estadoPapel.h /= 1.2;
        estadoPapel.pliegues++;
        return "Estado: Papel plegado";
    }
}

function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = estadoPapel.color;
    ctx.strokeStyle = "#333";
    
    const x = (canvas.width - estadoPapel.w) / 2;
    const y = (canvas.height - estadoPapel.h) / 2;
    
    ctx.fillRect(x, y, estadoPapel.w, estadoPapel.h);
    ctx.strokeRect(x, y, estadoPapel.w, estadoPapel.h);
    
    // Dibujar líneas de pliegue basadas en la cantidad de veces que se llamó a la función
    for(let i = 0; i < estadoPapel.pliegues; i++) {
        ctx.beginPath();
        ctx.moveTo(x + (i * 10), y);
        ctx.lineTo(x + estadoPapel.w - (i * 10), y + estadoPapel.h);
        ctx.stroke();
    }
}

function correrCodigo() {
    // Obtenemos lo que el usuario escribió (esto simularía un prompt de programación)
    const codigoInput = prompt("Introduce tu código JavaScript:");
    const consola = document.getElementById('console-output');
    
    try {
        const res = eval(codigoInput);
        consola.innerText = "Consola: " + res;
        dibujar();
        
        if(niveles[nivelActual].validar()) {
            consola.innerText += "\n¡SISTEMA: Nivel completado! Cargando siguiente...";
            nivelActual++;
            actualizarNivel();
        }
    } catch(e) {
        consola.innerText = "ERROR DE SINTAXIS: " + e.message;
    }
}

function actualizarNivel() {
    if(nivelActual < niveles.length) {
        document.getElementById('level-num').innerText = `NIVEL ${nivelActual + 1}`;
        document.getElementById('level-instructions').innerHTML = niveles[nivelActual].instrucciones;
    } else {
        document.getElementById('level-instructions').innerText = "¡FELICIDADES! Eres un Master del Code-Gami.";
    }
}

dibujar();
