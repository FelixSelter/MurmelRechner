function generateFlowChart() {
    let tab = window.open(
        window.location.origin.replace('/index.html', '') + '/FlowChart.html',
        'Flowchart'
    );

    tab.addEventListener(
        'load',
        (e) => {
            let chart = flowchart.parse(generateFlowChartCode());
            chart.drawSVG(tab.document.getElementById('canvas'), {
                'line-width': 3,
                'text-margin': 10,
                'font-size': 14,
                font: 'normal',
                'font-family': 'Helvetica',
                'font-weight': 'normal',
                'font-color': 'black',
                'line-color': 'black',
                'element-color': 'black',
                'yes-text': 'yes ',
                'no-text': 'no ',
                'arrow-end': 'block',
                scale: 1,
                symbols: {
                    start: {
                        'font-color': 'white',
                        fill: 'green',
                    },
                    end: {
                        'font-color': 'white',
                        fill: '#dc143c',
                    },
                    operation: {
                        fill: '#00ffff',
                    },
                    condition: {
                        fill: '#ffc0cb',
                    },
                    inputoutput: {
                        fill: '#ff8000',
                    },
                    subroutine: {
                        fill: 'red',
                    },
                },
            });
        },
        true
    );
}

function generateFlowChartCode() {
    let source = getCleanCode();
    if (source.length < 1) return '';

    code = `start=>start: Start\n`;

    source.forEach((cmd, index) => {
        let line = index + 1;
        let nodetype = 'operation';

        if (cmd.startsWith('dec')) {
            nodetype = 'subroutine';
        } else if (cmd.startsWith('tst')) {
            nodetype = 'condition';
        } else if (cmd.startsWith('jmp')) {
            nodetype = 'inputoutput';
        } else if (cmd == 'hlt') {
            nodetype = 'end';
        }

        code += `node${line}=>${nodetype}: ${cmd}\n`;
    });

    code += `\nstart->node1\n`;
    source.forEach((cmd, index) => {
        let line = index + 1;

        if (cmd.startsWith('tst')) {
            code += `node${line}(no)->node${line + 1}\n`;
            code += `node${line}(yes)->node${line + 2}\n`;
        } else if (cmd.startsWith('jmp')) {
            code += `node${line}->node${cmd.replace('jmp ', '')}\n`;
        } else {
            code += `node${line}->node${line + 1}\n`;
        }
    });

    return code;
}