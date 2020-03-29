import Player from './Player'

class UserPlayer extends Player {


  init() {
    window.gameEngine.inputController.subscribeToMouseMove(pos=>{
      this.position = pos
    })
    // window.gameEngine.inputController.subscribeToMouseClick(pos=>{
      // this.shoot()
    // })
    this.playerColor="blue"
    this.bulletColor="blue"
  }

}

export default UserPlayer