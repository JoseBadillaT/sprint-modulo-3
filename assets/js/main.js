let cargaFam = document.querySelector("#cargaFam")
cargaFam.addEventListener("change",oncargaFamChange)

let trabajoActiv = document.querySelector("#trabajoActiv")
trabajoActiv.addEventListener("change", activeWorkerChange)

let alerta = document.querySelector("#alerta")

let formulario = document.querySelector("#formulario")

let recorroData = obtenerLocalStorage();
completarTabla(recorroData)

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

        let nombreUsuario = document.querySelector('#nombreUsuario').value;
        if (nombreUsuario == ""){
            //generamos la alerta para que se ingrese texto al campo
            alert("Ingrese su nombre el campo no puede estar vacío")
            return false
            }
            //Estamos verificando que el contenido de nombre sean sólo letras y no números.
        else if ( !( /^[a-zA-Z ]+$/.test(nombreUsuario) ) ){
            //generamos la alerta para que sean ingresadas sólo letras.
            alert("Sólo deben ser letras, no aceptaremos números");
            return false
        }
            //generamos la alerta para que se ingrese un nombre completo
        else if (nombreUsuario.length < 8 ){
            alert("Debe ingresar su nombre completo");
            return false
        }

    let calendario = document.querySelector('#calendar').value;
    let trabajoActiv = Boolean(parseInt( document.querySelector('#trabajoActiv').value));
    let fechaIngreso = document.querySelector('#fechaIngreso').value
    let sueldoBruto = document.querySelector('#sueldoBruto').value;
    if (isNaN(parseInt(sueldoBruto))) sueldoBruto = 0
    let sueldoSemestre = document.querySelector('#sueldoSemestre').value;
    if ( isNaN(parseInt(sueldoSemestre))) sueldoSemestre = 0

    let cargaFam = Boolean(parseInt( document.querySelector('#cargaFam').value));
    let cantCargas = document.querySelector('#cantCargas').value;
    if (isNaN(parseInt(cantCargas))) cantCargas = 0
    let usuariosTabla = document.querySelector('#usuariosTabla').value;


    let persona1 = new persona (nombreUsuario, calendario, trabajoActiv, fechaIngreso, parseInt(sueldoBruto), parseInt(sueldoSemestre), cargaFam, cantCargas)
    let arreglo = [ persona1 ]
    guardarLocalStorage(arreglo)
    recorroData = obtenerLocalStorage()
    completarTabla(recorroData)
    formulario.reset()
})


function persona (nombreUsuario, calendario, trabajoActiv, fechaIngreso, sueldoBruto, sueldoSemestre, cargaFam, cantCargas){
        this.nombreUsuario = nombreUsuario;
        this.calendario = calendario;
        this.trabajoActiv = trabajoActiv;
        this.fechaIngreso = fechaIngreso;
        this.sueldoBruto = sueldoBruto;
        this.sueldoSemestre = sueldoSemestre;
        this.cargaFam = cargaFam;
        this.cantCargas = cantCargas;
    
    this.xCargaFam = function () {
        if (!this.cargaFam ){
            return 0
        }
        
        if(this.sueldoSemestre <= 429899){
            return  16828 
        } else if (this.sueldoSemestre > 429899 <= 627.913){
            return 10327
        }else if (this.sueldoSemestre > 627913 <= 979330){
            return 3264
        }else {
            return 0            
        }
    }
    this.totalCargas = function (){
        if (!this.cargaFam ){
            return 0
        }
        
        return this.cantCargas * this.xCargaFam() 
    }

    this.sueldoFinal = function (){
        return this.totalCargas() + this.sueldoBruto
    }
      
    
    this.asignacionFamiliar = function(){
        if( this.cargaFam ){

        }
        return `Estimado ${this.nombre} ${this.apellido}, usted no tiene asignación familiar`;
    }
    

}


function oncargaFamChange(event){
    let value = event.target.value

    if (Boolean(parseInt(value))){
        document.getElementById("cantCargas").disabled = false
    }else {
        document.getElementById("cantCargas").disabled = true
    }

}


function activeWorkerChange(event){
    let value = event.target.value

    if (Boolean(parseInt(value))){
        document.getElementById("fechaIngreso").disabled= false
        document.getElementById("sueldoBruto").disabled= false
        document.getElementById("sueldoSemestre").disabled= false
    }else {
        document.getElementById("fechaIngreso").disabled = true
        document.getElementById("sueldoBruto").disabled = true
        document.getElementById("sueldoSemestre").disabled = true
    }

}
function guardarLocalStorage( arreglo ){
    let obtenerArreglo = obtenerLocalStorage()
    let arregloActual = obtenerArreglo.concat(arreglo)
    localStorage.setItem('datos', JSON.stringify(arregloActual));

}
function obtenerLocalStorage(){
    let dataParse = JSON.parse ( localStorage.getItem('datos') ) || [] ;
    return dataParse;

}


function completarTabla(data){
    usuariosTabla.innerHTML = '';
    data.forEach(function (element,index){
        const { nombreUsuario, calendario, trabajoActiv, fechaIngreso, sueldoBruto, sueldoSemestre, cargaFam, cantCargas } = element

        let persona1 = new persona(nombreUsuario, calendario, trabajoActiv, fechaIngreso, parseInt(sueldoBruto), parseInt(sueldoSemestre), cargaFam, cantCargas) 

        usuariosTabla.innerHTML += `<tr>
        <td scope="row">${index}</td>
        <td>${persona1.nombreUsuario}</td>
        <td>${persona1.calendario}</td>
        <td>${sino(persona1.trabajoActiv)}</td>
        <td>${persona1.fechaIngreso}</td>
        <td>${persona1.sueldoBruto}</td>
        <td>${persona1.sueldoSemestre}</td>
        <td>${persona1.xCargaFam()}</td>
        <td>${persona1.cantCargas}</td>
        <td>${persona1.totalCargas()}</td>
        <td>${persona1.sueldoFinal()}</td>
        <td>${fechaAntiguedad(persona1.fechaIngreso)}</td>
        </tr>`
    })
}

function sino(value) {
    if (value) {
        return 'Si'
    }
    return 'No'
}



function fechaAntiguedad(fecha1) {
    var fechaIngreso = new Date(fecha1);
    fechaIngreso.setMinutes(fechaIngreso.getMinutes() + fechaIngreso.getTimezoneOffset())
    var fechaActual = new Date();
    var diferencia = fechaActual.getTime() - fechaIngreso.getTime();
    var diasPerma = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    var mesesPerma = Math.floor(diasPerma / 30.44);
    var anhosPerma = Math.floor(mesesPerma / 12);
    var mensaje= ""

    if (anhosPerma > 0) {
        mensaje += `${diasPerma} Dias `
        mensaje += `${mesesPerma} meses `
        mensaje += anhosPerma + ' año' + (anhosPerma > 1 ? 's' : '') + ' y ';
    }
    if (mesesPerma > 0) {
        mensaje += mesesPerma % 12 + ' mes' + (mesesPerma % 12 > 1 ? 'es' : '') + ' y ';
    }
    mensaje += diasPerma % 30 + ' día' + (diasPerma % 30 > 1 ? 's' : '');

    if (fecha1 = " " ){
        return 0
    }

    return mensaje
}

