const canvas = document.getElementById('lienzo');
const ctx = canvas.getContext('2d');
const editor = document.getElementById('editor');
const consola = document.getElementById('consola');

let lvl = 0;
let papel = { color: 'white', dobleces: 0, nombre: 'Papel Cuadrado' };

// CONFIGURACIÓN DE NIVELES
const niveles = [
    { m: "Escribe: color('azul')", check: () => papel.color === 'azul', nombre: 'Papel Azul' },
    { m: "Dobla una vez: doblar()", check: () => papel.dobleces === 1, nombre: 'Servilleta' },
    { m: "Haz 2 dobleces: doblar()", check: () => papel.dobleces === 2, nombre: 'Avión de Papel' },
    { m: "Pinta de 'naranja' y dobla", check: () => papel.color === 'naranja' && papel.dobleces === 3, nombre: 'Zorro Origami' },
    { m: "Haz 4 dobleces para un barco", check: () => papel.dobleces === 4, nombre: 'Barco Velero' },
    { m: "Nivel Maestro: Pinta 'oro' y 5 dobleces", check: () => papel.color === 'oro' && papel.dobleces === 5, nombre: 'Grulla Sagrada' }
];

// COMANDOS BÁSICOS (LENGUAJE SIMPLE)
window.color = (c) => { 
    if(c === 'rojo') papel.color = '#ff4d4d';
    else if(c === 'azul') papel.color = '#4d94ff';
    else if(c === 'naranja') papel.color = '#ff944d';
    else if(c === 'oro') papel.color = '#ffd700';
    else papel.color = c;
    return "Pintado";
};

window.doblar = () => { papel.dobleces++; return "Doblado"; };
window.borrar = () => { papel.dobleces = 0; papel.color = 'white'; return "Limpiado"; };

function ejecutar() {
    try {
        const codigo = editor.value;
        eval(codigo);
        dibujar();
        
        if(niveles[lvl].check()) {
            consola.innerText = "¡Excelente! Nivel superado.";
            papel.nombre = niveles[lvl].nombre;
            lvl++;
            setTimeout(sigNivel, 1500);
        } else {
            consola.innerText = "Código ejecutado, pero falta algo...";
        }
    } catch(e) {
        consola.innerText = "Error: Escribe bien los comandos.";
    }
}

function sigNivel() {
    if(lvl < niveles.length) {
        document.getElementById('lvl-tag').innerText = "NIVEL " + (lvl + 1);
        document.getElementById('mision').innerText = "Misión: " + niveles[lvl].m;
        editor.value = "";
    } else {
        alert("¡FELICIDADES! Eres un maestro del Origami.");
    }
}

function dibujar() {
    ctx.clearRect(0, 0, 400, 400);
    ctx.fillStyle = papel.color;
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 3;
    document.getElementById('figura-nombre').innerText = papel.nombre;

    ctx.beginPath();
    if(papel.dobleces === 0) { // Cuadrado
        ctx.rect(100, 100, 200, 200);
    } else if(papel.dobleces === 1) { // Triángulo
        ctx.moveTo(100, 100); ctx.lineTo(300, 100); ctx.lineTo(100, 300);
    } else if(papel.dobleces === 2) { // Avión
        ctx.moveTo(200, 50); ctx.lineTo(300, 300); ctx.lineTo(200, 250); ctx.lineTo(100, 300);
    } else if(papel.dobleces === 3) { // Zorro
        ctx.moveTo(100, 200); ctx.lineTo(200, 100); ctx.lineTo(300, 200); ctx.lineTo(250, 300); ctx.lineTo(150, 300);
    } else if(papel.dobleces === 4) { // Barco
        ctx.moveTo(50, 250); ctx.lineTo(350, 250); ctx.lineTo(300, 300); ctx.lineTo(100, 300); ctx.closePath();
        ctx.moveTo(200, 250); ctx.lineTo(200, 100); ctx.lineTo(300, 250);
    } else { // Grulla
        ctx.moveTo(200, 50); ctx.lineTo(300, 200); ctx.lineTo(200, 350); ctx.lineTo(100, 200); ctx.closePath();
        ctx.moveTo(100, 200); ctx.lineTo(50, 150); ctx.moveTo(300, 200); ctx.lineTo(350, 150);
    }
    ctx.fill();
    ctx.stroke();
}

dibujar();
