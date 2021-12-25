function cleanCode() {
    let textarea = document.getElementById('editing');
    textarea.value = getCleanCode(textarea.value);
    update();
    textarea.focus();
}

function getCleanCode(code) {
    let regex = /inc [0-9]+|dec [0-9]+|tst [0-9]+|jmp [0-9]+|hlt/g;
    let matches = code.match(regex);

    let formatted = '';
    matches.forEach((match, index) => {
        formatted += match;
        if (index < matches.length - 1) formatted += '\n';
    });

    return formatted;
}