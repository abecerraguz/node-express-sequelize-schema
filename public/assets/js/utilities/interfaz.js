export const modalNuevoPacientes = new bootstrap.Modal(document.getElementById('modalNuevoPacientes'), {keyboard: false}),
modalEditPacientes = new bootstrap.Modal(document.getElementById('modalEditPacientes'), {keyboard: false}),
modalInfoAlert = new bootstrap.Modal(document.getElementById('modalInfoAlert'), {keyboard: false}),
nuevoUsuario = document.querySelector('#nuevoUsuario'),
nombre = document.querySelector('#nombre'),
apellido = document.querySelector('#apellido'),
sexo = document.querySelector('#sexo'),
fechaNacimiento = document.querySelector('#fechaNacimiento'),
ciudad = document.querySelector('#ciudad'),
estado = document.querySelector('#estado'),
telefono = document.querySelector('#telefono'),
formNuevoPaciente = document.querySelector('#formNuevoPaciente'),
infoAlert = document.querySelector('.infoAlert'),
infoMensaje = document.querySelector('#infoMensaje'),
infoAlertCelular = document.querySelector('.infoAlertCelular'),
allButtonEliminar = document.querySelectorAll('#infoTable tr td button#buttonEliminar'),
allButtonEditar = document.querySelectorAll('#infoTable tr td button#buttonEditar'),
editNombre= document.querySelector('#editNombre'),
editApellido = document.querySelector('#editApellido'),
editSexo = document.querySelector('#editSexo'),
editFechaNacimiento= document.querySelector('#editFechaNacimiento'),
editCiudad = document.querySelector('#editCiudad'),
editEstado = document.querySelector('#editEstado'),
editTelefono = document.querySelector('#editTelefono'),
buttonEditarGuardar = document.querySelector('#modalEditPacientes button.gato'),
navbar = document.querySelector('#navbar'),
ingresarData = document.querySelector('.ingresarData')



