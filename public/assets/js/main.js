import * as UI from './utilities/interfaz.js';
import {
    validarNuevoPaciente,
    validarNuevoEspecialista,
    openModalNuevoDataInput,
    addActive
} from './utilities/functions.js';

import { checkString, checkCelular } from './utilities/validacionForm.js';



if (typeof window === 'object') {

    window.addEventListener('DOMContentLoaded', function () {

        if (window.location.pathname === '/pacientes') {

            // Inicio insertar HTML en la modal crear pacientes
            UI.tituloModal.innerHTML = `Ingresar nuevo paciente`
            UI.modalBody.innerHTML = `<form id="modalAddDataInput__form">
            <div class="mb-3">
              <input type="text" class="form-control" id="nombre" placeholder="Ingrese nombre">
              <small class="infoAlert ps-1 py-1 border-bottom"></small>
            </div>
            <div class="mb-3">
              <input type="text" class="form-control" id="apellido" placeholder="Ingrese apellido">
              <small class="infoAlert ps-1 py-1 border-bottom"></small>
            </div>
            <div class="mb-3">
              <select class="form-select" id="sexo">
                <option selected>Seleccione Sexo</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>
            <div class="mb-3">
              <input type="date" class="form-control" id="fechaNacimiento" placeholder="Ingrese fecha de nacimiento">
            </div>
            <div class="mb-3">
              <input type="text" class="form-control" id="ciudad" placeholder="Ingrese ciudad">
              <small class="infoAlert ps-1 py-1 border-bottom"></small>
            </div>
            <div class="mb-3">
              <input type="text" class="form-control" id="estado" placeholder="Ingrese estado">
              <small class="infoAlert ps-1 py-1 border-bottom"></small>
            </div>
            <div class="mb-3">
              <input type="tel" class="form-control" id="telefono" placeholder="Ingrese celular">
               <small class="infoAlertCelular ps-1 py-1 border-bottom"></small>
            </div>
            <div class="d-grid gap-2">
              <button type="submit" class="btn btn-primary">Guardar</button>
            </div> 
          </form>`
            // Cierre insertar HTML en la modal crear pacientes

            // Inicio insertar HTML en la modal editar pacientes
            UI.tituloModalEdit.innerHTML = 'Editar paciente';
            UI.modalBodyEdit.innerHTML = `<form id="editFormNuevoPaciente">
           <div class="mb-3">
             <input type="text" class="form-control" id="editNombre" placeholder="Ingrese nombre">
             <small class="infoAlert ps-1 py-1 border-bottom"></small>
           </div>
           <div class="mb-3">
             <input type="text" class="form-control" id="editApellido" placeholder="Ingrese apellido">
             <small class="infoAlert ps-1 py-1 border-bottom"></small>
           </div>
           <div class="mb-3">
             <select class="form-select" id="editSexo">
               <option selected>Seleccione Sexo</option>
               <option value="M">Masculino</option>
               <option value="F">Femenino</option>
             </select>
           </div>
           <div class="mb-3">
             <input type="date" class="form-control" id="editFechaNacimiento" placeholder="Ingrese fecha de nacimiento">
           </div>
           <div class="mb-3">
             <input type="text" class="form-control" id="editCiudad" placeholder="Ingrese ciudad">
             <small class="infoAlert ps-1 py-1 border-bottom"></small>
           </div>
           <div class="mb-3">
             <input type="text" class="form-control" id="editEstado" placeholder="Ingrese estado">
             <small class="infoAlert ps-1 py-1 border-bottom"></small>
           </div>
           <div class="mb-3">
             <input type="tel" class="form-control" id="editTelefono" placeholder="Ingrese celular">
              <small class="infoAlertCelular ps-1 py-1 border-bottom"></small>
           </div>
           <div class="d-grid gap-2">
             <button type="submit" class="btn btn-primary gato">Guardar</button>
           </div> 
         </form>`
            // Cierre insertar HTML en la modal editar pacientes

            // INPUT de los formularios
            const nombre = document.querySelector('#nombre'),
                apellido = document.querySelector('#apellido'),
                sexo = document.querySelector('#sexo'),
                fechaNacimiento = document.querySelector('#fechaNacimiento'),
                ciudad = document.querySelector('#ciudad'),
                estado = document.querySelector('#estado'),
                telefono = document.querySelector('#telefono'),
                especialidad = document.querySelector('#especialidad'),
                infoAlert = document.querySelector('.infoAlert'),
                infoAlertCelular = document.querySelector('.infoAlertCelular')


            nombre.addEventListener('input', (e) => {
                e.preventDefault();
                let validaString = checkString(e.target.value)
                let valueInput = e.target.value
                if (validaString || valueInput.length === 0) {
                    infoAlert.style.display = "none";
                    infoAlert.innerHTML = ``
                } else {
                    infoAlert.style.display = "block";
                    infoAlert.style.color = '#ff8484'
                    infoAlert.innerHTML = `Debes ingresar sólo letras`
                }
            })

            apellido.addEventListener('input', (e) => {
                e.preventDefault();
                let validaString = checkString(e.target.value)
                let valueInput = e.target.value
                if (validaString || valueInput.length === 0) {
                    infoAlert.style.display = "none";
                    infoAlert.innerHTML = ``
                } else {
                    infoAlert.style.display = "block";
                    infoAlert.style.color = '#ff8484'
                    infoAlert.innerHTML = `Debes ingresar sólo letras`
                }
            })

            telefono.addEventListener('input', (e) => {
                e.preventDefault();
                let validaCelular = checkCelular(e.target.value)
                let valueInput = e.target.value
                if (validaCelular || valueInput.length === 0) {
                    infoAlertCelular.style.display = "none";
                    infoAlertCelular.innerHTML = ``
                } else {
                    infoAlertCelular.style.display = "block";
                    infoAlertCelular.style.color = '#ff8484'
                    infoAlertCelular.innerHTML = `Debe ingresar un numero de celular correcto +56(2-9)12345678`
                }
            })

            // Evento de abrir modal
            UI.buttonNuevoPaciente.addEventListener('click', openModalNuevoDataInput);
            const formSubmit = document.querySelector('#modalAddDataInput__form')
            formSubmit.addEventListener('submit', validarNuevoPaciente);

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
            //Cierre all Button eliminar

            //Inicio Buttons para eliminar
            UI.allButtonEditar.forEach(element => {
                element.addEventListener('click', (e) => {
                    e.preventDefault();
                    let id = e.target.name
                    console.log('ID--->', id)
                    axios.get(`/api/pacientes/${id}`)
                        .then(result => {

                            const { pk_idPaciente, nombre, apellido, sexo, fechaNacimiento, ciudad, estado, telefono } = result.data
                            document.querySelector('#editNombre').value = nombre;
                            document.querySelector('#editApellido').value = apellido;
                            document.querySelector('#editSexo').value = sexo;
                            document.querySelector('#editFechaNacimiento').value = moment(fechaNacimiento).format('YYYY-MM-DD');
                            document.querySelector('#editCiudad').value = ciudad;
                            document.querySelector('#editEstado').value = estado;
                            document.querySelector('#editTelefono').value = telefono;
                            document.querySelector('#modalEditDataInput button.gato').setAttribute('id', pk_idPaciente);

                            const modalEditPacientes = new bootstrap.Modal(document.getElementById('modalEditDataInput'), { keyboard: false })
                            modalEditPacientes.toggle();
                        })
                })
            })
            //Inicio Buttons para eliminar

            //Inicio Button guardar editar
            const buttonEditarGuardar = document.querySelector('#modalEditDataInput button.gato')
            buttonEditarGuardar.addEventListener('click', (e) => {
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
                        const modalEditPacientes = new bootstrap.Modal(document.getElementById('modalEditDataInput'), { keyboard: false })
                        modalEditPacientes.toggle();
                        location.reload();
                    })
                    .catch(err => console.log(err))
            })
        }



        if (window.location.pathname === '/especialistas') {
            // Inicio insertar HTML en la modal crear pacientes
            UI.tituloModal.innerHTML = `Ingresar nuevo especialista`
            UI.modalBody.innerHTML = `<form id="modalAddDataInput__form">
            <div class="mb-3">
              <input type="text" class="form-control" id="nombre" placeholder="Ingrese nombre">
              <small class="infoAlert ps-1 py-1 border-bottom"></small>
            </div>
            <div class="mb-3">
              <input type="text" class="form-control" id="apellido" placeholder="Ingrese apellido">
              <small class="infoAlert ps-1 py-1 border-bottom"></small>
            </div>
            <div class="mb-3">
              <select class="form-select" id="sexo">
                <option selected>Seleccione Sexo</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>
            </div>
            <div class="mb-3">
              <input type="date" class="form-control" id="fechaNacimiento" placeholder="Ingrese fecha de nacimiento">
            </div>
            <div class="mb-3">
              <input type="text" class="form-control" id="especialidad" placeholder="Ingrese especialidad">
              <small class="infoAlert ps-1 py-1 border-bottom"></small>
            </div>
            <div class="d-grid gap-2">
              <button type="submit" class="btn btn-primary">Guardar</button>
            </div> 
          </form>`
            // Cierre insertar HTML en la modal crear pacientes

            // Inicio insertar HTML en la modal editar pacientes
            UI.tituloModalEdit.innerHTML = 'Editar especialista';
            UI.modalBodyEdit.innerHTML = `<form id="editFormNuevoPaciente">
           <div class="mb-3">
             <input type="text" class="form-control" id="editNombre">
             <small class="infoAlert ps-1 py-1 border-bottom"></small>
           </div>
           <div class="mb-3">
             <input type="text" class="form-control" id="editApellido">
             <small class="infoAlert ps-1 py-1 border-bottom"></small>
           </div>
           <div class="mb-3">
             <select class="form-select" id="editSexo">
               <option selected>Seleccione Sexo</option>
               <option value="M">Masculino</option>
               <option value="F">Femenino</option>
             </select>
           </div>
           <div class="mb-3">
             <input type="date" class="form-control" id="editFechaNacimiento">
           </div>
           <div class="mb-3">
             <input type="text" class="form-control" id="editEspecialidad">
             <small class="infoAlert ps-1 py-1 border-bottom"></small>
           </div>
      
           <div class="d-grid gap-2">
             <button type="submit" class="btn btn-primary gato">Guardar</button>
           </div> 
         </form>`
            // Cierre insertar HTML en la modal editar pacientes

            // INPUT de los formularios
            const nombre = document.querySelector('#nombre'),
                apellido = document.querySelector('#apellido'),
                especialidad = document.querySelector('#especialidad'),
                infoAlert = document.querySelector('.infoAlert')

            // Evento de abrir modal
            UI.buttonNuevoEspecialista.addEventListener('click', openModalNuevoDataInput);
            const formSubmit = document.querySelector('#modalAddDataInput__form')
            formSubmit.addEventListener('submit', validarNuevoEspecialista);


            nombre.addEventListener('input', (e) => {
                e.preventDefault();
                let validaString = checkString(e.target.value)
                let valueInput = e.target.value
                if (validaString || valueInput.length === 0) {
                    infoAlert.style.display = "none";
                    infoAlert.innerHTML = ``
                } else {
                    infoAlert.style.display = "block";
                    infoAlert.style.color = '#ff8484'
                    infoAlert.innerHTML = `Debes ingresar sólo letras`
                }
            })

            apellido.addEventListener('input', (e) => {
                e.preventDefault();
                let validaString = checkString(e.target.value)
                let valueInput = e.target.value
                if (validaString || valueInput.length === 0) {
                    infoAlert.style.display = "none";
                    infoAlert.innerHTML = ``
                } else {
                    infoAlert.style.display = "block";
                    infoAlert.style.color = '#ff8484'
                    infoAlert.innerHTML = `Debes ingresar sólo letras`
                }
            })

            especialidad.addEventListener('input', (e) => {
                e.preventDefault();
                let validaString = checkString(e.target.value)
                let valueInput = e.target.value
                if (validaString || valueInput.length === 0) {
                    infoAlert.style.display = "none";
                    infoAlert.innerHTML = ``
                } else {
                    infoAlert.style.display = "block";
                    infoAlert.style.color = '#ff8484'
                    infoAlert.innerHTML = `Debes ingresar sólo letras`
                }
            })


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
                            axios.delete(`/api/especialistas/${id}`)
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
                    axios.get(`/api/especialistas/${id}`)
                        .then(result => {
                            console.log('Salida de result--->', result)
                            const { pk_idEspecialista, nombre, apellido, sexo, fechaNacimiento, especialidad } = result.data
                            document.querySelector('#editNombre').value = nombre;
                            document.querySelector('#editApellido').value = apellido;
                            document.querySelector('#editSexo').value = sexo;
                            document.querySelector('#editFechaNacimiento').value = moment(fechaNacimiento).format('YYYY-MM-DD');
                            document.querySelector('#editEspecialidad').value = especialidad;
                            document.querySelector('#modalEditDataInput button.gato').setAttribute('id', pk_idEspecialista);

                            const modalEditEspecialista = new bootstrap.Modal(document.getElementById('modalEditDataInput'), { keyboard: false })
                            modalEditEspecialista.toggle();
                        })
                })
            })
            //Inicio Buttons para eliminar

            //Inicio Button guardar editar
            const buttonEditarGuardar = document.querySelector('#modalEditDataInput button.gato')
            buttonEditarGuardar.addEventListener('click', (e) => {
                e.preventDefault();
                let pk_idEspecialista = e.target.id,
                    nombre = document.querySelector('#editNombre').value,
                    apellido = document.querySelector('#editApellido').value,
                    sexo = document.querySelector('#editSexo').value,
                    fechaNacimiento = document.querySelector('#editFechaNacimiento').value,
                    especialidad = document.querySelector('#editEspecialidad').value

                const editEspecialista = {
                    pk_idEspecialista,
                    nombre,
                    apellido,
                    sexo,
                    fechaNacimiento,
                    especialidad
                }

                axios.put(`/api/especialistas/${pk_idEspecialista}`, editEspecialista)
                    .then(result => {
                        result.data
                        const modalEditPacientes = new bootstrap.Modal(document.getElementById('modalEditDataInput'), { keyboard: false })
                        modalEditPacientes.toggle();
                        location.reload();
                    })
                    .catch(err => console.log(err))

            })

        }

        addActive(window.location.pathname);

    })

}