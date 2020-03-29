import Player from './Player'
import Utils from './Utils'

class UserPlayer extends Player {
  MAX_SPEED=10


  init() {
    // window.gameEngine.inputController.subscribeToMouseMove(pos=>{
      // this.position = pos
    // })
    window.gameEngine.inputController.subscribeToMouseClick(pos=>{
      this.targetPosition = pos
      const angle = Math.atan2(pos.y-this.position.y, pos.x-this.position.x) 
      this.velocity = {x: this.MAX_SPEED*Math.cos(angle), y: this.MAX_SPEED*Math.sin(angle)}
    })
    this.playerColor="blue"
    this.bulletColor="blue"
  }

  update() {
    if(this.velocity) {
      this.position.x+=this.velocity.x
      this.position.y+=this.velocity.y
      if(Utils.distance(this.position,this.targetPosition) < 10) {
        this.velocity=undefined
      }
    }
    super.update()
  }
}

export default UserPlayer