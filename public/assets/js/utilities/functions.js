import * as UI from './interfaz.js';


import {  
    checkString,
    checkCelular
} from './validacionForm.js'


export const openModalNuevoDataInput = (e) => {
    e.preventDefault();
    const modalNuevoPacientes = new bootstrap.Modal(document.getElementById('modalAddDataInput'), {keyboard: false})
    modalNuevoPacientes.toggle();
}

export const infoModal = (info) => {
    UI.modalInfoAlert.toggle();
    UI.infoMensaje.innerHTML = info
}

class Paciente{

    constructor( nombre, apellido, sexo, fechaNacimiento, ciudad, estado, telefono ){

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

class Especialista{

    constructor( nombre, apellido, sexo, fechaNacimiento, especialidad ){

        this.pk_idEspecialista = this.generarID();
        this.nombre = nombre;
        this.apellido = apellido;
        this.sexo = sexo;
        this.fechaNacimiento = fechaNacimiento;
        this.especialidad = especialidad;

    }

    generarID() {
        // Generar un número aleatorio entre 1 y 9999
        const numeroAleatorio = Math.floor(Math.random() * 9999) + 1;
        // Completar con ceros a la izquierda para tener 4 dígitos
        const idConCeros = numeroAleatorio.toString().padStart(4, '0');
        // Unir el prefijo 'P-' con el ID de 4 dígitos
        return `ME-${idConCeros}`;
    }

}

// Validacion al hacer submit nuevo paciente
export const validarNuevoPaciente = (e) => {
  
    e.preventDefault();
  
    let nombre = e.target.nombre.value,
    apellido = e.target.apellido.value,
    sexo = e.target.sexo.value,
    fechaNacimiento = e.target.fechaNacimiento.value,
    ciudad = e.target.ciudad.value,
    estado = e.target.estado.value,
    telefono = e.target.telefono.value
   
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
            if( window.location.pathname === '/pacientes' ){
                const modalNuevoPacientes = new bootstrap.Modal(document.getElementById('modalAddDataInput'), {keyboard: false})
                modalNuevoPacientes.toggle();
            }
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

// Validacion al hacer submit nuevo especialista
export const validarNuevoEspecialista = (e) => {
  
    e.preventDefault();
  
    let nombre = e.target.nombre.value,
    apellido = e.target.apellido.value,
    sexo = e.target.sexo.value,
    fechaNacimiento = e.target.fechaNacimiento.value,
    especialidad = e.target.especialidad.value
   
  
    const nuevoEspecialista = new Especialista( nombre, apellido, sexo,fechaNacimiento, especialidad )
    const datosParaEnviar = {
        pk_idEspecialista: nuevoEspecialista.pk_idEspecialista,
        nombre: nuevoEspecialista.nombre,
        apellido: nuevoEspecialista.apellido,
        sexo: nuevoEspecialista.sexo,
        fechaNacimiento: nuevoEspecialista.fechaNacimiento,
        especialidad: nuevoEspecialista.especialidad,   
    }
 
    if( checkString(nombre) && checkString(apellido) && checkString(especialidad) ){
        axios.post('/api/especialistas',datosParaEnviar)
        .then( (result) => {
            if( window.location.pathname === '/especialistas' ){
                const modalNuevoEspecialista =  new bootstrap.Modal(document.getElementById('modalAddDataInput'), {keyboard: false})
                modalNuevoEspecialista.toggle();
            }
            console.log(result)
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

export const addActive = (value) => {
    switch (value) {
        case '/':
            UI.home.classList.add('active')
            break;
        case '/pacientes':
            UI.pacientes.classList.add('active')
            break;
        case '/especialistas':
            UI.especialistas.classList.add('active')
            break;    
        default:
            break;
    }
}


