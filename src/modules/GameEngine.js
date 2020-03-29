import Player from './Player'
import UserPlayer from './UserPlayer'
import InputController from './InputController'
import PlayerManager from './PlayerManager'

class GameEngine {

  maxFps = 60
  maxSleepPerCycle = 1000 / this.maxFps
  currentFrame = 0

  constructor() {
    this.userPlayer = new UserPlayer()
    this.inputController = new InputController()
    this.playerManager = new PlayerManager(this.userPlayer)
  }

  init() {
    this.userPlayer.init()

    this.start()
  }

  async start() {
    while(true) {
      const s = new Date().getTime()
      this.currentFrame++
      this.draw()
      const e = new Date().getTime()
      const sleepTime = Math.max(0, this.maxSleepPerCycle - (e - s))
      await new Promise(resolve => setTimeout(resolve, sleepTime)) //sleep function
    }
  }

  draw() {
    window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height)
    this.playerManager.draw()
  }
}

export default GameEngine