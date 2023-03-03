import {createTitle, createForm, createTable, createRow} from './createElements.js';

export const renderTask = (list, data) => {
    for (let i = 0; i < data.length; i++) {
        const index = i;
        const row = createRow(data[i], index);
        list.append(row);
    };
};

export const renderListToDo = (app) => {
    const title = createTitle();
    const form = createForm();
    const table = createTable();
    app.append(title, form, table);

    return {
        list: table.tbody,
        table,
        form,
    };
};