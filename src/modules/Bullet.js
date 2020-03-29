class Bullet {
  MAX_SPEED = 10
  constructor(startPosition, targetPosition, color) {
    this.position = startPosition
    this.target = targetPosition
    this.color = color
    this.velocity = this.getVelocity()
  }

  getVelocity() {
    const angle = Math.atan2(this.target.y-this.position.y, this.target.x-this.position.x) 
    return {x: this.MAX_SPEED*Math.cos(angle), y: this.MAX_SPEED*Math.sin(angle)}
  }

  update() {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }

  draw() {
    const ctx = window.ctx
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI)
    ctx.fillStyle = this.color
    ctx.fill()
  }

}

export default Bullet