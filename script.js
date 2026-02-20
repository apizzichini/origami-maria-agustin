// Esperamos a que todo el HTML cargue antes de activar el JS
document.addEventListener('DOMContentLoaded', () => {
    
    const canvas = document.getElementById('lienzo');
    const ctx = canvas.getContext('2d');
    const editor = document.getElementById('editor');
    const consola = document.getElementById('consola');
    const boton = document.getElementById('btn');

    let lvl = 0;
    let papel = { color: 'white', dobleces: 0, nombre: 'Papel Cuadrado' };

    const niveles = [
        { m: "Escribe: color('azul')", check: () => papel.color === 'azul', nombre: 'Papel Azul' },
        { m: "Dobla una vez: doblar()", check: () => papel.dobleces === 1, nombre: 'Servilleta' },
        { m: "Haz 2 dobleces: doblar()", check: () => papel.dobleces === 2, nombre: 'Avión de Papel' },
        { m: "Pinta de 'naranja' y dobla", check: () => papel.color === 'naranja' && papel.dobleces === 3, nombre: 'Zorro Origami' },
        { m: "Haz 4 dobleces para un barco", check: () => papel.dobleces === 4, nombre: 'Barco Velero' },
        { m: "Nivel Maestro: Pinta 'oro' y 5 dobleces", check: () => papel.color === 'oro' && papel.dobleces === 5, nombre: 'Grulla Sagrada' }
    ];

    // DEFINIMOS LAS FUNCIONES EN EL SCOPE GLOBAL (WINDOW)
    window.color = (c) => { 
        const colores = {
            'rojo': '#ff4d4d',
            'azul': '#4d94ff',
            'naranja': '#ff944d',
            'oro': '#ffd700',
            'verde': '#4dff88'
        };
        papel.color = colores[c] || c;
        return "Color cambiado";
    };

    window.doblar = () => { 
        papel.dobleces++; 
        return "Papel doblado"; 
    };

    window.borrar = () => { 
        papel.dobleces = 0; 
        papel.color = 'white'; 
        return "Reinicio"; 
    };

    // FUNCIÓN DE DIBUJO
    function dibujar() {
        ctx.clearRect(0, 0, 400, 400);
        ctx.fillStyle = papel.color;
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 3;
        document.getElementById('figura-nombre').innerText = papel.nombre;

        ctx.beginPath();
        if(papel.dobleces === 0) {
            ctx.rect(100, 100, 200, 200);
        } else if(papel.dobleces === 1) {
            ctx.moveTo(100, 100); ctx.lineTo(300, 100); ctx.lineTo(100, 300);
        } else if(papel.dobleces === 2) {
            ctx.moveTo(200, 50); ctx.lineTo(300, 300); ctx.lineTo(200, 250); ctx.lineTo(100, 300);
        } else if(papel.dobleces === 3) {
            ctx.moveTo(100, 200); ctx.lineTo(200, 100); ctx.lineTo(300, 200); ctx.lineTo(250, 300); ctx.lineTo(150, 300);
        } else if(papel.dobleces === 4) {
            ctx.moveTo(50, 250); ctx.lineTo(350, 250); ctx.lineTo(300, 300); ctx.lineTo(100, 300); ctx.closePath();
            ctx.moveTo(200, 250); ctx.lineTo(200, 100); ctx.lineTo(300, 250);
        } else {
            ctx.moveTo(200, 50); ctx.lineTo(300, 200); ctx.lineTo(200, 350); ctx.lineTo(100, 200); ctx.closePath();
            ctx.moveTo(100, 200); ctx.lineTo(50, 150); ctx.moveTo(300, 200); ctx.lineTo(350, 150);
        }
        ctx.fill();
        ctx.stroke();
    }

    // CONECTAMOS EL BOTÓN MANUALMENTE AQUÍ
    boton.addEventListener('click', () => {
        try {
            const codigo = editor.value;
            // Evaluamos el código
            new Function(codigo)(); 
            dibujar();
            
            if(niveles[lvl].check()) {
                consola.innerText = "¡LOGRADO! Pasando de nivel...";
                papel.nombre = niveles[lvl].nombre;
                lvl++;
                setTimeout(actualizarMision, 1500);
            } else {
                consola.innerText = "Código ejecutado. ¡Sigue intentando!";
            }
        } catch(e) {
            consola.innerText = "ERROR: " + e.message;
            console.error(e);
        }
    });

    function actualizarMision() {
        if(lvl < niveles.length) {
            document.getElementById('lvl-tag').innerText = "NIVEL " + (lvl + 1);
            document.getElementById('mision').innerText = "Misión: " + niveles[lvl].m;
            editor.value = "";
            dibujar();
        } else {
            consola.innerText = "¡ERES UN MAESTRO DEL ORIGAMI!";
        }
    }

    // Dibujo inicial
    dibujar();
});
