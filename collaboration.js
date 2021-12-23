var peer;

function createCollaboration() {
    //dont generate more than one
    if (peer) return;

    peer = new Peer();
    peer.on('open', function(id) {
        let e = document.getElementById('peerAdress');
        e.text = peer.id;
        e.style.border = '1px solid red';
        e.href = window.location.href + '?host=' + peer.id;
    });

    peer.on('connection', function(client) {
        client.on('data', function(data) {
            console.log(data);
        });
    });
}

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('host')) {
    let hostID = urlParams.get('host');

    //set the remote id
    let e = document.getElementById('peerAdress');
    e.text = hostID;
    e.style.border = '1px solid red';
    e.href = window.location.href + '?host=' + hostID;

    //clear the share button
    document.getElementById('collaborationButton').outerHTML = '';

    //connect to the host
    peer = new Peer();
    peer.on('open', function(id) {
        var host = peer.connect(hostID);
        host.on('open', function() {
            host.send('hi!');
            console.log('connected');
        });
    });
}