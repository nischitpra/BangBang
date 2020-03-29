import Player from './Player'

class PlayerManager {
  constructor(userPlayer) {
    this.init(userPlayer)
  }

  init(userPlayer) {
    this.players = [userPlayer, new Player()]
  }

  update() {

  }

  draw() {
    for(let i=0;i<this.players.length;i++) this.players[i].draw()
  }

}

export default PlayerManager