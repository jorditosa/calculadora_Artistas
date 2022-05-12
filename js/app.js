//preventDefault
const submit = document.querySelector('#formulario');

submit.addEventListener('submit', (e) => {
    e.preventDefault();
})

// Obtencion de datos
   
let salarioIn = document.querySelector('#salario');
let salary;
let diasIn = document.querySelector('#dias');
let days;
let irpfIn = document.querySelector('#irpf');
let irpf;

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

// calculadora
const formulario = document.querySelector('#formulario');
formulario.addEventListener('submit', calculadora);



function calculadora(){

    let salaryDaily = parseFloat(salary / days);
    console.log(salaryDaily);
    let segsocCost;
    let segsocWorker;

    try {
        if( isNaN(salary) === true|| isNaN(days) === true || isNaN(irpf) === true) {
            throw error;
        }
        
        if ( salaryDaily <= 275.00 ) {
            segsocCost = salaryDaily * days * 0.326;
        } else if (salaryDaily > 275.00 && salaryDaily <= 469.00){
            segsocCost = 275 * days * 0.326;
        } else if (salaryDaily > 469.00 && salaryDaily <= 843.00) {
            segsocCost = 347 * days * 0.326;
        } else if (salaryDaily > 843.00 && salaryDaily <= 1410.00) {
            segsocCost = 414 * days * 0.326;
        } else {
            segsocCost = 551 * days * 0.326;
        }
        
        // Cálculo NETO
        if ( salaryDaily <= 275.00 ) {
            segsocWorker = salaryDaily * days * 0.064;
        } else if (salaryDaily > 275.00 && salaryDaily <= 469.00){
            segsocWorker = 275 * days * 0.064;
        } else if (salaryDaily > 469.00 && salaryDaily <= 843.00) {
            segsocWorker = 347 * days * 0.064;
        } else if (salaryDaily > 843.00 && salaryDaily <= 1410.00) {
            segsocWorker = 414 * days * 0.064;
        } else {
            segsocWorker = 551 * days * 0.064;
        }
    } catch (error) {
        alert('Por favor, introduce datos válidos');
    }

    // Control bases máximas y mínimas

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
    let totalCost = salary + segsocCost;
    let totalCostText = document.querySelector('.calculadora__coste--text');
    let costResult = document.querySelector('.calculadora__coste');

    totalCostText.innerHTML = 'El coste total de la nómina será de: '
    costResult.innerHTML =  totalCost.toFixed(2)+'€.';
    

    parseFloat(irpfGross = salary * irpf);
    let net = salary - segsocWorker - irpfGross;
    let totalResultText = document.querySelector('.calculadora__neto--text');
    let netResult = document.querySelector('.calculadora__neto');

    netResult.innerHTML = net.toFixed(2) +'€.';
    totalResultText.innerHTML = 'El neto a percibir será de: '

};


