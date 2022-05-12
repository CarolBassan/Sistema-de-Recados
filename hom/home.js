class StorageAdapter {
    static setItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    static getItem(key) {
        return JSON.parse(localStorage.getItem(key));
    }
    static removeItem(key) {
        localStorage.removeItem(key);
    }
};


let myRemoveModal = new bootstrap.Modal(document.getElementById('removeModal'));
let myUpdateModal = new bootstrap.Modal(document.getElementById('updateModal'));

let messagesTable = document.getElementById('messagesTable').getElementsByTagName('tbody')[0];
const username = sessionStorage.getItem('user');
let users = StorageAdapter.getItem('users');
let user;
let userUid;


function generateRows(index, description, detail, buttons) {
    let row = messagesTable.insertRow(messagesTable.rows.length);
    row.insertCell().innerHTML = index + 1;
    row.insertCell().innerHTML = description;
    row.insertCell().innerHTML = detail;
    row.insertCell().innerHTML = buttons;

};


function load() {

    
    while (messagesTable.firstChild) {
        messagesTable.removeChild(messagesTable.firstChild);
    }

    
    for (let i = 0; i < users.length; i++) {
        if (username == users[i].username) {
            user = users[i];
            userUid = i;
            break;
        }
    }

    
    for (let x = 0; x < user.messages.length; x++) {
        let buttons = `<button onClick="showRemoveModal(${x})" type="button" class="btn btn-danger text-light me-2">Apagar</button><button onClick="showUpdateModal(${x})" type="button" class="btn btn-success text-light">Editar</button>`;
        generateRows(x, user.messages[x].description, user.messages[x].detail, buttons);
    }
};


function showUpdateModal(id) {
    document.getElementById('descriptionEdit').value = user.messages[id].description;
    document.getElementById('detailEdit').value = user.messages[id].detail;
    document.getElementById('confirmSave').onclick = function () { update(id) };
    myUpdateModal.show();
};


function showRemoveModal(id) {
    myRemoveModal.show();
    document.getElementById('confirmRemove').onclick = function () { remove(id) };
};


function Message(_description, _detail) {
    this.description = _description;
    this.detail = _detail;
};


function insert() {
    let description = document.getElementById('description').value;
    let detail = document.getElementById('detail').value;

    if (!description || !detail) return alert('Informe a descrição e o detalhe');

    user.messages.push(new Message(description, detail));

    users[userUid] = user;

    StorageAdapter.setItem('users', users);

    let index = messagesTable.rows.length
    let buttons = `<button onClick="showRemoveModal(${index})" type="button" class="btn btn-danger text-light me-2">Apagar</button><button onClick="showUpdateModal(${index})" type="button" class="btn btn-success text-light">Editar</button>`;
    generateRows(index, description, detail, buttons);

};


function update(id) {
    let description = document.getElementById('descriptionEdit').value;
    let detail = document.getElementById('detailEdit').value;

    if (!description || !detail) return alert('Informe a descrição e o detalhe');

    user.messages[id].description = description;
    user.messages[id].detail = detail;
    users[userUid].messages = user.messages;    
    StorageAdapter.removeItem('users');         
    StorageAdapter.setItem('users', users);    
    load();                                     
    myUpdateModal.hide();
};


function remove(id) {
    user.messages.splice(id, 1);               
    users[userUid].messages = user.messages;    
    StorageAdapter.removeItem('users');         
    StorageAdapter.setItem('users', users);     
    load();                                    
    myRemoveModal.hide();
};
