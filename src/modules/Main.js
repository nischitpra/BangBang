import React from 'react'
import GameEngine from './GameEngine'
import InputController from './InputController'

class Main extends React.Component {

  constructor(props) {
    super(props)

    window.gameEngine = new GameEngine()
    window.appContext = this
  }
  
  componentDidMount() {
    this.initCanvas()
  }

  initCanvas() {
    window.canvas = this.refs.gameCanvas
    window.ctx = window.canvas.getContext('2d');
    window.ctx.fillStyle='#eeeeee'
    window.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    window.gameEngine.init()
  }

  render() {
    (window.ctx && window.gameEngine.draw())
    return (
      <div>
        <canvas 
        ref = "gameCanvas" 
        width={window.innerWidth} 
        height={window.innerHeight} 
        onMouseMove={window.gameEngine.inputController.handleMouseMove}
        onMouseDown={window.gameEngine.inputController.handleMouseClick}
        />
      </div>
    )
  }

}

export default Main