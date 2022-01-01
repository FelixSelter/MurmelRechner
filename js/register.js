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
    checkRegisterCount(index);

    if (registers[index] == null) registers[index] = 0;
    registers[index]++;

    displayRegister(index);
}

function removeFromRegister(index) {
    checkRegisterCount(index);

    if (registers[index] == null) registers[index] = 0;
    registers[index]--;
    if (registers[index] < 0) registers[index] = 0;

    displayRegister(index);
}

function checkRegisterCount(index) {
    let toCreate =
        index + 1 - document.getElementById('scroll-left').children.length;
    if (toCreate > 0)
        for (let i = 0; i < toCreate; i++) addRegister();
}

function displayRegister(index) {
    let registerContainer =
        document.getElementById('scroll-left').children[index];
    let register = registerContainer.querySelector('.register');

    //clear everything
    register.innerHTML = '';

    // can show marbles
    if (registers[index] <= register.offsetWidth / 70) {
        //add marbles
        if (register.children.length != registers[index]) {
            for (let i = 0; i < registers[index]; i++) {
                let marble = document.createElement('div');
                marble.classList.add('marble');
                register.appendChild(marble);
            }
        }
    } //set text tag if it cant display marbles
    else
        register.innerHTML =
        '<p>' + (registers[index] ? registers[index] : '') + '</p>';
}

function updateAllRegisters() {
    for (
        let i = 0; i < document.getElementById('scroll-left').children.length; i++
    )
        displayRegister(i);
}
window.onresize = updateAllRegisters;