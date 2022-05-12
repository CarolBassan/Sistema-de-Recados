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

function signIn() {

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Informe seus dados');
        return;
    };

    let users = StorageAdapter.getItem('users');

    if (!users) {
        StorageAdapter.setItem('users', []);
        users = StorageAdapter.getItem('users');
    };

    let isLogged = false;

    for (const user of users) {
        if (username == user.username) {
            if (password == user.password) {
                isLogged = true;
                break;
            }
        }
    };

    if (!isLogged) {
        alert('Usuário não encontrado. Verifique seus dados, ou realize seu cadastro.');
        return;
    };

    sessionStorage.setItem('user', username);

    location.href = '../hom/home.html';
};

function user(_username, _password) {
    this.username = _username;
    this.password = _password;
    this.messages = [];
};