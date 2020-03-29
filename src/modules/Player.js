import BulletManager from './BulletManager'
class Player {
  SHOOT_DETECTION_DISTANCE = 500

  constructor() {
    this.id=Math.random()
    this.position = {x:window.innerWidth/2, y:window.innerHeight/2}
    this.bulletManager = new BulletManager()
    this.playerColor = "red"
    this.bulletColor = "red"
    this.closestPlayer = {player: undefined, distance: Infinity}
  }

  update() {
    this.shoot()
  }

  draw() {
    this.update()
    const ctx = window.ctx
    this.drawPlayer(ctx)
    this.bulletManager.draw()
  }

  drawPlayer(ctx) {
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, 50, 0, 2 * Math.PI)
    ctx.fillStyle = this.playerColor
    ctx.fill()
  }

  shoot() {
    if(this.closestPlayer.player) {
      this.bulletManager.createBullet(this.clone(this.position),this.clone(this.closestPlayer.player.position), this.bulletColor)
    }
  }

  clone(obj) {
    return Object.assign({}, obj)
  }


  calculateClosestPlayer() {
    const closestPlayer = {player: undefined, distance: Infinity}
    const players = window.gameEngine.playerManager.players
    for(let i = 0; i < players.length; i++) {
      if(this.id==players[i].id) continue
      const dist = this.distance(players[i].position)
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

  distance(target) {
    const dx = target.x - this.position.x
    const dy = target.y - this.position.y
    return Math.sqrt(dx*dx + dy*dy)
  }

}

export default Player