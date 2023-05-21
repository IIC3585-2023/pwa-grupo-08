
// Obtener elementos del DOM
const noteInput = document.getElementById('note-input');
const noteOutput = document.getElementById('note-output');
const noteTitle = document.getElementById('note-title');
const noteSignatute = document.getElementById('note-signature');
let noteHighlight = false

// Escuchar eventos de entrada en la nota
noteInput.addEventListener('input', updateNote);

function updateNote() {
    const noteText = noteInput.value;
    noteOutput.textContent = noteText;
}

// Escuchar eventos de entrada en la nota
noteInput.addEventListener('input', updateNote);

function updateNote() {
    const noteText = noteInput.value;
    noteOutput.textContent = noteText;
}

// Función para alternar la visibilidad del título en la nota
function toggleTitle(buttonNumber) {
    const button = document.querySelector(`.sidebar ul li:nth-child(${buttonNumber})`);
    const title = button.querySelector('.title');
    button.classList.toggle('active');
    title.style.display = (button.classList.contains('active')) ? 'block' : 'none';
}

// Función para alternar la visibilidad de los elementos
function toggleElement(elementId) {
    const element = document.getElementById(elementId);
    element.classList.toggle('hidden');
}

function toggleDivVisibility(divId) {
    var div = document.getElementById(divId);
    if (div.style.display === 'none') {
        div.style.display = 'block'; // Mostrar el div
    } else {
        div.style.display = 'none'; // Ocultar el div
    }
}

function onSubmit() {
    console.log("SUBMIT");
    console.log(noteHighlight.value);
}

function onHighlightChange(){
    noteHighlight = !noteHighlight;
    console.log(noteHighlight);
}
