/*PARA ACLARAR, DE AQUÍ LO ÚNICO QUE PUEDEN RESCATAR ES 
desde la linea 9 a la 13
desde la 106 a la 126 que sirve para apagar los campos del select que no se
utilizan cuando le ponen "no", espero que sirva de algo, todo lo demas
me da error y no me da resultados pero ya tengo que dormir y no puedo
seguir intentando xd se me fundió el cerebro
*/


let cargaFam = document.getElementById("cargaFam")
cargaFam.addEventListener("change", oncargaFamChange)

let trabajoActiv = document.getElementById("trabajoActiv")
trabajoActiv.addEventListener("change", activeWorkerChange)

let alerta = document.getElementById("alerta")

let formulario = document.getElementById("formulario")


formulario.addEventListener ("submit", (e) =>{
        e.preventDefault()

    let usuario = document.querySelector("#usuario").value;
    let fechaNac = document.querySelector("#fechaNac").value;
    let trabajoActiv = document.querySelector("#trabajoActiv").value;
    let fechaIngreso = document.querySelector("#fechaIngreso").value;
    let sueldoBruto = document.querySelector("#sueldoBruto").value;
    let sueldoSemestre = document.querySelector("#sueldoSemestre").value;
    let cargaFam = document.querySelector("#cargaFam").value;
    let cantCargas = document.querySelector("#cantCargas").value;

    console.log(usuario, fechaNac, trabajoActiv, fechaIngreso, sueldoBruto, sueldoSemestre, cargaFam, cantCargas)
    let persona1 = new trabajador (usuario, fechaNac, Boolean(parseInt(trabajoActiv), fechaIngreso, parseInt(sueldoBruto), parseInt(sueldoSemestre), Boolean(parseInt(cargaFam)), parseInt(cantCargas)))

    mostrarResultado(persona1)

})

class trabajador {
    constructor(usuario, fechaNac, trabajoActiv, fechaIngreso, sueldoBruto, sueldoSemestre, cargaFam, cantCargas){
        this.usuario = usuario
        this.fechaNac = fechaNac
        this.trabajoActiv = trabajoActiv
        this.fechaIngreso = fechaIngreso
        this.sueldoBruto = sueldoBruto
        this.sueldoSemestre = sueldoSemestre
        this.cargaFam = cargaFam
        this.cantCargas = cantCargas
    }

porCargaFam = function (){
    if (!this.cantCargas){
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

totalCargas = function(){
    if (!this.cantCargas){
        return 0
    }

    return this.cantCargas * this.porCargaFam()
} 

sueldoMasCargas = function(){
    return this.totalCargas+ this.sueldoBruto
}

}

function mostrarResultado (trabajador){
    let alerta = document.getElementById("alerta")
    alerta.innerHTML = 
    
    "Se informa que " + trabajador.usuario + 
    
    "  cuya fecha de nacimiento es: " + trabajador.fechaNac + 
    
    " tiene " + trabajador.cantCargas + " cargas familiares," + 
    + " lo que equivale a un monto de $ " + trabajador + ".  Su sueldo actual es de " + trabajador.sueldoBruto + "y su sueldo con carga familiar agregada es de " + trabajador.sueldoMasCargas + ".    </br>"
    + "</br>" + "Antiguedad Laboral" + "</br>." + "La permanencia de " + trabajador.usuario + " en la empresa es de " + trabajador.anios + " años " + trabajador.meses + " meses y " + trabajador.dias + " días. "
}    




//FALTA DEFINIR AÑOS MESES Y DIAS, A MI NO ME SALIÓ :( MIAU

//BUENO, AHORA QUE LO VEO NO ME ESTÁ AGARRANDO NINGUNO DE LOS ELEMENTOS QUE LE PEDÍ
//AL MENOS LAS FUNCIONES PARA APAGAR LOS CALENDARIOS CUANDO LE PONEN QUE "NO", FUNCIONA XD ALGO ES ALGO
//YA SON LAS 6, TENGO QUE TRABAJAR A LAS 10, AHH! QUE LES  VAYA BIEN C:




function oncargaFamChange(event){
    let value = event.target.value

    if (value==0){
        document.getElementById("cantCargas").disabled = false
    }else {
        document.getElementById("cantCargas").disabled = true
    }

}


function activeWorkerChange(event){
    let value = event.target.value

    if (value==0){
        document.getElementById("fechaIngreso").disabled= false
    }else {
        document.getElementById("fechaIngreso").disabled = true
    }

}
