import * as UI from './interfaz.js';
import { checkString, checkCelular } from './validacionForm.js';


class Paciente {

    constructor(nombre, apellido, sexo, fechaNacimiento, region, ciudad, telefono, estado) {

        this.pk_idPaciente = this.generarID();
        this.nombre = nombre;
        this.apellido = apellido;
        this.sexo = sexo;
        this.fechaNacimiento = fechaNacimiento;
        this.region = region;
        this.ciudad = ciudad;
        this.telefono = telefono;
        this.estado = estado;

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

class Especialista {

    constructor(nombre, apellido, sexo, fechaNacimiento, especialidad) {

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

class Expediente {
    constructor(pk_idPaciente, tipoSangre, tipoAlergia, padecimientoCronico, fechaCreacion) {
        this.pk_idPaciente = pk_idPaciente;
        this.tipoSangre = tipoSangre;
        this.tipoAlergia = tipoAlergia;
        this.padecimientoCronico = padecimientoCronico;
        this.fechaCreacion = fechaCreacion
    }
}

class Cita {

    constructor(fecha, hora) {

        this.pk_idCita = this.generarID();
        this.fecha = fecha;
        this.hora = hora;
    }

    generarID() {
        // Generar un número aleatorio entre 1 y 9999
        const numeroAleatorio = Math.floor(Math.random() * 9999) + 1;
        // Completar con ceros a la izquierda para tener 4 dígitos
        const idConCeros = numeroAleatorio.toString().padStart(4, '0');
        // Unir el prefijo 'P-' con el ID de 4 dígitos
        return `CM-${idConCeros}`;
    }

}



export const openModalAddNewPacient = (e) => {
    e.preventDefault();
    const modalNuevoPacientes = new bootstrap.Modal(document.getElementById('openModalAddNewPacient'), { keyboard: false })
    modalNuevoPacientes.toggle();
}

export const openModalEditPacient = (e) => {
    e.preventDefault();
    const modalEditPacient = new bootstrap.Modal(document.getElementById('openModalEditPacient'), { keyboard: false })
    modalEditPacient.toggle();
}

export const openModalExpediente = (e) => {
    e.preventDefault();
    const modalAddNewExpediente = new bootstrap.Modal(document.getElementById('openModalAddNewExpediente'), { keyboard: false })
    modalAddNewExpediente.toggle();
    document.querySelector('#openModalAddNewExpediente__form button').setAttribute('id', e.target.name)
}

export const openModalEditExpediente = (e) => {
    e.preventDefault();
    const modalEditExpediente = new bootstrap.Modal(document.getElementById('openModalEditExpediente'), { keyboard: false })
    modalEditExpediente.toggle();
}

export const openModalNewEspecialist = (e) => {
    e.preventDefault();
    const modalNewEspecialist = new bootstrap.Modal(document.getElementById('openModalAddNewEspecialist'), { keyboard: false })
    modalNewEspecialist.toggle();
}

export const openModalEditEspecialist = (e) => {
    e.preventDefault();
    const modalEditEspecialist = new bootstrap.Modal(document.getElementById('openModalEditPacient'), { keyboard: false })
    modalEditEspecialist.toggle();
}

export const openModalNewCita = (e) => {
    e.preventDefault();
    const buttonGuardar = document.querySelector('#openModalAddNewCita button.gato')
    buttonGuardar.setAttribute('name', e.target.name)
    const modalNewCita = new bootstrap.Modal(document.getElementById('openModalAddNewCita'), { keyboard: false })
    modalNewCita.toggle();
}

const salida = (msg) => {
    return console.log(msg)
}

// Validacion al hacer submit nuevo paciente
export const validarNuevoPaciente = (e) => {
    e.preventDefault()

    let nombre = UI.nombre.value,
        apellido = UI.apellido.value,
        sexo = UI.sexo.value,
        fechaNacimiento = UI.fechaNacimiento.value,
        region = UI.region.value,
        ciudad = UI.ciudad.value,
        telefono = UI.telefono.value,
        estado = UI.estado.value,
        // Expediente
        tipoSangre = UI.tipoSangre.value,
        tipoAlergia = UI.tipoAlergia.value,
        padecimientoCronico = UI.padecimientoCronico.value,
        fechaCreacion = UI.fechaCreacion.value


    const nuevoPaciente = new Paciente(nombre, apellido, sexo, fechaNacimiento, region, ciudad, telefono, estado)
    const datosParaEnviar = {
        pk_idPaciente: nuevoPaciente.pk_idPaciente,
        nombre: nuevoPaciente.nombre,
        apellido: nuevoPaciente.apellido,
        sexo: nuevoPaciente.sexo,
        fechaNacimiento: nuevoPaciente.fechaNacimiento,
        region: nuevoPaciente.region,
        ciudad: nuevoPaciente.ciudad,
        telefono: nuevoPaciente.telefono,
        estado: nuevoPaciente.estado
    }

    if (checkString(nombre) && checkString(apellido) && checkString(ciudad)) {
        axios.post('/api/pacientes', datosParaEnviar)
            .then((result) => {
                let pk_idPaciente = result.data.pk_idPaciente
                validarNuevoExpediente(pk_idPaciente, tipoSangre, tipoAlergia, padecimientoCronico, fechaCreacion)
                const modalNuevoPacientes = new bootstrap.Modal(document.getElementById('openModalAddNewPacient'), { keyboard: false })
                modalNuevoPacientes.toggle();
                location.reload();
            })
            .catch(err => {
                salida('Mierda')
                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    text: `${err.response.data.msg}`,
                    showConfirmButton: false,
                    timer: 5000
                })
            })
    } else {
        Swal.fire({
            position: 'center',
            icon: 'info',
            text: 'Debe ingresar todos los campos!',
            showConfirmButton: false,
            timer: 2500
        })
    }
}


// Validacion al hacer submit nuevo expediente
const validarAgendarCita = (data) => {
    axios.post('/api/agendar_citas', data)
        .then(result => {
            // console.log('Salida de result /api/agendar_citas-->', result)
            const openModalAddNewPacient = new bootstrap.Modal(document.getElementById('openModalAddNewPacient'), { keyboard: false })
            openModalAddNewPacient.toggle();
            location.reload();
        })
}


// Validacion al hacer submit nueva Cita
export const validarNuevaCita = (e) => {

    e.preventDefault()
    let fk_idPaciente = e.target.name
    let fecha = UI.fechaCita.value,
        hora = UI.horaCita.value,
        fk_idEspecialista = UI.especialistaCita.value,
        consultorio = UI.consultorioCita.value,
        turno = UI.turnoCita.value,
        status = UI.statusCita.value,
        observaciones = UI.observacionesCita.value



    const nuevaCita = new Cita(fecha, hora)

    console.log(nuevaCita)

    const datosParaEnviar = {
        pk_idCita: nuevaCita.pk_idCita,
        fk_idPaciente: fk_idPaciente,
        fecha: nuevaCita.fecha,
        hora: nuevaCita.hora
    }

    axios.post('/api/citas', datosParaEnviar)

        .then((result) => {

            let fk_idCita = result.data.pk_idCita
            console.log('result-->', result)

            console.log('fk_idCita-->', fk_idCita)
            console.log('fk_idEspecialista-->', fk_idEspecialista)
            console.log('consultorio->', consultorio)
            console.log('fecha-->', fecha)
            console.log('hora-->', hora)
            console.log('turno-->', turno)
            console.log('status-->', status)
            console.log('observaciones-->', observaciones)

            const datosAgendarCita = {
                fk_idCita,
                fk_idEspecialista,
                consultorio,
                fechaCita: fecha,
                horaCita: hora,
                turno,
                status,
                observaciones
            }
            console.log(datosAgendarCita)
            // axios.post( '/api/agendar_citas',datosAgendarCita )

            validarAgendarCita(datosAgendarCita)

        })
        .catch(err => {
            salida('Mierda')
            Swal.fire({
                position: 'center',
                icon: 'info',
                text: `${err.response.data.msg}`,
                showConfirmButton: false,
                timer: 5000
            })
        })


    // if( true  ){
    //     axios.post('/api/citas',datosParaEnviar)
    //     .then( (result) => {
    //         console.log('Salida cita-->',result.data)
    //         // let fk_idCita = result.data.pk_idCita
    //         // validarAgendarCita( fk_idCita, fk_idespecialista, consultorio, fechaCita, hora, turno, estado, observacionesConsulta )
    //         // const modalNuevoPacientes = new bootstrap.Modal(document.getElementById('openModalAddNewPacient'), {keyboard: false})
    //         // modalNuevoPacientes.toggle();
    //         // location.reload();
    //     })
    //     .catch( err =>{
    //         salida('Mierda')
    //         Swal.fire({
    //             position: 'center',
    //             icon: 'info',
    //             text: `${err.response.data.msg}`,
    //             showConfirmButton: false,
    //             timer: 5000
    //         })
    //     })
    // }else{
    //     Swal.fire({
    //         position: 'center',
    //         icon: 'info',
    //         text: 'Debe ingresar todos los campos!',
    //         showConfirmButton: false,
    //         timer: 2500
    //     })
    // }

}


// Validacion al hacer submit nuevo especialista
export const validarNuevoEspecialista = (e) => {

    e.preventDefault();

    let nombre = e.target.nombre.value,
        apellido = e.target.apellido.value,
        sexo = e.target.sexo.value,
        fechaNacimiento = e.target.fechaNacimiento.value,
        especialidad = e.target.especialidad.value


    const nuevoEspecialista = new Especialista(nombre, apellido, sexo, fechaNacimiento, especialidad)
    const datosParaEnviar = {
        pk_idEspecialista: nuevoEspecialista.pk_idEspecialista,
        nombre: nuevoEspecialista.nombre,
        apellido: nuevoEspecialista.apellido,
        sexo: nuevoEspecialista.sexo,
        fechaNacimiento: nuevoEspecialista.fechaNacimiento,
        especialidad: nuevoEspecialista.especialidad,
    }

    if (checkString(nombre) && checkString(apellido) && checkString(especialidad)) {
        axios.post('/api/especialistas', datosParaEnviar)
            .then((result) => {

                const modalNuevoEspecialista = new bootstrap.Modal(document.getElementById('openModalAddNewEspecialist'), { keyboard: false })
                modalNuevoEspecialista.toggle();

                console.log(result)
                location.reload();
            })
            .catch(err => {
                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    text: `${err.response.data.msg}`,
                    showConfirmButton: false,
                    timer: 2500
                })
            })
    } else {
        Swal.fire({
            position: 'center',
            icon: 'info',
            text: 'Debe ingresar todos los campos!',
            showConfirmButton: false,
            timer: 2500
        })
    }

}

