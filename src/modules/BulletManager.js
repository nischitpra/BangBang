import Bullet from './Bullet'
class BulletManager {
  constructor() {
    this.bulletCount = 0
    this.bullets = []
  }

  createBullet(position, target, bulletColor) {
    this.bullets.push(new Bullet(position, target, bulletColor)) 
  }

  updateAndDrawBullet() {
    const bullets = []
    for(let i=0;i<this.bullets.length;i++) {
      this.bullets[i].update()
      if(!this.shouldDelete(this.bullets[i])) {
        this.bullets[i].draw()
        bullets.push(this.bullets[i])
      }
    }
    this.bullets = bullets
  }

  shouldDelete(bullet) {
    return bullet.position.x<0 || bullet.position.y<0 || bullet.position.x > window.canvas.width || bullet.position.y > window.canvas.height
  }

  draw() {
    this.updateAndDrawBullet()
  }

}

export default BulletManager