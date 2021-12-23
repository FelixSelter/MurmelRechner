//on reload the textarea will still contain text. We have to put that into the code element and format the text
function init() {
    update(document.getElementById('editing').value);
}
window.onload = init;

//Split screen from split.js
Split(['#split-left', '#split-right']);

function update(text) {
    // Update code
    let code = document.getElementById('highlighting-content');
    code.innerText = escapist.html(text);

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
        ],
        selector: '#highlighting-content',
    });

    //linenums
    let linenums = document.getElementById('linenums');
    let linecount = text.split('\n').length;

    //reset value
    linenums.value = '';

    //add line number for every line
    for (let i = 1; i <= linecount; i++) linenums.value += i + '\n';

    //adjust size if necessary
    document.getElementById('scroll').style.gridTemplateColumns =
        linecount.toString().length * 3.5 + '%';
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
            update(data);
        });
    }
}
document.getElementById('openButton').addEventListener('change', load);