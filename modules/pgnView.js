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


    clearMoveRows() {
        this.elem.innerHTML = "";
    }

    makeMoveRow(whiteMove, blackMove) {
        let container = document.createElement('div');
        container.className = "moveRow";

        let whiteElem = document.createElement('div');
        whiteElem.appendChild(document.createTextNode(whiteMove));
        container.appendChild(whiteElem);

        let blackElem = document.createElement('div');
        blackElem.appendChild(document.createTextNode(blackMove));
        container.appendChild(blackElem);

        return container
    }

    update() {
        this.clearMoveRows();

        let last = null;
        for (let move of this.game.history())
            if (!last)
                last = move
            else {
                this.elem.appendChild(this.makeMoveRow(last, move))
                last = null;
            }

        if (last)
            this.elem.appendChild(this.makeMoveRow(last, ""));

        return this;
    }
}