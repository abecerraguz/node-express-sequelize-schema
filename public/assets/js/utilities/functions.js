import * as UI from './interfaz.js';
// import dotenv from 'dotenv';
// dotenv.config();

import {  
    checkString,
    checkCelular
} from './validacionForm.js'


export const openClearModal = (e) => {
    e.preventDefault();
    UI.modalPacientes.toggle();
    UI.nombre.value = '';
    UI.apellido.value = '';
    UI.sexo.value = 'Seleccione Sexo';
    UI.fechaNacimiento.value = '';
    UI.ciudad.value = '';
    UI.estado.value = '';
    UI.telefono.value = '';
}


export const openModalNuevoPaciente = (e) => {
    e.preventDefault();
    UI.modalNuevoPacientes.toggle();
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
    console.log('Salidaaaaaa--->',nombre)
    console.log('Salidaaaaaa--->',apellido)
    console.log('Salidaaaaaa--->',sexo)
    console.log('Salidaaaaaa--->',fechaNacimiento)
    console.log('Salidaaaaaa--->',ciudad)
    console.log('Salidaaaaaa--->',estado)
    console.log('Salidaaaaaa--->',telefono)

    const nuevoPaciente = new Paciente( nombre, apellido, sexo,fechaNacimiento, ciudad, estado, telefono )
    const datosParaEnviar = {
        pk_idPaciente: nuevoPaciente.pk_idPaciente,
                nombre: nuevoPaciente.nombre,
                apellido: nuevoPaciente.apellido,
                sexo: nuevoPaciente.sexo,
                fechaNacimiento: nuevoPaciente.fechaNacimiento,
                ciudad: nuevoPaciente.ciudad,
                estado: nuevoPaciente.estado,
                telefono:nuevoPaciente.telefono
    }


        
    if( checkString(nombre) && checkString(apellido) && checkString(ciudad) &&  checkString(estado) ){
        axios.post('/api/pacientes',datosParaEnviar)
        .then( () => {
            UI.modalNuevoPacientes.toggle();
            location.reload();
        })
        .catch( err =>{
            Swal.fire({
                position: 'center',
                icon: 'info',
                text: `${err.response.data.msg}`,
                showConfirmButton: false,
                timer: 2500
            })
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

