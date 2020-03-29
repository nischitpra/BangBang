class InputController {
  constructor() {
    this.position= {
      x:window.innerWidth,
      y:window.innerHeight
    }
    this.clickSubscriberList = []
    this.moveSubscriberList = []
  }

  subscribeToMouseClick(callback) {
    this.clickSubscriberList.push(callback)
  }
  subscribeToMouseMove(callback) {
    this.moveSubscriberList.push(callback)
  }

  // This function is invoked from react component so `this` does not refer to `inputContoroller`
  handleMouseMove(event) {
    const inputController = window.gameEngine.inputController
    const position = inputController.getMouseEventPosition(event)
    for(let i=0;i<inputController.moveSubscriberList.length;i++) {
      inputController.moveSubscriberList[i](position)
    }

    // window.appContext.forceUpdate()
  }

  handleMouseClick(event) {
    const inputController = window.gameEngine.inputController
    const position = inputController.getMouseEventPosition(event)
    for(let i=0;i<inputController.clickSubscriberList.length;i++) {
      inputController.clickSubscriberList[i](position)
    }

    // window.appContext.forceUpdate()
  }

  getMouseEventPosition(event) {
    const rect = window.canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return {x,y}
  }

}

export default InputController