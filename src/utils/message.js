class message {
  constructor(options){
    this.initMessage(options)
    this.createMessage()
  }

  initMessage(options={}){
    this.elem = null
    this.subElem = null
    this.container = options.container || document.body
    this.tick = options.tick || 3000
    this.interval = null
  }

  createMessage(){
    if(!this.elem){
      this.elem = document.createElement('div')
      this.elem.style.position = 'fixed'
      this.elem.style.left = '50%'
      this.elem.style.top = '20px'
      this.elem.style.transform = 'translateX(-50%)'
      this.elem.style.boxShadow = '0 4px 15px rgba(0,0,0,.15)'
      this.elem.style.fontSize = '14px'
      this.elem.style.color = 'rgba(0,0,0,.65)'
      this.elem.style.borderRadius = '4px'
      this.elem.style.display = 'hidden'
      this.container.appendChild(this.elem)
    }
  }

  createInnerMessage(msg){
    this.subElem = document.createElement('span')
    this.subElem.style.padding = '8px 20px'
    this.subElem.style.display = 'block'
    this.subElem.innerText = msg
    this.elem.appendChild(this.subElem)
  }

  show(){
    this.elem.style.display = 'block'
  }

  hidden(){
    this.elem.style.display = 'hidden'
  }

  clear(){
    this.elem.removeChild(this.subElem)
  }

  showMessage(){
    this.show()
    this.interval = setTimeout(() => {
      this.hidden()
      this.clear()
      this.interval = null
    }, this.tick)
  }

  tip(msg){
    this.createInnerMessage(msg)
    this.showMessage()
  }
}

export default message
