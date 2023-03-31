function onDragStart (source, piece, position, orientation) {
    if (game.game_over()) return false
}

function onDrop (source, target) {
    var move = game.move({
    from: source,
    to: target,
    promotion: 'q' // TODO promote modal
    })
        
    if (move === null) 
        return 'snapback'
}

function onSnapEnd () {
    board.position(game.fen())
}

function makeBoard(containerId) {   
    let container = document.querySelector(`#${containerId}`);     
    let elem = document.createElement('div');
    elem.id = 'myBoard';
    elem.style.width = '400px';
    this.elem = elem;

    const cfg = {
        draggable: true,
        position: 'start',
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd: onSnapEnd
    }
    container.appendChild(elem);
    this.board = Chessboard('myBoard', cfg);
}