// Validacion al hacer submit nuevo expediente
const validarNuevoExpediente = (pk_idPaciente, tipoSangre, tipoAlergia, padecimientoCronico, fechaCreacion) => {
    pk_idPaciente.trim();
    const nuevoExpediente = new Expediente(pk_idPaciente, tipoSangre, tipoAlergia, padecimientoCronico, fechaCreacion)
    const datosParaEnviar = {
        pk_idPaciente: nuevoExpediente.pk_idPaciente,
        tipoSangre: nuevoExpediente.tipoSangre,
        tipoAlergia: nuevoExpediente.tipoAlergia,
        padecimientoCro: nuevoExpediente.padecimientoCronico,
        fechaCreacion: nuevoExpediente.fechaCreacion
    }

    if (checkString(tipoAlergia) && checkString(padecimientoCronico)) {
        axios.post('/api/expedientes', datosParaEnviar)
            .then((result) => {
                console.log('Result-->', result.data)
            })
            .catch(err => {
                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    text: `${err.response.data.msg}`,
                    showConfirmButton: false,
                    timer: 2500
                })
            })
    } else {
        Swal.fire({
            position: 'center',
            icon: 'info',
            text: 'Debe ingresar todos los campos!',
            showConfirmButton: false,
            timer: 2500
        })
    }
}




export const infoModal = (info) => {
    UI.modalInfoAlert.toggle();
    UI.infoMensaje.innerHTML = info
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

export const infoAlert = (mensaje) => {
    Swal.fire({
        position: 'center',
        icon: 'info',
        text: mensaje,
        showConfirmButton: false,
        timer: 2500
    })
}






