 //Constructores
 function Seguro(marca, year, tipo){
   this.marca = marca;
   this.year = year;
   this.tipo = tipo;
 }

 //Realiza la cotizacion de los datos
Seguro.prototype.cotizarSeguro = function(){
   /*
    1 = Americano 1.15
    2 = Asiatico 1.05
    3 = Europeo 1.35
   */
   //console.log(this.marca);
   let cantidad;
   const base = 2000;
   switch (this.marca) {
     case '1':
      cantidad = base*1.15;
      break;
     case '2':
      cantidad = base*1.05;
      break;
     case '3':
      cantidad = base*1.35;
      break;
     default:
       break;
   }

//Leer el año
const diferencia = new Date().getFullYear()-this.year;
//Cada año que la diferencia es mayor, el costo va a reducir en un 3%
cantidad -= ((diferencia*3)*cantidad)/100;
/*
SI el seguro es basico se multiplica por un 30% mas
SI el seguro es completo se multiplica por un 50% mas
*/
  if (this.tipo === 'basico') {
    cantidad = cantidad*1.30;
  } else {
    cantidad = cantidad*1.50;
  }
//console.log(cantidad);
return cantidad;
}

function UI(){

}

// LLena las opciones de los años
UI.prototype.llenarOpciones = () => {
  const max = new Date().getFullYear(),
        min = max - 20;
  const selectYear = document.querySelector('#year');
  for (let i = max; i > min; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    selectYear.appendChild(option);
  }
}

//Muestra alertas en pantalla
UI.prototype.mostrarMensaje = function(mensaje, tipo) {
  const div = document.createElement('div');
  if (tipo === 'error') {
    div.classList.add('error');
  } else {
    div.classList.add('correcto');
  }
  div.classList.add('mensaje', 'mt-10');
  div.textContent = mensaje;
  //Insertamos en el HTML
  const formulario = document.querySelector('#cotizar-seguro');
  formulario.insertBefore(div, document.querySelector('#resultado'));

  setTimeout(() => {
    div.remove();
  }, 3000);
}

//Mostrar resultados prototype
UI.prototype.mostrarResultado = (total, seguro)=>{
  const {marca, year, tipo} = seguro;
  let textoMarca;
  switch (marca) {
    case '1':
      textoMarca = 'Americano';
      break;
    case '2':
      textoMarca = 'Asiatico';
      break;
    case '3':
      textoMarca = 'Europeo';
      break;
    default:
      break;
  }
  //Crear un resultado
  const div = document.createElement('div');
  div.classList.add('mt-10');
  div.innerHTML = `
    <p class="header">Tu resumen</p>
    <p class="font-bold">Marca: <span class="font-normal"> ${textoMarca} </span></p>
    <p class="font-bold">Año: <span class="font-normal"> ${year} </span></p>
    <p class="font-bold">Tipo: <span class="font-normal"> ${tipo} </span></p>
    <p class="font-bold">Total: <span class="font-normal"> ${total} </span></p>
  `;
  const resultadoDiv = document.querySelector('#resultado');


  //Mostrar el spiner
  const spinner = document.querySelector('#cargando');
  spinner.style.display = 'block';
  setTimeout(() => {
    spinner.style.display = 'none';
    //Se borra el spinner pero se muestra el resultado
    resultado.appendChild(div);
  }, 3000);
}

//Instanciar UI
const ui = new UI();
console.log(ui);

 document.addEventListener('DOMContentLoaded', () => {
   ui.llenarOpciones(); // llena el select con los años..
 });


addEventListener();
function addEventListener(){
  const formulario = document.querySelector('#cotizar-seguro');
  formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e){
  e.preventDefault();
  //Leer la marca seleccionada
  const marca = document.querySelector('#marca').value;
  //Leer el año seleccionad0
  const year = document.querySelector('#year').value;
  //Leer el tipo seleccionado
  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  if (marca === '' || year === '' || tipo === '') {
    ui.mostrarMensaje('Todos los campos deben ser llenados','error');
    return;
  }
  ui.mostrarMensaje('Cotizando','exito');
  //Ocultar las cotizaciones previas
  const resultados = document.querySelector('#resultado div');
  if (resultados != null) {
    resultados.remove();
  }

  //Instanciar el Seguro
  const seguro = new Seguro(marca, year, tipo);
  const total = seguro.cotizarSeguro();

  //Utilizar el prototype que va a cotizar
  ui .mostrarResultado(total, seguro);
}

//Utilizar el prototype que va a cotizar
