import Utils from './Utils'
class Bullet {
  MAX_SPEED = 10
  DELETE_THRESHOLD = 100 // 100 millis
  constructor(playerId,startPosition, targetPosition, color) {
    this.playerId = playerId
    this.position = startPosition
    this.target = targetPosition
    this.color = color
    this.velocity = this.getVelocity()
    this.deletedTime = 0
  }

  getVelocity() {
    const angle = Math.atan2(this.target.y-this.position.y, this.target.x-this.position.x) 
    return {x: this.MAX_SPEED*Math.cos(angle), y: this.MAX_SPEED*Math.sin(angle)}
  }

  update() {
    if(this.deletedTime > 0) return // dont update if its going to be deleted
    if(this.hasCollision() && this.deletedTime==0) {
      this.deletedTime = new Date().getTime()
    } else {
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
    }
  }

  draw() {
    if((this.deletedTime+this.DELETE_THRESHOLD)> new Date().getTime()) {
      this.drawExplosion()
    }else {
      this.drawBullet()
    }
  }

  drawBullet() {
    const ctx = window.ctx
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI)
    ctx.fillStyle = this.color
    ctx.fill()
  }
  drawExplosion() {
    const ctx = window.ctx
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, 20, 0, 2 * Math.PI)
    ctx.fillStyle = "yellow"
    ctx.fill()
  }

  // need to find a better way to detect collision... delete upon collision
  hasCollision() {
    const players = window.gameEngine.playerManager.players
    for(let i=0;i<players.length;i++) {
      if(players[i].id!=this.playerId&&Utils.distance(this.position,players[i].position) < 20) return true
    }
    return false
  }
  shouldDelete() {
    return this.deletedTime > 0 && (this.deletedTime + this.DELETE_THRESHOLD) < new Date().getTime()
  }

}

export default Bullet