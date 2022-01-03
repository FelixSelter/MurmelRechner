function createCollaboration() {
    collaborativeTextarea.init({
        textarea: document.getElementById('editing'),
        onOpen: enableRemote,
    });
}

function enableRemote(id) {
    //set the remote id
    let e = document.getElementById('peerAdress');
    e.text = id;
    e.style.border = '1px solid red';
    e.href = window.location.origin + '?host=' + id;

    //clear the share button
    document.getElementById('collaborationButton').outerHTML = '';
}

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('host')) {
    let hostID = urlParams.get('host');

    const template = document.getElementById('joinDialog');
    const clone = document.importNode(template.content, true);
    document.body.appendChild(clone);
    document.getElementById('questionBody').textContent = hostID;
}