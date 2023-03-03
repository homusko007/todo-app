export const createTitle = () => {
    const title = document.createElement('h3');
    title.textContent = `Todo App`;
    return title;
};

export const createForm = () => {
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

export const createTable = () => {
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

export const createRow = (obj, i) => {
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
