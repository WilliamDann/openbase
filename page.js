const toggleModal = (id) => 
{
    const elem = document.querySelector(`#${id}`);
    if (!elem)
          throw new Error(`Invalid element #${id}`);

    if (!elem.style.display)
          elem.style.display = 'none';
    elem.style.display = (elem.style.display == 'none') ? 'block' : 'none';
}
let mainView = new View()
      .link('#mainView')
      .init()
let splitView = mainView.splitAdj();

let board = new Board().init('board', mainView.adjacent[0].elem);
let pgn   = new PGNEditor(board.game).init('pgnedit', mainView.adjacent[1].elem);
