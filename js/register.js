function addRegister() {
    const template = document.getElementById('register');
    const registerParent = document.getElementById('scroll-left');
    const clone = document.importNode(template.content, true);
    registerParent.appendChild(clone);

    let registerContainer =
        registerParent.children[registerParent.children.length - 1];
    let toAdd = registers[registerParent.children.length - 1];
    if (toAdd > 0)
        for (let i = 0; i < toAdd; i++) {
            let marble = document.createElement('div');
            marble.classList.add('marble');
            registerContainer.querySelector('.register').appendChild(marble);
        }
}

function removeRegister() {
    const registerParent = document.getElementById('scroll-left');
    registerParent.removeChild(registerParent.lastElementChild);
}

function addToRegister(index) {
    let toCreate =
        index + 1 - document.getElementById('scroll-left').children.length;
    if (toCreate > 0)
        for (let i = 0; i < toCreate; i++) addRegister();

    let registerContainer =
        document.getElementById('scroll-left').children[index];
    let marble = document.createElement('div');
    marble.classList.add('marble');
    registerContainer.querySelector('.register').appendChild(marble);

    if (registers[index] == null) registers[index] = 0;
    registers[index]++;
}

function removeFromRegister(index) {
    let toCreate =
        index + 1 - document.getElementById('scroll-left').children.length;
    if (toCreate > 0)
        for (let i = 0; i < toCreate; i++) addRegister();

    if (registers[index] == null) registers[index] = 0;
    registers[index]--;
    if (registers[index] < 0) registers[index] = 0;
    else {
        let registerContainer =
            document.getElementById('scroll-left').children[index];
        let register = registerContainer.querySelector('.register');
        register.removeChild(register.lastElementChild);
    }
}