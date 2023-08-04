import * as UI from './utilities/interfaz.js';
import { 
    validarNuevoPaciente,
    validarNuevoEspecialista,
    openModalNuevoPaciente, 
    openModalNuevoEspecialista, 
    addActive } from './utilities/functions.js';

import { checkString, checkCelular } from './utilities/validacionForm.js';



if (typeof window === 'object') {

    window.addEventListener('DOMContentLoaded', function () {

        if (window.location.pathname === '/pacientes') {

            UI.nuevoPaciente.addEventListener('click', openModalNuevoPaciente );
            UI.formNuevoPaciente.addEventListener('submit', validarNuevoPaciente);

            // INICIO Validacion por input Nuevo Paciente
            UI.nombre.addEventListener('input', (e) => {
                e.preventDefault();
                let validaString = checkString(e.target.value)
                let valueInput = e.target.value
                if (validaString || valueInput.length === 0) {
                    UI.infoAlert.style.display = "none";
                    UI.infoAlert.innerHTML = ``
                } else {
                    UI.infoAlert.style.display = "block";
                    UI.infoAlert.style.color = '#ff8484'
                    UI.infoAlert.innerHTML = `Debes ingresar sólo letras`
                }
            })

            UI.apellido.addEventListener('input', (e) => {
                e.preventDefault();
                let validaString = checkString(e.target.value)
                let valueInput = e.target.value
                if (validaString || valueInput.length === 0) {
                    UI.infoAlert.style.display = "none";
                    UI.infoAlert.innerHTML = ``
                } else {
                    UI.infoAlert.style.display = "block";
                    UI.infoAlert.style.color = '#ff8484'
                    UI.infoAlert.innerHTML = `Debes ingresar sólo letras`
                }
            })

            UI.telefono.addEventListener('input', (e) => {
                e.preventDefault();
                let validaCelular = checkCelular(e.target.value)
                let valueInput = e.target.value
                if (validaCelular || valueInput.length === 0) {
                    UI.infoAlertCelular.style.display = "none";
                    UI.infoAlertCelular.innerHTML = ``
                } else {
                    UI.infoAlertCelular.style.display = "block";
                    UI.infoAlertCelular.style.color = '#ff8484'
                    UI.infoAlertCelular.innerHTML = `Debe ingresar un numero de celular correcto +56(2-9)12345678`
                }
            })
            // CIERRE Validacion por input Nuevo Paciente

            // All Button eliminar
            UI.allButtonEliminar.forEach(element => {
                element.addEventListener('click', (e) => {
                    e.preventDefault();
                    let id = e.target.name
                    Swal.fire({
                        title: 'Está seguro de eliminar al usuario?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Sí, seguro',
                        cancelButtonText: 'No, no quiero'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire({
                                title: 'Borrado!',
                                icon: 'success',
                                text: 'El archivo ha sido borrado'
                            })
                            axios.delete(`/api/pacientes/${id}`)
                                .then(result => {
                                    console.log('Salida de result', result)
                                    window.location.reload();
                                })
                        }

                    })
                })
            })
            // Cierre all Button eliminar

            // Inicio Buttons para eliminar
            UI.allButtonEditar.forEach(element => {
                element.addEventListener('click', (e) => {

                    e.preventDefault();

                    let id = e.target.name
                    console.log('ID--->', id)
                    axios.get(`/api/pacientes/${id}`)
                        .then(result => {
                            const modalEditPacientes = new bootstrap.Modal(document.getElementById('modalEditPacientes'), {keyboard: false})
                            modalEditPacientes.toggle();

                            const { pk_idPaciente, nombre, apellido, sexo, fechaNacimiento, ciudad, estado, telefono } = result.data

                            UI.editNombre.value = nombre;
                            UI.editApellido.value = apellido;
                            UI.editSexo.value = sexo;
                            UI.editFechaNacimiento.value = moment(fechaNacimiento).format('YYYY-MM-DD')
                            UI.editCiudad.value = ciudad;
                            UI.editEstado.value = estado;
                            UI.editTelefono.value = telefono;
                            UI.buttonEditarGuardar.setAttribute('id', pk_idPaciente)



                        })
                })
            })
            // Inicio Buttons para eliminar

            //  Inicio Button guardar editar
            UI.buttonEditarGuardar.addEventListener('click', (e) => {
                e.preventDefault();
                let pk_idPaciente = e.target.id,
                    nombre = document.querySelector('#editNombre').value,
                    apellido = document.querySelector('#editApellido').value,
                    sexo = document.querySelector('#editSexo').value,
                    fechaNacimiento = document.querySelector('#editFechaNacimiento').value,
                    ciudad = document.querySelector('#editCiudad').value,
                    estado = document.querySelector('#editEstado').value,
                    telefono = document.querySelector('#editTelefono').value

                const editPaciente = {
                    pk_idPaciente,
                    nombre,
                    apellido,
                    sexo,
                    fechaNacimiento,
                    ciudad,
                    estado,
                    telefono
                }

                axios.put(`/api/pacientes/${pk_idPaciente}`, editPaciente)
                    .then(result => {
                        result.data
                        UI.modalEditPacientes.toggle();
                        location.reload();
                    })
                    .catch(err => console.log(err))

            })

        }

        if(window.location.pathname === '/especialistas'){
            UI.nuevoEspecialista.addEventListener('click', openModalNuevoEspecialista );
            UI.formNuevoEspecialista.addEventListener('submit', validarNuevoEspecialista );

                        // All Button eliminar
                        UI.allButtonEliminar.forEach(element => {
                            element.addEventListener('click', (e) => {
                                e.preventDefault();
                                let id = e.target.name
                                Swal.fire({
                                    title: 'Está seguro de eliminar al usuario?',
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonText: 'Sí, seguro',
                                    cancelButtonText: 'No, no quiero'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        Swal.fire({
                                            title: 'Borrado!',
                                            icon: 'success',
                                            text: 'El archivo ha sido borrado'
                                        })
                                        axios.delete(`/api/pacientes/${id}`)
                                            .then(result => {
                                                console.log('Salida de result', result)
                                                window.location.reload();
                                            })
                                    }
            
                                })
                            })
                        })
                        // Cierre all Button eliminar
            
                        // Inicio Buttons para eliminar
                        UI.allButtonEditar.forEach(element => {
                            element.addEventListener('click', (e) => {
            
                                e.preventDefault();
            
                                let id = e.target.name
                                console.log('ID--->', id)
                                axios.get(`/api/pacientes/${id}`)
                                    .then(result => {
                                        const modalEditPacientes = new bootstrap.Modal(document.getElementById('modalEditPacientes'), {keyboard: false})
                                        modalEditPacientes.toggle();
            
                                        const { pk_idPaciente, nombre, apellido, sexo, fechaNacimiento, ciudad, estado, telefono } = result.data
            
                                        UI.editNombre.value = nombre;
                                        UI.editApellido.value = apellido;
                                        UI.editSexo.value = sexo;
                                        UI.editFechaNacimiento.value = moment(fechaNacimiento).format('YYYY-MM-DD')
                                        UI.editCiudad.value = ciudad;
                                        UI.editEstado.value = estado;
                                        UI.editTelefono.value = telefono;
                                        UI.buttonEditarGuardar.setAttribute('id', pk_idPaciente)
            
            
            
                                    })
                            })
                        })
                        // Inicio Buttons para eliminar
            
                        //  Inicio Button guardar editar
                        UI.buttonEditarGuardar.addEventListener('click', (e) => {
                            e.preventDefault();
                            let pk_idPaciente = e.target.id,
                                nombre = document.querySelector('#editNombre').value,
                                apellido = document.querySelector('#editApellido').value,
                                sexo = document.querySelector('#editSexo').value,
                                fechaNacimiento = document.querySelector('#editFechaNacimiento').value,
                                ciudad = document.querySelector('#editCiudad').value,
                                estado = document.querySelector('#editEstado').value,
                                telefono = document.querySelector('#editTelefono').value
            
                            const editPaciente = {
                                pk_idPaciente,
                                nombre,
                                apellido,
                                sexo,
                                fechaNacimiento,
                                ciudad,
                                estado,
                                telefono
                            }
            
                            axios.put(`/api/pacientes/${pk_idPaciente}`, editPaciente)
                                .then(result => {
                                    result.data
                                    UI.modalEditPacientes.toggle();
                                    location.reload();
                                })
                                .catch(err => console.log(err))
            
                        })
        }

           
            // UI.nuevoEspecialista.addEventListener('submit', validarNuevoPaciente);

        // if(UI.nuevoEspecialista){
        //     UI.nuevoEspecialista.addEventListener('click', openModalNuevoEspecialista );
        //     UI.nuevoEspecialista.addEventListener('submit', validarNuevoPaciente);
        // }





    

        addActive(window.location.pathname)


        // Cierre button guarda editar
        // mostrarOcultarNav()
        // UI.navbar.addEventListener('mouseover', mostrarOcultarNav )

    })

}