//Split screen from split.js
Split(['#split-left', '#split-right']);

function update(text) {
    let result_element = document.querySelector('#highlighting-content');
    // Update code
    result_element.innerText = text;
    // Syntax Highlight
    highlight({
        patterns: [{
                name: 'string',
                match: /^(\'[^\'\n]*\')/,
            },
            {
                name: 'fn-call',
                match: [/^([A-z_]+)\(/, '', '('],
            },
        ],
    });
}