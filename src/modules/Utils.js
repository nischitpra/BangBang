module.exports={

  distance: (position, target)=>{
    const dx = target.x - position.x
    const dy = target.y - position.y
    return Math.sqrt(dx*dx + dy*dy)
  },
  
  clone: obj=>{
    return Object.assign({}, obj)
  }

}