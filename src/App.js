import React, { Component } from 'react';
import original from './images/original.jpg'
import "./App.css";


// class Jigsaw extends Component {
  

//   // ...
// }


class App extends React.Component {
  state = {
    pieces: [],
    shuffled: [],
    solved: []
  };
  shufflePieces(pieces) {
    const shuffled = [...pieces];
  
    for (let i = shuffled.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
  
    return shuffled;
  }
  renderPieceContainer(piece, index, boardName) {
    return (
      <li key={index} onDragOver={(e) => e.preventDefault()} onDrop={(e) => this.handleDrop(e, index, boardName)}>
        {piece && <img 
        draggable 
        onDragStart={(e) => this.handleDragStart(e, piece.order)}
        src={require(`./images/${piece.img}`)}/>}
      </li>
    );
  }
  handleDragStart(e, order) {
    e.dataTransfer.setData('text/plain', order);
  }
  handleDrop(e, index, targetName) {
    let target = this.state[targetName];
    if (target[index]) return;
  
    const pieceOrder = e.dataTransfer.getData('text');
    const pieceData = this.state.pieces.find(p => p.order === +pieceOrder);
    const origin = this.state[pieceData.board];
  
    if (targetName === pieceData.board) target = origin;
    origin[origin.indexOf(pieceData)] = undefined;
    target[index] = pieceData;
    pieceData.board = targetName;
    this.setState({ [pieceData.board]: origin, [targetName]: target })
  }
  componentDidMount() {
    const pieces = [...Array(16)]
      .map((_, i) => (
        {
          img: `img${i+1}.jpg`,
          order: i,
          board: 'shuffled'
        }
      ));
  
    this.setState({
      pieces,
      shuffled: this.shufflePieces(pieces),
      solved: [...Array(16)]
    });
  }

      render() {
        return (
          <div className="jigsaw">
            <ul className="jigsaw__shuffled-board">
              {
                this.state.shuffled.map((piece, i) =>
                this.renderPieceContainer(piece, i, 'shuffled'))
              }
            </ul>
            <ol className="jigsaw__solved-board" style={{ backgroundImage: `url(${this.original})` }}>
              {
                this.state.solved.map((piece, i) =>
                this.renderPieceContainer(piece, i, 'solved'))
              }
            </ol>
          </div>
        );
      }
}
  
export default App;