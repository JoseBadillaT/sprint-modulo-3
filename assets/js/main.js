/*El formulario al ser enviado debe dar respuesta a la siguiente consultas (importante, puede
ser visualizada como 8po ficha del trabajador) :
§ Nombre y apellido del trabajador, sueldo actual, monto de la asignación familiar
(Condicionado a si el trabajador 8ene o no 8ene carga familiar y cumple con el rango de
sueldo para tener el beneficio de la asignación familiar).
§ Sueldo Final al que se le suma la asignación familiar.
§ Cuanto 8empo la persona lleva en la empresa tomar en cuenta la fecha de ingreso y la
fecha actual.
§ La Respuesta debe ser expresada de la siguiente forma “La permanencia de Juan Perez en
la empresa es de 3 años 6 meses y 20 días” (Este formato es a modo de ejemplo)*/

//Lo siguiente debe realizarse para cargar los datos desde el formulario.

//let fechaBirthday = new Date(document.getElementById('#fechaBirthday').value)

//let fechaIngreso = new Date(document.getElementById('#fechaIngreso').value)
formulario.addEventListener("click", (e) => {
    e.preventDefault();

    let nombreUsuario = document.getElementById('nombreUsuario').value;
    let calendario = new Date(document.getElementById('calendar').value);
    let trabajoActiv = document.getElementById('trabajoActiv').value;
    let fechaIngreso = new Date(document.getElementById('fechaIngreso').value)
    let sueldoBruto = document.getElementById('sueldoBruto').value;
    let sueldoSemestre = document.getElementById('sueldoSemestre').value;
    let cargaFam = document.getElementById('cargaFam').value;
    let cantCargas = document.getElementById('cantCargas').value;

    console.log(nombreUsuario, calendario, trabajoActiv, fechaIngreso, sueldoBruto, sueldoSemestre, cargaFam, cantCargas);


})


class persona {
    constructor(nombreUsuario, calendario, trabajoActiv, fechaIngreso, sueldoBruto, sueldoSemestre, cargaFam, cantCargas){
        this.nombreUsuario = nombreUsuario
        this.calendario = calendario
        this.trabajoActiv = trabajoActiv
        this.fechaIngreso = fechaIngreso
        this.sueldoBruto = sueldoBruto
        this.sueldoSemestre = sueldoSemestre
        this.cargaFam = cargaFam
        this.cantCargas = cantCargas
    }
    
    
    xCargaFam = function () {
        if (!this.cargas ){
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
    totalCargas = function (){
        if (!this.cargas ){
            return 0
        }
        
        return this.cantCargas * this.xCargaFam() 
    }

    sueldoFinal = function (){
        return this.totalCargas() + this.sueldoBruto
    }


}

function mostrarResultado (persona){
    let alerta = document.getElementById("alerta")
    alerta.innerHTML = "Al trabajador " + persona + " le corresponde valor de familiar " + persona.xCargaFam() + " por su renta del semestre anterior que es de $" + persona.sueldoSemestre + " su numero de cargas es " + persona.cantCargas + " por un monto total de $ " + persona.totalCargas() + ".<br>" + "Su sueldo total es de: $ " + persona.sueldoFinal() + "."
}




function oncargaFamchange (event){
    let value = event.target.value

    if (value==0){
        document.getElementById("cantCargas").disabled = true
    }else {
        document.getElementById("cantCargas").disabled = false
    }
}

