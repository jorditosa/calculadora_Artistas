// Variables
const btnEnviar = document.querySelector('#formCalc');
const formulario = document.querySelector('#formulario');

let salarioIn = document.querySelector('#salario');
let diaIn = document.querySelector('#dias');
let irpfIn = document.querySelector('#irpf');

eventListeners();

function eventListeners(){
    // Cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    // Campos del formulario
    salarioIn.addEventListener('blur', validarformulario)
    diaIn.addEventListener('blur', validarformulario)
    irpfIn.addEventListener('blur', validarformulario)
}


// funciones
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('opacity-50')
}

// valida el formulario

function validarformulario(e){

    if(e.target.value.length > 0) {

    } else {
        e.target.style.borderColor = 'red';

        mostrarError();
    }
}

function mostrarError(){
    let mensajeError = document.createElement('p');
    mensajeError.textContent = 'Todos los campos son obligatorios';
    mensajeError.classList.add('error-text');

    const errores = document.querySelectorAll('.error-text');
    if(errores.length === 0){
        formulario.appendChild(mensajeError);
    } else {

    }

    
}