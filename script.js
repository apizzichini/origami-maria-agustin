const canvas = document.getElementById('origamiCanvas');
const ctx = canvas.getContext('2d');

let nivelActual = 0;
let estadoPapel = { w: 300, h: 300, color: 'white', pliegues: 0 };

const niveles = [
    {
        instrucciones: "NIVEL 1: Define el color. Escribe: <code>pintar('purple')</code>",
        validar: () => estadoPapel.color === 'purple'
    },
    {
        instrucciones: "NIVEL 2: Ahora dobla el papel. Escribe: <code>plegar('mitad')</code>",
        validar: () => estadoPapel.w < 300
    },
    {
        instrucciones: "NIVEL 3: Usa un bucle for para plegar 3 veces:<br><code>for(let i=0; i<3; i++){ plegar('mitad'); }</code>",
        validar: () => estadoPapel.w < 50
    }
];

// Funciones globales para que eval() las encuentre
window.pintar = function(color) {
    estadoPapel.color = color;
    return "Color cambiado a " + color;
}

window.plegar = function(tipo) {
    if(tipo === 'mitad') {
        estadoPapel.w /= 2;
        estadoPapel.pliegues++;
        return "Papel plegado";
    }
}

function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = estadoPapel.color;
    const x = (canvas.width - estadoPapel.w) / 2;
    const y = (canvas.height - estadoPapel.h) / 2;
    ctx.fillRect(x, y, estadoPapel.w, estadoPapel.h);
    ctx.strokeRect(x, y, estadoPapel.w, estadoPapel.h);
}

function correrCodigo() {
    const codigoInput = document.getElementById('codeEditor').value;
    const consola = document.getElementById('console-output');
    
    try {
        // Ejecutamos lo que está en el textarea
        const res = eval(codigoInput);
        consola.style.borderLeftColor = "#00ff41";
        consola.innerText = "Resultado: " + res;
        dibujar();
        
        // Verificar si pasó de nivel
        if(niveles[nivelActual].validar()) {
            consola.innerText += " | ¡Nivel Superado!";
            nivelActual++;
            setTimeout(actualizarNivel, 1000);
        }
    } catch(e) {
        consola.style.borderLeftColor = "#ff4141";
        consola.innerText = "Error: " + e.message;
    }
}

function actualizarNivel() {
    if(nivelActual < niveles.length) {
        document.getElementById('level-num').innerText = "NIVEL " + (nivelActual + 1);
        document.getElementById('level-instructions').innerHTML = niveles[nivelActual].instrucciones;
        document.getElementById('codeEditor').value = "";
    } else {
        alert("¡Has completado todos los niveles!");
    }
}

dibujar();
