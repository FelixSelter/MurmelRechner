function generateFlowChart() {
    let tab = window.open('/FlowChart.html', 'Flowchart');

    tab.addEventListener(
        'load',
        (e) => {
            console.log(tab.document.getElementById('canvas'));

            let chart = flowchart.parse(generateFlowChartCode());
            chart.drawSVG(tab.document.getElementById('canvas'));
        },
        true
    );
}

function generateFlowChartCode() {
    code = `
    st=>start: Start|past:>http://www.google.com[blank]
    e=>end: End:>http://www.google.com
    op1=>operation: My Operation|past:$myFunction
    op2=>operation: Stuff|current
    sub1=>subroutine: My Subroutine|invalid
    cond=>condition: Yes
    or No?|approved:>http://www.google.com
    c2=>condition: Good idea|rejected
    io=>inputoutput: catch something...|request
    para=>parallel: parallel tasks
    
    st->op1(right)->cond
    cond(yes, right)->c2
    cond(no)->para
    c2(true)->io->e
    c2(false)->e
    
    para(path1, bottom)->sub1(left)->op1
    para(path2, right)->op2->e  
   `;

    return code;
}