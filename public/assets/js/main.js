import * as UI from './utilities/interfaz.js';
import { openModal, validarNuevoPaciente } from './utilities/functions.js';
import { checkString, checkCelular } from './utilities/validacionForm.js';
// import config from '../../config.json' assert {type: 'json'};



if (typeof window === 'object') {

    window.addEventListener('DOMContentLoaded', function () {

        UI.nuevoUsuario.addEventListener('click', openModal);
        UI.formNuevoPaciente.addEventListener('submit', validarNuevoPaciente);

        // INICIO Validacion por input Nuevo Usuario
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
        // Cierre Validacion por input Nuevo Usuario

        UI.allButton.forEach(element => {
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


    })

}