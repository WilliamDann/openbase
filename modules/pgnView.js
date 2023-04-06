class PGNEditor {
    constructor(game)
    {
        this.game = game;
    }

    init(id, container) {
        this.elem = document.createElement('div');
        this.elem.id = id;
        container.appendChild(this.elem);

        this.update();
        document.addEventListener('boardState', this.handleBoardUpdate.bind(this))

        return this;
    }

    handleBoardUpdate(event) {
        this.game = event.detail;
        this.update()
    }

    update() {
        this.elem.innerHTML = this.game.pgn(); // TODO
        return this;
    }
}