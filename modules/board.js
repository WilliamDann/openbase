class Board {
    constructor() {
        this.elem   = null;
        this.board  = null;
        this.game   = null;
    }

    init(id, container) {
        let board = document.createElement('div');
        board.style.width = '100%';
        board.id = id;
        container.appendChild(board);
        this.elem = board;

        const cfg = {
            draggable: true,
            position: 'start',
            onDragStart: this.onDragStart.bind(this),
            onDrop: this.onDrop.bind(this),
            onSnapEnd: this.onSnapEnd.bind(this)
        }
        this.game = new Chess();
        this.board = Chessboard(id, cfg);
        addEventListener('resize', this.onWindowResize.bind(this))
        return this;
    }

    onWindowResize() {
        this.board.resize();
    }

    onDragStart (source, piece, position, orientation) {
        if (this.game.game_over()) return false
    }

    onDrop (source, target) {
        var move = this.game.move({
        from: source,
        to: target,
        promotion: 'q' // TODO promote modal
        })

        if (move === null) 
            return 'snapback'

        document.dispatchEvent(new CustomEvent('boardState', {detail: this.game}));
    }

    onSnapEnd () {
        this.board.position(this.game.fen())
    }
}