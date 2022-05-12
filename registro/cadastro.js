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

function signUp() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    if (!username || !password || !confirmPassword) {
        alert('Informe seus dados');
        return;
    }

    if (password != confirmPassword) {
        alert('As senhas não são iguais!');
        return;
    }

    let users = StorageAdapter.getItem('users');

    let alreadyRegistered = false;

    for (const user of users) {
        if (username == user.username) {
            alreadyRegistered = true;
            break
        }
    }

    if (alreadyRegistered) {
        alert('Username já cadastrado, informe outro diferente.');
        return;
    }

    users.push(new user(username, password));

    StorageAdapter.setItem('users', users);

    sessionStorage.setItem('user', username);

    location.href = '../hom/home.html';
};

function user(_username, _password) {
    this.username = _username;
    this.password = _password;
    this.messages = [];
};