// Variables Globales
const formularioUser = document.querySelector('#formulario');
const listadoUser = document.getElementById('listado');
const gastoInput = document.querySelector('#gasto');
let arrayGastos = [];


// Funciones
const CrearGasto = (actividad) => {
    let gasto = {
        actividad: actividad
    }

    arrayGastos.push(gasto);
    return gasto;
}

const GuardarDB = () => {
    localStorage.setItem('balance', JSON.stringify(arrayGastos)); //En texto pero formato JSON
    insertList();
}

const insertList = () => {
    listadoUser.innerHTML = ''; //Limpia en un inicio la lista
    arrayGastos = JSON.parse(localStorage.getItem('balance')); //Convertirlo para ser compatible con array

    if(arrayGastos === null){
        arrayGastos = [];
    }else{
        arrayGastos.forEach(element => {
            listadoUser.innerHTML += 
            `<div class="listaColores"><b>${element.actividad}</b><span> <!--float-right --><i class="material-symbols-outlined">done</i><i class="material-symbols-outlined">delete</i></span></div>`;
        });
    }
}

const deleteDB = (actividad) =>{
    let indexArray;
    arrayGastos.forEach((elemento, index) => { //Localizar el Index de forma manual

        if(elemento.actividad === actividad){ 
            indexArray = index;
        }
    });
    arrayGastos.splice(indexArray,1); //Eliminar 1 elemento del array
    GuardarDB();
}

const EditarDB = (actividad) =>{
    //arrayGastos.querySelector(#gasto).value = arrayGastos.children[0].textContent = actividad;
    gastoInput.value = actividad;
    let indexArray = arrayGastos.findIndex((elemento) => 

    elemento.actividad === actividad); //Otra forma de localizar el Index de forma automática
    let gastoUser = document.querySelector('#gasto').value;
    //
    arrayGastos.splice(indexArray,1,gastoUser);
    console.log(gastoUser);
    GuardarDB();
    }
    

// EventListener
formularioUser.addEventListener('submit', (e) =>{
    e.preventDefault(); //prevenir eventos en el sitio
    let gastoUser = document.querySelector('#gasto').value;

    CrearGasto(gastoUser);
    GuardarDB();

    formularioUser.reset();

});

document.addEventListener('DOMContentLoaded', insertList);

listadoUser.addEventListener('click', (e) =>{
    e.preventDefault(); //Hacer únicamente lo que le indique que haga

    if(e.target.innerHTML === 'done' || e.target.innerHTML === 'delete'){
        let text = e.path[2].childNodes[0].innerHTML;
        if(e.target.innerHTML === 'done'){
            //accion de Editar
            EditarDB(text);
        }
        if(e.target.innerHTML === 'delete'){
            //accion de Eliminar
            deleteDB(text);
        }
    }

});