function createCollaboration() {
    collaborativeTextarea.init({
        textarea: document.getElementById('editing'),
        onOpen: enableRemote,
        onUpdate: remoteUpdateHandler,
    });
}

function enableRemote(id) {
    //set the remote id
    let e = document.getElementById('peerAdress');
    e.text = id;
    e.style.border = '1px solid red';
    e.href = window.location.href.replace('/index.html', '') + '?host=' + id;

    //clear the share button
    document.getElementById('collaborationButton').outerHTML = '';
}

function connectJoin() {
    if (document.getElementById('editing').value == '') {
        let remoteId = document.getElementById('questionBody').textContent;
        document.getElementsByClassName('blockAccess')[0].remove();

        collaborativeTextarea.init({
            textarea: document.getElementById('editing'),
            onOpen: function(myID) {
                collaborativeTextarea.connect(remoteId);
                enableRemote(myID);
            },
            onUpdate: remoteUpdateHandler,
        });
    } else alert('Clear your editor before connecting');
}

function cancelJoin() {
    window.location.href = window.location.origin + window.location.pathname;
}

function remoteUpdateHandler() {
    update();
}

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('host')) {
    let hostID = urlParams.get('host');

    const template = document.getElementById('joinDialog');
    const clone = document.importNode(template.content, true);
    document.body.appendChild(clone);
    document.getElementById('questionBody').textContent = hostID;
}