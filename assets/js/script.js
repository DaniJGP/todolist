const tareaForm = document.getElementById('tarea-form');
const tareaInput = document.getElementById('tarea-input');
const listaTareas = document.getElementById('lista-tareas');
const contadorTareas = document.getElementById('counter-total');
const contadorRealizadas = document.getElementById('counter-realizadas');

let tareas = [
    { id: 0, nombre: 'Comprar mercadería', realizada: true },
    { id: 1, nombre: 'Realizar desafío', realizada: false },
    { id: 3, nombre: 'Pasear a Doki', realizada: true },
];

const agregarTarea = (nombre) => {
    tareas.push({
        id: Date.now(),
        nombre: nombre,
        realizada: false,
    });
    tareaInput.value = '';
};

const actualizarListaTareas = () => {
    let nuevaLista = '';
    tareas.forEach((tarea, index) => {
        nuevaLista += `
        <tr id="${tarea.id}">
          <td>${index + 1}</td>
          <td>${tarea.nombre}</td>
          <td><input type="checkbox" ${tarea.realizada ? 'checked' : ''}></td>
          <td><button class="btn-del">Eliminar</button></td>
        </tr>`;
    });
    listaTareas.innerHTML = nuevaLista;
    agregarListeners();
};

const actualizarContadores = () => {
    contadorTareas.textContent = tareas.length;
    contadorRealizadas.textContent = tareas.filter((tarea) => tarea.realizada).length;
};

const agregarListeners = () => {
    listaTareas.querySelectorAll('tr').forEach((tr) => {
        tr.querySelector('.btn-del').addEventListener('click', () => {
            const index = tareas.findIndex((tarea) => tarea.id == tr.id);
            tareas.splice(index, 1);
            actualizarListaTareas();
            actualizarContadores();
        });
        tr.querySelector('input').addEventListener('change', (e) => {
            const index = tareas.findIndex((tarea) => tarea.id == tr.id);
            if (e.currentTarget.checked) {
                tareas[index].realizada = true;
            } else {
                tareas[index].realizada = false;
            }
            actualizarContadores();
        });
    });
};

tareaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    agregarTarea(tareaInput.value);
    actualizarListaTareas();
    actualizarContadores();
});

actualizarListaTareas();
actualizarContadores();