import {createRow} from './createElements.js';
import {addTaskData} from './serviseStorage.js';

const addListToDoPage = (task, list) => {
    const rowNumber = document.querySelectorAll('.row_number');
    const i = rowNumber.length;
    list.append(createRow(task, i));
};

export const formControl = (form, list, userName) => {

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

