function cleanCode() {
    let textarea = document.getElementById('editing');

    let regex = /inc [0-9]+|dec [0-9]+|tst [0-9]+|jmp [0-9]+|hlt|\n|-*/g;
    let matches = textarea.value.match(regex);

    //remove emmpty lines that get produced if regex not matches
    matches = matches.filter((match) => match != '');

    if (matches == null) {
        textarea.value = '';
        update();
        textarea.focus();
        return;
    }

    let formatted = '';
    let expectBreak = false;
    matches.forEach((match, index) => {
        //append line break if neccessary
        if (match == '\n') {
            expectBreak = false;
        } else {
            if (expectBreak) {
                formatted += '\n';
                expectBreak = false;

                //dont expect linebreak after indetend
            } else if (match != '--') {
                expectBreak = true;
            }
        }

        //append -- after tst
        if (match.startsWith('tst')) {
            for (let i = index + 1; i < matches.length; i++) {
                if (matches[i] == '\n') continue;
                if (matches[i].startsWith('--')) break;
                matches[i] = matches[i].startsWith('-') ? '-' : '--' + matches[i];
                break;
            }
        }
        formatted += match;
    });

    textarea.value = formatted;
    update();
    textarea.focus();
}

function getCleanCode(code) {
    let textarea = document.getElementById('editing');

    let regex = /inc [0-9]+|dec [0-9]+|tst [0-9]+|jmp [0-9]+|hlt/g;
    let matches = textarea.value.match(regex);

    return matches;
}