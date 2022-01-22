var registers = [];
var line = 1;
var shouldExecute = false;

function processLine() {
  pointer.style.color = '#04aa6d';
  return executeLine();
}

function executeLine() {
  cleanCode();

  const code = getCleanCode();
  if (code == null) {
    shouldExecute = false;
    return;
  }
  if (line > code.length) {
    shouldExecute = false;
    return;
  }

  // setup pointer
  const pointer = document.getElementById('pointer');

  const content = code[line - 1];
  const cmd = content.substring(0, 3);
  const param = parseInt(content.substring(3, content.length));

  // set pointer to line
  const lines = document.getElementById('editing').value.split('\n');
  let linesOfCode = 0;

  for (let i = 0; i < lines.length; i++) {
    const lineContent = lines[i];
    if (lineContent != '') linesOfCode++; // check if this line is code
    if (linesOfCode == line) {
      pointer.style.top = i * 20 - 4 + 'pt';
      break;
    }
  }

  // evaluate code
  switch (cmd) {
    case 'jmp':
      line = param - 1;
      break;

    case 'tst':
      // If register exists and it does not conatin content
      if (registers[param - 1] != null && !(registers[param - 1] > 0)) line++;
      break;

    case 'hlt':
      shouldExecute = false;
      return;

    case 'inc':
      addToRegister(param - 1);
      break;

    case 'dec':
      removeFromRegister(param - 1);
      break;

    default:
      break;
  }

  line++;
  return;
}

async function execute() {
  shouldExecute = true;
  while (true) {
    processLine();
    if (!shouldExecute) {
      await sleep(1000);
      resetSimulator();
      break;
    }
    await sleep(1000);
  }
}

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function resetSimulator() {
  shouldExecute = false;
  line = 1;
  pointer.style.top = '-4pt';
  pointer.style.color = 'red';
}
