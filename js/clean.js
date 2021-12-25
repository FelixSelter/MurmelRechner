function cleanCode() {
    let textarea = document.getElementById('editing');

    let regex = /inc [0-9]+|dec [0-9]+|tst [0-9]+|jmp [0-9]+|hlt|\n/g;
    let matches = textarea.value.match(regex);

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

    textarea.value = formatted;
    update();
    textarea.focus();
}

function getCleanCode(code) {
    return formatted;
}