/*'use strict';

const getStorage = (userName) => (localStorage.getItem(`${userName}`) ?
    JSON.parse(localStorage.getItem(`${userName}`)) : []);

const setStorage = (data, userName) => {
    localStorage.setItem(`${userName}`, JSON.stringify(data));
};

const addTaskData = (task, userName) => {
    const data = getStorage(userName);
    data.push(task);
    setStorage(data, userName)
};

const removeStorage = (number, userName) => {
    const data = getStorage(userName);
    const newData = data.filter(el => el.id !== number);
    setStorage(newData, userName)
};

const createTitle = () => {
    const title = document.createElement('h3');
    title.textContent = `Todo App`;
    return title;
};

const createForm = () => {
    const form = document.createElement('form');
    form.classList.add('d-flex', 'align-items-center', 'mb-3');
    form.insertAdjacentHTML('beforeend', `
   
          <label class="form-group me-3 mb-0">
          <input type="text" class="form-control" name="task" placeholder="ввести задачу">
          </label>
          <select class="form-control me-3 w-25" name="important" id="s1">
            <option value="table-light">обычная</option>
            <option value="table-warning">важная</option>
            <option value="table-danger">срочная</option>
            </select>
          <button type="submit" class="btn btn-primary me-3" name="save" disabled>
          Сохранить</button>
          <button type="reset" class="btn btn-warning">Очистить</button>
        `);
    return form;
};

const createTable = () => {
    const tableWrapper = document.createElement('div');
    tableWrapper.classList.add('table-wrapper');

    const table = document.createElement('table');
    table.classList.add('table', 'table-hover', 'table-bordered');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
    <tr>
        <th>№</th>
        <th>Задача</th>
        <th>Статус</th>
        <th>Действия</th>
    </tr>
    `);

    const tbody = document.createElement('tbody');
    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
};

const createRow = (obj, i) => {
    const tr = document.createElement('tr');
    if (obj.done == true) {
        tr.className = 'table-success';
    } else {
        tr.className = obj.important;
    }

    const tdNumber = document.createElement('td');
    tdNumber.className = 'row_number';
    tdNumber.textContent = i + 1;

    const tdTask = document.createElement('td');
    const idTask = obj.id;
    tdTask.setAttribute('id', idTask);
    tdTask.className = 'task'
    tdTask.textContent = obj.task;

    const tdStatus = document.createElement('td');
    if (obj.done == true) { 
    tdStatus.textContent = `Выполнено`;
    tdTask.classList.add('text-decoration-line-through');
    } else {
        tdStatus.textContent = `В процессе`;
    }

    const tdBtns = document.createElement('td');
    const btnDel = document.createElement('button');
    btnDel.classList.add('btn', 'btn-danger', 'me-2');
    btnDel.textContent = 'Удалить';
    const btnContinue = document.createElement('button');
    btnContinue.classList.add('btn', 'btn-success', 'me-2');
    btnContinue.textContent = 'Завершить';
    const btnEdit = document.createElement('button');
    btnEdit.classList.add('btn', 'btn-secondary');
    btnEdit.textContent = 'Редактировать';
    tdBtns.append(btnDel, btnContinue, btnEdit);

    tr.append(tdNumber, tdTask, tdStatus, tdBtns);

    return tr;
};

const renderTask = (list, data) => {
    for (let i = 0; i < data.length; i++) {
        const index = i;
        const row = createRow(data[i], index);
        list.append(row);
    }
}

const renderListToDo = (app) => {
    const title = createTitle();
    const form = createForm()
    const table = createTable()
    app.append(title, form, table);

    return {
        list: table.tbody,
        table,
        form,
    };
};

const addListToDoPage = (task, list) => {
    const rowNumber = document.querySelectorAll('.row_number');
    const i = rowNumber.length;
    list.append(createRow(task, i));
};


const formControl = (form, list, userName) => {

    form.task.addEventListener('keyup', e => {
        if (form.task.value.length > 1) {
            form.save.removeAttribute('disabled');
        }
        else {
            form.save.setAttribute('disabled', 'disabled')
        };
    });


    form.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append('id', `${Math.random().toString().substring(2, 10)}`);
        formData.append('done', false);

        const newTask = Object.fromEntries(formData);
        addListToDoPage(newTask, list);
        addTaskData(newTask, userName);
        form.reset();
        form.save.setAttribute('disabled', 'disabled');
    });
};

const listToDoAction = (list, userName) => {
    list.addEventListener('click', (e) => {
        const target = e.target;
        const row = target.closest('tr');
        const idRow = row.children[1].getAttribute('id');
               
        if (target.closest('.btn-success')) {
            row.className = 'table-success';
            row.children[1].classList.add('text-decoration-line-through');
            row.children[2].textContent = 'Выполнена';
            const chek = getStorage(userName);
            chek.forEach(obj => {
                if (obj.id === idRow) {
                    obj.done = true;
                }
                setStorage(chek, userName);
            })
        }
        else if (target.closest('.btn-secondary')) {
            row.children[1].setAttribute('contenteditable', true);
        }
        else if (target.closest('.btn-danger')) {
            if (confirm(`Вы уверены?`)) {
                row.remove();
                const rowNumber = document.querySelectorAll('.row_number');
                for (let i = 0; i < rowNumber.length; i++) {
                    rowNumber[i].textContent = `${i + 1}`;
                    removeStorage(idRow, userName);
                }
            }
        }
    })
};*/
import {getStorage} from './modules/serviseStorage.js';
import { renderListToDo, renderTask} from './modules/render.js';
import {formControl} from './modules/formControl.js';
import {listToDoAction} from './modules/listAction.js';


const init = (selectorApp) => {
    const app = document.querySelector(selectorApp);
    app.classList.add('justify-content-center', 'flex-column', 'vh-100', 'w-100', 'd-flex', 'align-items-center');

   const userName = prompt('Введите Ваше имя');
   const data = getStorage(userName);

    const {
        list,
        table,
        form,
    } = renderListToDo(app);

    const allRow = renderTask(list, data);
    listToDoAction(list, userName);
    formControl(form, list, userName);
};

init('.app-container');




