// Obtencion de datos
   
let salarioIn = document.querySelector('#salario');
let salary;
let diasIn = document.querySelector('#dias');
let days;
let irpfIn = document.querySelector('#irpf');
let irpf;
const formulario = document.querySelector('#formulario');

const resultAlert = document.querySelector('.calculadora__results');
const resultClose = document.querySelector('.result-overlay_close');
const resultError = document.querySelector('#formCalc');

// EVENT LISTENERS
salarioIn.addEventListener('input', (e) => {
    salary = parseFloat(e.target.value);
    console.log(salary);
})
diasIn.addEventListener('input', (e) => {
    days = parseInt(e.target.value);
    console.log(days);
})
irpfIn.addEventListener('input', (e) => {
    irpf = (parseFloat(e.target.value)/100);
    console.log(irpf);
})
formulario.addEventListener('submit', calculadora);

resultClose.addEventListener("click", () =>{
    resultAlert.style.display = "none";

    // Cuando se cierran los resultados se resetea el formulario
    resetForm();
});



// FUNCIONES
function calculadora(e){
    e.preventDefault();
    

    let salaryDaily = parseFloat(salary / days);
    let segsocCost;
    let segsocWorker;

    try {
        if( isNaN(salary) === false && isNaN(days) === false && isNaN(irpf) === false) {
            // Cálculo COSTE SEG SOCIAL
        switch (true){
            case ( salaryDaily <= 275.00 ):
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
        switch (true){
            case ( salaryDaily <= 275.00 ):
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
        if(segsocCost > 1349.40) {
        segsocCost = 1349.40;
        }
        if(segsocWorker > 264.92) {
            segsocWorker = 264.92;
        }
        if(salaryDaily < 39){
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
        costResult.textContent =  (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(totalCost));
        
        // 3. Mostrar el neto calculado
        parseFloat(irpfGross = salary * irpf);
        let net = salary - segsocWorker - irpfGross;
        let netResult = document.querySelector('.calculadora__neto');
        netResult.textContent = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(net));

        resultAlert.classList.add('result-overlay');
        resultAlert.style.display = "block";

        } else {
           
            let errorMessages = document.querySelectorAll('.form-inputs_item');

            errorMessages.forEach(errors => {
                let errorBox = document.createElement('LABEL');
                errorBox.textContent = "Por favor, introduce datos válidos";
                errorBox.classList.add('error');

                errors.appendChild(errorBox);

                setTimeout(() => {
                    errorBox.remove();
                    resetForm();
                 }, 4000);
            });

           
        };
        
    } catch (error) {
       
    }

    resetForm();

    // Control bases máximas y mínimas

};


function resetForm () {
    formulario.reset();
}



