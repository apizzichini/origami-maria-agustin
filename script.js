let lvl = 0;
let papel = { color: 'white', dobleces: 0, nombre: 'Papel Cuadrado' };

const niveles = [
    { m: "color('azul')", check: () => papel.color === '#3498db', n: 'Papel Azul', leccion: "Las funciones como color() cambian propiedades del papel." },
    { m: "doblar()", check: () => papel.dobleces === 1, n: 'Servilleta', leccion: "doblar() suma 1 al contador de pliegues." },
    { m: "doblar(); doblar()", check: () => papel.dobleces === 3, n: 'Avión de Papel', leccion: "El punto y coma (;) separa órdenes diferentes." },
    { m: "color('rojo'); doblar()", check: () => papel.color === '#e74c3c' && papel.dobleces === 4, n: 'Gorila Baby', leccion: "Puedes cambiar color y forma al mismo tiempo." },
    { m: "Llega a 6 dobleces", check: () => papel.dobleces === 6, n: 'Barco Velero', leccion: "¡Sigue doblando para dar forma!" }
    // El sistema soporta hasta 10 niveles automáticamente
];

// COMANDOS PARA EL USUARIO
window.color = (c) => {
    const colores = { 'azul': '#3498db', 'rojo': '#e74c3c', 'verde': '#2ecc71', 'oro': '#f1c40f' };
    papel.color = colores[c] || c;
    return "Pintado de " + c;
};

window.doblar = () => {
    papel.dobleces++;
    return "Doblado +1";
};

function correrCodigo() {
    const editor = document.getElementById('editor');
    const consola = document.getElementById('consola');
    
    try {
        // Ejecución limpia del código
        const fun = new Function(editor.value);
        fun();
        
        dibujar();
        actualizarInterfaz();
        
        if(niveles[lvl] && niveles[lvl].check()) {
            consola.innerText = "¡Nivel logrado!";
            lvl++;
            setTimeout(proximoNivel, 1000);
        } else {
            consola.innerText = "Código ejecutado correctamente.";
        }
    } catch (e) {
        consola.innerText = "Error: " + e.message;
    }
}

function resetearJuego() {
    papel = { color: 'white', dobleces: 0, nombre: 'Papel Cuadrado' };
    lvl = 0;
    document.getElementById('editor').value = "";
    proximoNivel();
    dibujar();
    document.getElementById('consola').innerText = "Juego reseteado.";
}

function proximoNivel() {
    if (niveles[lvl]) {
        document.getElementById('lvl-tag').innerText = "NIVEL " + (lvl + 1);
        document.getElementById('mision').innerText = "Misión: " + niveles[lvl].m;
        document.getElementById('profe-txt').innerText = niveles[lvl].leccion;
    } else {
        document.getElementById('mision').innerText = "¡MAESTRO ORIGAMI!";
    }
}

function dibujar() {
    const canvas = document.getElementById('lienzo');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 400, 400);
    ctx.fillStyle = papel.color;
    ctx.strokeStyle = "#333";
    
    document.getElementById('stat-dobleces').innerText = papel.dobleces;
    document.getElementById('figura-nombre').innerText = papel.nombre;

    ctx.beginPath();
    // Dibujo cambia según dobleces
    if(papel.dobleces === 0) ctx.rect(100, 100, 200, 200);
    else if(papel.dobleces < 3) { ctx.moveTo(100, 100); ctx.lineTo(300, 100); ctx.lineTo(100, 300); }
    else if(papel.dobleces < 5) { ctx.moveTo(200, 50); ctx.lineTo(350, 300); ctx.lineTo(50, 300); }
    else { ctx.moveTo(100, 200); ctx.lineTo(200, 100); ctx.lineTo(300, 200); ctx.lineTo(200, 300); }
    ctx.fill();
    ctx.stroke();
}

function actualizarInterfaz() {
    if(niveles[lvl-1]) papel.nombre = niveles[lvl-1].n;
}

// Iniciar dibujo al cargar
window.onload = dibujar;
