function cleanCode() {
    let textarea = document.getElementById('editing');
    textarea.value = getCleanCode(textarea.value);
    update();
    textarea.focus();
}

function getCleanCode(code) {
    let regex = /inc [0-9]+|dec [0-9]+|tst [0-9]+|jmp [0-9]+|hlt|\n/g;
    let matches = code.match(regex);

    let formatted = '';
    let expectBreak = false;
    matches.forEach((match) => {
        if (match == '\n') {
            expectBreak = false;
        } else {
            if (expectBreak) {
                formatted += '\n';
                expectBreak = false;
            } else {
                expectBreak = true;
            }
        }
        formatted += match;
    });

    return formatted;
}