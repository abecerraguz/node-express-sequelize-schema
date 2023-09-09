import * as UI from './utilities/interfaz.js';
import {
  validarNuevoPaciente,
  validarNuevoEspecialista,
  validarNuevaCita,
  // validarNuevoExpediente,
  openModalAddNewPacient,
  openModalEditPacient,
  openModalExpediente,
  openModalNewEspecialist,
  openModalEditEspecialist,
  openModalEditExpediente,
  openModalNewCita,
  addActive,
  infoAlert
} from './utilities/functions.js';

import { checkString, checkCelular } from './utilities/validacionForm.js';




if (typeof window === 'object') {

  window.addEventListener('DOMContentLoaded', function () {

    if (window.location.pathname === '/pacientes') {

      // Evento de abrir modal Nuevo Paciente
      UI.buttonNuevoPaciente.addEventListener('click', openModalAddNewPacient);
      const formSubmit = document.querySelector('#openModalAddNewPacient #openModalAddNewPacient__form')
      formSubmit.addEventListener('submit', validarNuevoPaciente);

      //All Button eliminar
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
          let id = e.target.name;
          axios.get(`/api/pacientes/${id}`)
            .then(result => {

              const { pk_idPaciente, nombre, apellido, sexo, fechaNacimiento, region, ciudad, telefono, estado } = result.data

              UI.editNombre.value = nombre;
              UI.editApellido.value = apellido;
              UI.editSexo.value = sexo;
              UI.editFechaNacimiento.value = moment(fechaNacimiento).format('YYYY-MM-DD');
              UI.editRegion.value = region;
              UI.editCiudad.value = ciudad;
              UI.editTelefono.value = telefono;
              UI.editEstado.value = estado;
              UI.buttonEditarGuardar.setAttribute('id', pk_idPaciente);
              openModalEditPacient(e)
            })
        })
      })
      //Inicio Buttons para eliminar

      // Inicio Buttons Abrir Modal para editar expediente
      UI.allButtonEditarExpediente.forEach(element => {
        element.addEventListener('click', (e) => {
          e.preventDefault();
          let id = e.target.name;
          axios.get(`/api/expedientes/${id}`)
            .then(result => {
              console.log('Salida de result.data-->', result.data)
              const { pk_idPaciente, tipoSangre, tipoAlergia, padecimientoCro, fechaCreacion } = result.data

              UI.editTipoSangre.value = tipoSangre;
              UI.editTipoAlergia.value = tipoAlergia;
              UI.editPadecimientoCronico.value = padecimientoCro;
              UI.editFechaCreacion.value = moment(fechaCreacion).format('YYYY-MM-DD');
              UI.buttonEditarGuardarExpediente.setAttribute('id', pk_idPaciente);
              openModalEditExpediente(e)
            })
        })
      })
      // Cierre Buttons Abrir Modal para editar expediente

      //Inicio Button guardar editar Nuevo paciente
      const buttonEditarGuardarNuevoPaciente = document.querySelector('#openModalEditPacient button.gato')
      buttonEditarGuardarNuevoPaciente.addEventListener('click', (e) => {
        e.preventDefault();

        let pk_idPaciente = e.target.id,
          nombre = UI.editNombre.value,
          apellido = UI.editApellido.value,
          sexo = UI.editSexo.value,
          fechaNacimiento = UI.editFechaNacimiento.value,
          region = UI.editRegion.value,
          ciudad = UI.editCiudad.value,
          telefono = UI.editTelefono.value,
          estado = UI.editEstado.value

        const editPaciente = {
          pk_idPaciente,
          nombre,
          apellido,
          sexo,
          fechaNacimiento,
          region,
          ciudad,
          telefono,
          estado
        }
        axios.put(`/api/pacientes/${pk_idPaciente}`, editPaciente)
          .then(result => {
            result.data
            const modalEditPacientes = new bootstrap.Modal(document.getElementById('openModalEditPacient'), { keyboard: false })
            modalEditPacientes.toggle();
            location.reload();
          })
          .catch(err => console.log(err))
      })
      //Cierre Button guardar editar Nuevo paciente


      //Inicio Button guardar editar Nuevo Expediente
      const buttonEditarGuardarNuevoExpediente = document.querySelector('#openModalEditExpediente button.gato')
      buttonEditarGuardarNuevoExpediente.addEventListener('click', (e) => {
        e.preventDefault();

        let pk_idPaciente = e.target.id,
          tipoSangre = UI.editTipoSangre.value,
          tipoAlergia = UI.editTipoAlergia.value,
          padecimientoCro = UI.editPadecimientoCronico.value,
          fechaCreacion = UI.editFechaCreacion.value

        const putExpediente = {
          pk_idPaciente,
          tipoSangre,
          tipoAlergia,
          padecimientoCro,
          fechaCreacion
        }

        axios.put(`/api/expedientes/${pk_idPaciente}`, putExpediente)
          .then(result => {
            console.log('Se sale --->', result)
            const modalEditExpediente = new bootstrap.Modal(document.getElementById('openModalEditExpediente'), { keyboard: false })
            modalEditExpediente.toggle();
            location.reload();
          })
          .catch(err => {
            console.log(err.response.data)
          })
      })
      //Cierre Button guardar editar Nuevo Expediente

      //Inicio Button guardar editar Nuevo Expediente
      const buttonGuardarCita = document.querySelector('#openModalAddNewCita button.gato')
      buttonGuardarCita.addEventListener('click', (e) => {
        e.preventDefault();
        validarNuevaCita(e)
      })
      //Cierre Button guardar editar Nuevo Expediente


      // Botones abrir modal nueva cita
      UI.allButtonNuevaCita.forEach(element => {
        element.addEventListener('click', (e) => {
          e.preventDefault();

          openModalNewCita(e)
        })
      })



      // Validacion activar o desactivar paciente
      const changeStatus = async (e) => {
        // console.log('Salida de e.checked-->', e.checked)
        // console.log('Salida de e.pk_idPaciente-->', e.id)
        let estado = e.checked ? 1 : 0;
        let id = e.id
        await axios.put(`/api/pacientes/${id}`, {
          id,
          estado
        })
        if (estado) {

          infoAlert('Usuario habilitado');

          const thisButton = document.querySelectorAll(`.contentButton.${id} button`);
          thisButton.forEach(element => {
            element.disabled = '';
          })

          const thisButtonDos = document.querySelectorAll(`.contentAction.${id} button`);
          thisButtonDos.forEach(element => {
            element.disabled = '';
          })

          const thisTable = document.querySelectorAll(`.contentInfoTableAgendarCita.${id}`);
          thisTable.forEach(element => {
            element.classList.remove('disabled')
          })

        } else {

          infoAlert('Usuario deshabilitado');
          const thisButton = document.querySelectorAll(`.contentButton.${id} button`);
          thisButton.forEach(element => {
            element.disabled = 'disabled';
          })

          const thisButtonDos = document.querySelectorAll(`.contentAction.${id} button`);
          thisButtonDos.forEach(element => {
            element.disabled = 'disabled';
          })

          const thisTable = document.querySelectorAll(`.contentInfoTableAgendarCita.${id}`);
          console.log('XXXX--->', thisTable)
          thisTable.forEach(element => {
            console.log('Salida de element--->', element)
            element.classList.add('disabled')
          })

        }
        //estado ? infoAlert('Usuario habilitado') : infoAlert('Usuario deshabilitado')
      }
      // Validacion activar o desactivar paciente

      //Activar , desactivar usuario
      const inputCheck = document.querySelectorAll('#infoTable tr td input')

      inputCheck.forEach(element => {
        element.addEventListener('click', (e) => {
          let dataInput = e.target
          changeStatus(dataInput)
        })
      })


      // Mostrar o ocultar Info de Paciente
      const collapseAction = document.querySelectorAll('#infoTable tr th.collapseAction i')
      collapseAction.forEach(element => {
        element.addEventListener('click', (e) => {
          e.preventDefault();

          if (e.target.classList.contains('bi-dash-circle')) {
            e.target.classList.remove('bi-dash-circle')
            e.target.classList.add('bi-plus-circle')
          } else if (e.target.classList.contains('bi-plus-circle')) {
            e.target.classList.remove('bi-plus-circle')
            e.target.classList.add('bi-dash-circle')
          }

          // Mostrar o ocultar show 
          let idname = e.target
          let id = idname.getAttribute("name")
          const thisContentAction = document.querySelector(`.collapseActionTrows.${id}`);
          thisContentAction.classList.toggle('show')


        })

      })

      // Mostrar especialistas en agendar cita
      const especialistaCita = document.querySelector('#especialistaCita');
      axios.get('/api/especialistas')
        .then(function (response) {
          // const data = response.data
          const data = response.data['especialistas']
          // console.log('Salida de data-->', data)
          data.forEach(element => {
            especialistaCita.innerHTML += `<option value="${element.pk_idEspecialista}">${element.nombre} ${element.apellido} - ${element.especialidad}</option>`
          });
        })



      const infotableAllPacientes = document.querySelectorAll('.infoTableCitas')

      infotableAllPacientes.forEach(element => {

        let infotable = element.getAttribute('info')

        axios.get('/api/citas/get-citas-agendadas')
          .then(result => {

            let data = result.data,
              findIdPaciente = data.filter(element => element.fk_idPaciente == infotable)

            console.log('XXXXX--->', data)


            const contentInfoTableAgendarCita = document.querySelectorAll('.contentInfoTableAgendarCita')



            contentInfoTableAgendarCita.forEach(element => {
              if (data == 0) {
                element.classList.add('d-none')
              } else {
                element.classList.remove('d-none')
              }
            })

            for (const key in findIdPaciente) {
              if (Object.hasOwnProperty.call(findIdPaciente, key)) {

                const element = findIdPaciente[key];
                const { agendar_cita: { fk_idCita: idCita, fk_idEspecialista: idEsp, consultorio: consult, fechaCita: fecha, horaCita: hora }, } = element;

                const horaCita = moment(hora, 'HH:mm:ss'),
                  formatoHora = horaCita.format('hh:mm A');

                if (element.fk_idPaciente == infotable) {





                  axios.get(`/api/especialistas/${idEsp}`)
                    .then(result => {

                      const dataEspecialista = result.data




                      const { nombre, apellido, especialidad } = dataEspecialista

                      // <button type="button" name="${idCita}" class="buttonEliminar" id="buttonEliminar"><i class="bi bi-x-circle"></i></button>
                      document.querySelector(`#citas-${infotable}`).innerHTML += `
                                  <tr>
                                      <th scope="row">${parseInt(key) + 1}</th>
                                      <td>${nombre} ${apellido}</td>
                                      <td>${especialidad}</td>
                                      <td>${moment(fecha.toString()).locale('es-us').format('LL')}</td>
                                      <td>${formatoHora}</td>
                                      <td>${consult}</td>
                                      <td>
                                          <div class="contentButton ${idCita}" name="${idCita}">
                                            <button type="button" name="${idCita}" class="buttonEliminar" id="buttonEliminar"><i class="bi bi-x-circle"></i></button>
                                          </div>
                                      </td>
                                  </tr>
                            `

                      const infoTableCitasButton = document.querySelectorAll('.infoTableCitas button')
                      console.log(infoTableCitasButton)
                      infoTableCitasButton.forEach(element => {
                        console.log(element)
                        element.addEventListener('click', (e) => {
                          e.preventDefault();
                          let id = e.target.name
                          Swal.fire({
                            title: 'Está seguro de eliminar la cita?',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonText: 'Sí, seguro',
                            cancelButtonText: 'No, no quiero'
                          }).then((result) => {
                            if (result.isConfirmed) {
                              Swal.fire({
                                title: 'Borrado!',
                                icon: 'success',
                                text: 'La cita a sido anulada'
                              })
                              axios.delete(`/api/citas/${id}`)
                                .then(result => {
                                  console.log('Salida de result', result)
                                  window.location.reload();
                                  classList.add('d-none')
                                })
                            }

                          })



                        })
                      })


                    })
                    .catch(e => console.log(e))


                }

              }
            }
          })
          .catch(e => console.log(e))



      })





    }

    if (window.location.pathname === '/especialistas') {

      // Evento de abrir modal
      UI.buttonNuevoEspecialista.addEventListener('click', openModalNewEspecialist);
      const formSubmit = document.querySelector('#openModalAddNewEspecialist__form')
      formSubmit.addEventListener('submit', validarNuevoEspecialista);


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

      //All Button eliminar
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
      //Cierre all Button eliminar

      //Inicio Buttons para eliminar
      UI.allButtonEditar.forEach(element => {
        element.addEventListener('click', (e) => {
          e.preventDefault();
          let id = e.target.name
          axios.get(`/api/especialistas/${id}`)
            .then(result => {
              const { pk_idEspecialista, nombre, apellido, sexo, fechaNacimiento, especialidad } = result.data
              UI.editNombre.value = nombre;
              UI.editApellido.value = apellido;
              UI.editSexo.value = sexo;
              UI.editFechaNacimiento.value = moment(fechaNacimiento).format('YYYY-MM-DD');
              UI.editEspecialidad.value = especialidad;
              UI.buttonEditarGuardarEspecialidad.setAttribute('id', pk_idEspecialista);

              openModalEditEspecialist(e)

            })
        })
      })
      //Inicio Buttons para eliminar

      //Inicio Button guardar editar
      UI.buttonEditarGuardarEspecialidad.addEventListener('click', (e) => {
        e.preventDefault();
        let pk_idEspecialista = e.target.id,
          nombre = UI.editNombre.value,
          apellido = UI.editApellido.value,
          sexo = UI.editSexo.value,
          fechaNacimiento = UI.editFechaNacimiento.value,
          especialidad = UI.editEspecialidad.value

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
            openModalEditEspecialist(e)
            location.reload();
          })
          .catch(err => console.log(err))

      })

    }

    addActive(window.location.pathname);





  })

}