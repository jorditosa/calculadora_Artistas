// Obtencion de datos

const formulario = document.querySelector('#formulario');

let salarioIn = document.querySelector('#salario');
let diasIn = document.querySelector('#dias');
let irpfIn = document.querySelector('#irpf');
// Validaciones
let validClasses = document.getElementsByClassName('valid');
let invalidClasses = document.getElementsByClassName('error');

let salary;
let days;
let irpf;

const resultAlert = document.querySelector('.calculadora__results');
const resultClose = document.querySelector('.result-overlay_close');
const resultBtn = document.querySelector('#formCalc');


// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', iniciarCalc)

function iniciarCalc() {

    console.log("app iniciada");



    salarioIn.addEventListener('input', (e) => {
        return salary = parseFloat(e.target.value);
    })
    diasIn.addEventListener('input', (e) => {
        return days = parseInt(e.target.value);
    })
    irpfIn.addEventListener('input', (e) => {
        return irpf = (parseFloat(e.target.value) / 100);
    })
    // Validamos formulario
    validarformulario();
    formulario.addEventListener('submit', calculadora);
    
    resultClose.addEventListener("click", () => {
        resultAlert.style.display = "none";
    
        // Cuando se cierran los resultados se resetea el formulario
        resetForm();
    });
    
    

// FUNCIONES

function calculadora(e) {
    e.preventDefault();

    let salaryDaily = parseFloat(salary / days);
    let segsocCost;
    let segsocWorker;

    if (isNaN(salary) === false && isNaN(days) === false && isNaN(irpf) === false) {
            // Cálculo COSTE SEG SOCIAL
            switch (true) {
                case (salaryDaily <= 275.00):
                    segsocCost = salaryDaily * days * 0.326;
                    break;
                case (salaryDaily > 275.00 && salaryDaily <= 469.00):
                    segsocCost = 275 * days * 0.326;
                    break;
                case (salaryDaily > 469.00 && salaryDaily <= 843.00):
                    segsocCost = 347 * days * 0.326;
                    break;
                case (salaryDaily > 843.00 && salaryDaily <= 1410.00):
                    segsocCost = 414 * days * 0.326;
                    break;
                default:
                    segsocCost = 551 * days * 0.326;
            }

            // Cálculo NETO
            switch (true) {
                case (salaryDaily <= 275.00):
                    segsocWorker = salaryDaily * days * 0.064;
                    break;
                case (salaryDaily > 275.00 && salaryDaily <= 469.00):
                    segsocWorker = 275 * days * 0.064;
                    break;
                case (salaryDaily > 469.00 && salaryDaily <= 843.00):
                    segsocWorker = 347 * days * 0.064;
                    break;
                case (salaryDaily > 843.00 && salaryDaily <= 1410.00):
                    segsocWorker = 414 * days * 0.064;
                default:
                    segsocWorker = 551 * days * 0.064;
            }

            // control de Bases mñaximas y mínimas
            if (segsocCost > 1349.40) {
                segsocCost = 1349.40;
            }
            if (segsocWorker > 264.92) {
                segsocWorker = 264.92;
            }
            if (salaryDaily < 39) {
                salaryDaily = 39;
            }

            // Calculos e imprimir resultado por pantalla
            // 1. Mostrar valores introducidos
            let inputSalaryShow = document.querySelector('.calculadora__inputs--salary');
            inputSalaryShow.textContent = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(salary));
            let inputDaysShow = document.querySelector('.calculadora__inputs--days');
            inputDaysShow.textContent = `${days} días`
            let inputIrpfShow = document.querySelector('.calculadora__inputs--irpf');
            inputIrpfShow.textContent = `${irpf * 100}%`;

            

            // 2. Mostrar el coste total calculado
            let totalCost = salary + segsocCost;
            let costResult = document.querySelector('.calculadora__coste');
            costResult.textContent = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(totalCost));

            // 3. Mostrar el neto calculado
            parseFloat(irpfGross = salary * irpf);
            let net = salary - segsocWorker - irpfGross;
            let netResult = document.querySelector('.calculadora__neto');
            netResult.textContent = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(net));

            // 4. Mostrandose en pantalla
            //4.1 Primero mostrar por pantalla spinner

            let spinnerBox = document.getElementById('spinnerBox');
            spinnerBox.innerHTML = `
        <div class="spinner result-overlay-spinner">
            <div class="cube1"></div>
            <div class="cube2"></div>
        </div>
        `;

            setTimeout(() => {
                spinnerBox.remove();

                //4.2 Añadir resultados después del spinner
                resultAlert.classList.add('result-overlay');
                resultAlert.style.display = "block";

            }, 1500);

            // Avisos de error en caso de dejar las celdas vacías
    } else {
              
        validarformulario()
            };
        };
};


function validarformulario() {

    let salaryError = document.getElementById('salary-error');
    let daysError = document.getElementById('days-error');
    let irpfError = document.getElementById('irpf-error');

    const salaryVerify = (number) => {
        const regex = /^([0-9]{2,5})/;
        return regex.test(number);
    }
    const daysVerify = (number) => {
        const regex = /^(3[01]|[12][0-9]|[1-9])$/;
        return regex.test(number);
    }
    const irpfVerify = (number) => {
        const regex = /^([0-9]{2})/;
        return regex.test(number);
    }

    // Salario total
    salarioIn.addEventListener('input', () => {
        if ( salaryVerify(salarioIn.value) ) {
            salaryError.classList.add('hide');
        } else {
            salaryError.classList.remove('hide');
        }
    });
    // Días total
    diasIn.addEventListener('input', () => {
        if ( daysVerify(diasIn.value) ) {
            daysError.classList.add('hide');
        }  else {
            daysError.classList.remove('hide');
        }
    });
    // Días total
    irpfIn.addEventListener('input', () => {
        if ( irpfVerify(irpfIn.value) ) {
            irpfError.classList.add('hide');
        }  else {
            irpfError.classList.remove('hide');
        }
    });


}

function resetForm() {
    location.reload();
    iniciarCalc();
}
;