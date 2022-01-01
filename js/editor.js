//on reload the textarea will still contain text. We have to put that into the code element and format the text
function init() {
    update();
}
window.onload = init;

//warn when user leaves page
// window.addEventListener('beforeunload', function(e) {
//     var confirmationMessage =
//         'You have unsaved changes. Are you sure to leave the page?';
//     (e || window.event).returnValue = confirmationMessage;
//     return confirmationMessage;
// });

//Split screen from split.js
Split(['#split-left', '#split-right']);

function update() {
    let text = document.getElementById('editing').value;

    // Update code xss is handled as every single char is wrapped with a span
    let code = document.getElementById('highlighting-content');
    code.innerText = text;

    // Syntax Highlight
    highlight({
        patterns: [{
                name: 'format-register-number',
                match: [/^inc ([0-9]+)/, '<span class="format-inc">inc </span>', ''],
            },
            {
                name: 'format-register-number',
                match: [/^dec ([0-9]+)/, '<span class="format-dec">dec </span>', ''],
            },
            {
                name: 'format-register-number',
                match: [/^tst ([0-9]+)/, '<span class="format-tst">tst </span>', ''],
            },
            {
                name: 'format-line-number',
                match: [/^jmp ([0-9]+)/, '<span class="format-jmp">jmp </span> ', ''],
            },
            {
                name: 'format-hlt',
                match: /^(hlt)/,
            },
            {
                name: 'format-none',
                match: /^(&#10;)/,
            },
            {
                name: 'format-none',
                match: /^(-)/,
            },
            {
                name: 'format-error',
                match: /^(.)/,
            },
        ],
        selector: '#highlighting-content',
    });

    //linenums
    let linenums = document.getElementById('linenums');
    let lines = text.split('\n');

    //reset value
    linenums.value = '';

    //add line number for every line that is not empty
    let counter = 1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i] != '') {
            linenums.value += counter + '\n';
            counter++;
        } else {
            linenums.value += '\n';
        }
    }

    //adjust size if necessary
    document.getElementById('scroll-right').style.gridTemplateColumns =
        '40px ' + (getTextWidth(counter) + 20) + 'px';
}

function save() {
    var text = document.getElementById('editing').value;
    var blob = new Blob([text], { type: 'text/plain' });
    var anchor = document.createElement('a');
    anchor.download = 'code.txt';
    anchor.href = window.URL.createObjectURL(blob);
    anchor.target = '_blank';
    anchor.style.display = 'none'; // just to be safe!
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
}

async function load(e) {
    const input = e.target;
    if (input.files && input.files.length > 0) {
        const reader = new FileReader();
        new Promise((resolve, reject) => {
            reader.onload = (event) => resolve(event.target.result);
            reader.onerror = (error) => reject(error);
            reader.readAsText(input.files[0]);
        }).then((data) => {
            document.getElementById('editing').value = data;
            update();
        });
    }
}
document.getElementById('openButton').addEventListener('change', load);

function getTextWidth(text) {
    let measure = document.createElement('div');
    measure.innerHTML = text;
    measure.style.position = 'absolute';
    measure.style.float = 'left';
    measure.style.whiteSpace = 'nowrap';
    measure.style.visibility = 'hidden';
    measure.style.fontSize = '15pt';
    measure.style.fontFamily = 'monospace';
    measure.style.lineHeight = '20pt';

    document.body.appendChild(measure);
    let width = measure.clientWidth;
    measure.remove();

    return width;
}