queue = []




/*queue.push(1);
queue.push(2);
queue.push(3);
queue.shift();

function moveSnakeRight() {
    const tail = queue[0];
    tableArray[tail.height][tail.width] = 0;

    var tempHeight = head.height;
    var nextPosition = head.width + 1;

    if (nextPosition >= tabWidth) nextPosition = 0;

    tableArray[tempHeight][nextPosition] = 1;

    head = {
        height: tempHeight,
        width: nextPosition
    }
    queue.push(head);
    queue.shift();

    renderTable();
}

function moveSnakeLeft() {
    const tail = queue[0];
    tableArray[tail.height][tail.width] = 0;

    var tempHeight = head.height;
    var nextPosition = head.width - 1;

    if (nextPosition < 0) nextPosition = tabWidth - 1;

    tableArray[tempHeight][nextPosition] = 1;

    head = {
        height: tempHeight,
        width: nextPosition
    }
    queue.push(head);
    queue.shift();

    renderTable();
}

function moveSnakeUp() {
    const tail = queue[0];
    tableArray[tail.height][tail.width] = 0;

    var tempWidth = head.width;
    var nextPosition = head.height - 1;

    if (nextPosition < 0) nextPosition = tabHeight - 1;

    tableArray[nextPosition][tempWidth] = 1;

    head = {
        height: nextPosition,
        width: tempWidth
    }
    queue.push(head);
    queue.shift();

    renderTable();
}

function moveSnakeDown() {
    const tail = queue[0];
    tableArray[tail.height][tail.width] = 0;

    var tempWidth = head.width;
    var nextPosition = head.height + 1;

    if (nextPosition >= tabHeight) nextPosition = 0;

    tableArray[nextPosition][tempWidth] = 1;

    head = {
        height: nextPosition,
        width: tempWidth
    }
    queue.push(head);
    queue.shift();

    renderTable();
}
*/