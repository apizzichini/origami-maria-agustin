// CONFIGURACIÓN INICIAL DEL LIENZO
const canvas = document.getElementById('paperCanvas');
const ctx = canvas.getContext('2d');

let nivelActual = 0;
let papel = { 
    x: 50, 
    y: 50, 
    w: 300, 
    h: 300, 
    color: "#ffffff", 
    pliegues: 0 
};

// DEFINICIÓN DE NIVELES Y VALIDACIONES
const niveles = [
    { 
        titulo: "Nivel 1: Preparación", 
        mision: "Pinta el papel de azul", 
        validar: () => papel.color === "blue" || papel.color === "blue", 
        hint: "pintar('blue')" 
    },
    { 
        titulo: "Nivel 2: Primer Doblez", 
        mision: "Dobla el papel hacia la derecha", 
        validar: () => papel.w === 150, 
        hint: "plegar('derecha')" 
    },
    { 
        titulo: "Nivel 3: El Marcador", 
        mision: "Dobla abajo y pinta de rojo", 
        validar: () => papel.h === 150 && (papel.color === "red" || papel.color === "#ff0000"), 
        hint: "plegar('abajo'); pintar('red')" 
    },
    { 
        titulo: "Nivel 4: La Grulla Sagrada", 
        mision: "Reduce el papel a 75x75 y píntalo de 'gold'", 
        validar: () => papel.w === 75 && papel.h === 75 && papel.color === "gold", 
        hint: "Debes plegar de nuevo y usar gold" 
    }
];

// FUNCIONES QUE EL JUGADOR "PROGRAMA"
function pintar(color) { 
    papel.color = color; 
    return "Papel pintado de " + color; 
}

function plegar(direccion) {
    if(direccion === "derecha") { 
        papel.w /= 2; 
        papel.pliegues++; 
    } else if(direccion === "abajo") { 
        papel.h /= 2; 
        papel.pliegues++; 
    }
    return "Papel plegado hacia la " + direccion;
}

// DIBUJAR EN EL CANVAS
function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Si gana el nivel final, dibujar la grulla
    if (nivelActual === 3 && niveles[3].validar()) {
        dibujarGrulla();
        return;
    }

    ctx.fillStyle = papel.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = "rgba(0,0,0,0.2)";
    ctx.fillRect(papel.x, papel.y, papel.w, papel.h);
    
    // Línea de borde
    ctx.strokeStyle = "#bdc3c7";
    ctx.lineWidth = 2;
    ctx.strokeRect(papel.x, papel.y, papel.w, papel.h);

    // Dibujar líneas de pliegue si existen
    if(papel.pliegues > 0) {
        ctx.beginPath();
        ctx.setLineDash([5, 5]);
        ctx.moveTo(papel.x, papel.y);
        ctx.lineTo(papel.x + papel.w, papel.y + papel.h);
        ctx.stroke();
        ctx.setLineDash([]);
    }
}

function dibujarGrulla() {
    ctx.fillStyle = "gold";
    ctx.beginPath();
    ctx.moveTo(200, 120); 
    ctx.lineTo(280, 250); 
    ctx.lineTo(200, 210); 
    ctx.lineTo(120, 250); 
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.font = "bold 16px Arial";
    ctx.fillText("¡Felicidades, Maestro Origami!", 85, 320);
}

// LÓGICA DEL MOTOR DEL JUEGO
function correrCodigo() {
    const codigo = document.getElementById('codeEditor').value;
    const feedback = document.getElementById('feedback');
    
    try {
        // Ejecuta el código del usuario
        const resultado = eval(codigo);
        dibujar();
        
        // Verifica si cumplió la misión del nivel actual
        if(niveles[nivelActual].validar()) {
            feedback.innerHTML = `<span class="success">✅ ${resultado}. ¡Objetivo cumplido!</span>`;
            setTimeout(pasarNivel, 1500);
        } else {
            feedback.innerHTML = `<span>✔ ${resultado}, pero aún no completas la misión.</span>`;
        }
    } catch(e) {
        feedback.innerHTML = `<span style="color:#ff7675">❌ Error: ${e.message}</span>`;
    }
}

function pasarNivel() {
    nivelActual++;
    if(nivelActual < niveles.length) {
        document.getElementById('lvl-tag').innerText = niveles[nivelActual].titulo;
        document.getElementById('mision-titulo').innerText = niveles[nivelActual].mision;
        document.getElementById('mision-desc').innerHTML = `Pista: <code>${niveles[nivelActual].hint}</code>`;
        document.getElementById('codeEditor').value = "";
        document.getElementById('feedback').innerText = "";
    }
}

// Dibujo inicial
dibujar();
