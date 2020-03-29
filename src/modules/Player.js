import BulletManager from './BulletManager'
import Utils from './Utils'
class Player {
  SHOOT_DETECTION_DISTANCE = 500
  SHOOT_RATE = 1000/3 // 3 shots per 1000 miliseconds


  constructor() {
    this.id=Math.random()
    this.position = {x:window.innerWidth/2, y:window.innerHeight/2}
    this.bulletManager = new BulletManager()
    this.playerColor = "red"
    this.bulletColor = "red"
    this.closestPlayer = {player: undefined, distance: Infinity}
    this.lastShotTime = new Date().getTime()
  }

  update() {
    this.shoot()
  }

  draw() {
    this.update()
    const ctx = window.ctx
    ctx.globalCompositeOperation = 'destination-over' // draw below existing canvas 
    this.drawPlayer(ctx)
    ctx.globalCompositeOperation = 'source-over' // draw on top, default value 
    this.bulletManager.draw()
  }

  drawPlayer(ctx) {
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, 50, 0, 2 * Math.PI)
    ctx.fillStyle = this.playerColor
    ctx.fill()
  }

  shoot() {
    if(this.closestPlayer.player && this.canShoot()) {
      this.bulletManager.createBullet(this.id, Utils.clone(this.position),Utils.clone(this.closestPlayer.player.position), this.bulletColor)
      this.lastShotTime = new Date().getTime()
    }
  }

  canShoot() {
    return (this.lastShotTime + this.SHOOT_RATE) < new Date().getTime()
  }

  calculateClosestPlayer() {
    const closestPlayer = {player: undefined, distance: Infinity}
    const players = window.gameEngine.playerManager.players
    for(let i = 0; i < players.length; i++) {
      if(this.id==players[i].id) continue
      const dist = Utils.distance(this.position,players[i].position)
      if(dist<this.SHOOT_DETECTION_DISTANCE && dist < closestPlayer.distance ) {
        closestPlayer.player=players[i]
        closestPlayer.distance=dist
      }
    }
    this.closestPlayer = closestPlayer
  }

  update() {
    this.calculateClosestPlayer()
    this.shoot()
  }

}

export default Player