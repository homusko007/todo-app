export const getStorage = (userName) => (localStorage.getItem(`${userName}`) ?
    JSON.parse(localStorage.getItem(`${userName}`)) : []);

export const setStorage = (data, userName) => {
    localStorage.setItem(`${userName}`, JSON.stringify(data));
};

export const addTaskData = (task, userName) => {
    const data = getStorage(userName);
    data.push(task);
    setStorage(data, userName)
};

export const removeStorage = (number, userName) => {
    const data = getStorage(userName);
    const newData = data.filter(el => el.id !== number);
    setStorage(newData, userName)
};