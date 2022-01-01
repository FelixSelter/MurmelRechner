var registers = [3, 2, 0, 0];
var line = 1;

function processLine() {
    pointer.style.color = '#04aa6d';
    let end = executeLine();

    //reset
    if (end) {
        line = 1;
        pointer.style.top = '-4pt';
        pointer.style.color = 'red';
        return true;
    }
}

function executeLine() {
    cleanCode();

    let code = getCleanCode();
    if (code == null) return true;
    if (line > code.length) return true;

    //setup pointer
    const pointer = document.getElementById('pointer');

    const content = code[line - 1];
    const cmd = content.substring(0, 3);
    const param = parseInt(content.substring(3, content.length));

    //set pointer to line
    let lines = document.getElementById('editing').value.split('\n');
    let linesOfCode = 0;

    for (let i = 0; i < lines.length; i++) {
        const lineContent = lines[i];
        if (lineContent != '') linesOfCode++; //check if this line is code
        if (linesOfCode == line) {
            pointer.style.top = i * 20 - 4 + 'pt';
            break;
        }
    }

    //evaluate code
    switch (cmd) {
        case 'jmp':
            line = param - 1;
            break;

        case 'tst':
            if (registers[param - 1] && registers[param - 1] > 0) line++;
            break;

        case 'hlt':
            return true;

        case 'inc':
            registers[param - 1]++;
            break;

        case 'dec':
            registers[param - 1]--;
            break;

        default:
            break;
    }

    line++;
    return false;
}

async function execute() {
    while (true) {
        await Sleep(1000);
        if (processLine()) break;
    }
}

function Sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}