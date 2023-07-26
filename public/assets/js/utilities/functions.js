import * as UI from './interfaz.js';
// import dotenv from 'dotenv';
// dotenv.config();

import {  
    checkString,
    checkCelular
} from './validacionForm.js'


export const openModal = (e) => {
    e.preventDefault();
    UI.modalPacientes.toggle();
}

export const infoModal = (info) =>{
    UI.modalInfoAlert.toggle();
    UI.infoMensaje.innerHTML = info
}

class Paciente {

    constructor(nombre,apellido,sexo,fechaNacimiento,ciudad,estado,telefono){

        this.pk_idPaciente= this.generarID();
        this.nombre = nombre;
        this.apellido = apellido;
        this.sexo = sexo;
        this.fechaNacimiento = fechaNacimiento;
        this.ciudad = ciudad;
        this.estado = estado;
        this.telefono = telefono;

    }

    generarID() {
        // Generar un número aleatorio entre 1 y 9999
        const numeroAleatorio = Math.floor(Math.random() * 9999) + 1;
        // Completar con ceros a la izquierda para tener 4 dígitos
        const idConCeros = numeroAleatorio.toString().padStart(4, '0');
        // Unir el prefijo 'P-' con el ID de 4 dígitos
        return `P-${idConCeros}`;
    }

}


// Validacion al hacer submit nuevo usuario
export const validarNuevoPaciente = (e) => {

    e.preventDefault();
    let nombre = e.target.nombre.value,
    apellido = e.target.apellido.value,
    sexo = e.target.sexo.value,
    fechaNacimiento = e.target.fechaNacimiento.value,
    ciudad = e.target.ciudad.value,
    estado = e.target.estado.value,
    telefono = e.target.telefono.value

    if( checkString(nombre) && checkString(apellido) && checkString(ciudad) &&  checkString(estado) ){
        
        const nuevoPaciente = new Paciente(nombre, apellido, sexo,fechaNacimiento, ciudad, estado, telefono )
        console.log('Salida de nuevoPaciente', nuevoPaciente )
        console.log('Salida de nuevoPaciente', nuevoPaciente.telefono )
        axios.post('/api/pacientes',{
            pk_idPaciente: nuevoPaciente.pk_idPaciente,
            nombre: nuevoPaciente.nombre,
            apellido: nuevoPaciente.apellido,
            sexo: nuevoPaciente.sexo,
            fechaNacimiento: nuevoPaciente.fechaNacimiento,
            ciudad: nuevoPaciente.ciudad,
            estado: nuevoPaciente.estado,
            telefono:nuevoPaciente.telefono
        })
        .then( () => {
            UI.modalPacientes.toggle();
            location.reload();
        })
    }else{
        Swal.fire({
            position: 'center',
            icon: 'info',
            text: 'Debe ingresar todos los campos!',
            showConfirmButton: false,
            timer: 2500
        })
    }
}

