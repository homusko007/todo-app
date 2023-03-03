import { getStorage, setStorage, removeStorage } from "./serviseStorage.js";

export const listToDoAction = (list, userName) => {
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
};