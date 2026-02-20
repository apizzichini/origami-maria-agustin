document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('lienzo');
    const ctx = canvas.getContext('2d');
    const editor = document.getElementById('editor');
    const consola = document.getElementById('consola');
    const profeTxt = document.getElementById('profe-txt');
    const btnRun = document.getElementById('btn-run');
    const btnReset = document.getElementById('btn-reset');

    let lvl = 0;
    let papel = { color: 'white', dobleces: 0, nombre: 'Papel Cuadrado' };

    const niveles = [
        { m: "color('azul')", check: () => papel.color === 'azul', n: 'Papel Azul', desc: "Las funciones reciben 'parámetros' entre paréntesis." },
        { m: "doblar()", check: () => papel.dobleces === 1, n: 'Servilleta', desc: "Ejecutar una función cambia el 'Estado' de tu objeto." },
        { m: "doblar(); doblar()", check: () => papel.dobleces === 3, n: 'Avión de Papel', desc: "El código se lee de arriba hacia abajo (Secuencia)." },
        { m: "color('rojo'); doblar()", check: () => papel.color === 'rojo' && papel.dobleces === 4, n: 'Corazón', desc: "Puedes combinar diferentes funciones." },
        { m: "doblar() hasta tener 6", check: () => papel.dobleces === 6, n: 'Barco Velero', desc: "La repetición manual es tediosa, pronto usaremos bucles." },
        { m: "color('naranja'); doblar()", check: () => papel.color === 'naranja' && papel.dobleces === 7, n: 'Zorro', desc: "Has creado una condición de color y forma." },
        { m: "Llega a 9 dobleces", check: () => papel.dobleces === 9, n: 'Avión Supersónico', desc: "Aumentar la complejidad de los datos (dobleces)." },
        { m: "color('gris'); doblar()", check: () => papel.color === 'gris' && papel.dobleces === 10, n: 'Gorila Origami', desc: "¡Casi un maestro! El Gorila requiere precisión." },
        { m: "Usa un bucle for para llegar a 15", check: () => papel.dobleces >= 15, n: 'Dragón Negro', desc: "Los bucles 'for' repiten tareas automáticamente." },
        { m: "color('oro'); dobleces 20", check: () => papel.color === 'oro' && papel.dobleces >= 20, n: 'Grulla Sagrada', desc: "¡Nivel Máximo! Eres un ingeniero de Origami." }
    ];

    window.color = (c) => { 
        const dict = {'azul':'#3498db', 'rojo':'#e74c3c', 'naranja':'#e67e22', 'gris':'#7f8c8d', 'oro':'#f1c40f'};
        papel.color = dict[c] || c;
        document.getElementById('stat-color').innerText = c;
        return "Color: " + c; 
    };

    window.doblar = () => { 
        papel.dobleces++; 
        document.getElementById('stat-dobleces').innerText = papel.dobleces;
        return "Doblado"; 
    };

    function dibujar() {
        ctx.clearRect(0, 0, 400, 400);
        ctx.fillStyle = papel.color === 'white' ? '#fff' : papel.color;
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        document.getElementById('figura-nombre').innerText = papel.nombre;

        ctx.beginPath();
        // Lógica visual simplificada que cambia según los dobleces
        if(papel.dobleces === 0) ctx.rect(100, 100, 200, 200);
        else if(papel.dobleces < 3) { ctx.moveTo(100, 100); ctx.lineTo(300, 100); ctx.lineTo(100, 300); }
        else if(papel.dobleces < 6) { ctx.moveTo(200, 50); ctx.lineTo(350, 300); ctx.lineTo(50, 300); }
        else if(papel.dobleces < 10) { // Gorila / Zorro
            ctx.moveTo(150, 100); ctx.lineTo(250, 100); ctx.lineTo(300, 250); ctx.lineTo(200, 350); ctx.lineTo(100, 250);
        } else { // Grulla / Barco Pro
            ctx.moveTo(200, 50); ctx.lineTo(300, 200); ctx.lineTo(200, 350); ctx.lineTo(100, 200);
            ctx.moveTo(100, 200); ctx.lineTo(50, 150); ctx.moveTo(300, 200); ctx.lineTo(350, 150);
        }
        ctx.fill(); ctx.stroke();
    }

    btnRun.addEventListener('click', () => {
        try {
            const codigo = editor.value;
            new Function(codigo)(); 
            dibujar();
            
            if(niveles[lvl].check()) {
                consola.innerText = "¡SÍ! " + niveles[lvl].n + " creado.";
                papel.nombre = niveles[lvl].n;
                lvl++;
                setTimeout(actualizarLvl, 1200);
            } else {
                consola.innerText = "Código OK, pero no es lo que pedí.";
            }
        } catch(e) {
            consola.innerText = "ERROR: " + e.message;
        }
    });

    btnReset.addEventListener('click', () => {
        papel = { color: 'white', dobleces: 0, nombre: 'Papel Cuadrado' };
        lvl = 0; // Reinicia niveles también
        actualizarLvl();
        dibujar();
        consola.innerText = "Juego Reiniciado.";
    });

    function actualizarLvl() {
        if(lvl < niveles.length) {
            document.getElementById('lvl-tag').innerText = "NIVEL " + (lvl + 1);
            document.getElementById('mision').innerText = "Misión: " + niveles[lvl].m;
            profeTxt.innerHTML = "<strong>Lección:</strong> " + niveles[lvl].desc;
            editor.value = "";
            document.getElementById('stat-dobleces').innerText = papel.dobleces;
        } else {
            document.getElementById('mision').innerText = "¡GRADUADO!";
            consola.innerText = "Eres un maestro ingeniero de Origami.";
        }
    }

    dibujar();
});
