import './style.css'

let cropAssistant = document.getElementById('crop-assistant')
let cropPositioning = document.getElementById('crop-positioning')
let snipBtn = document.getElementById('snip-btn')
let snipMode = false

const helperMessageHandler = (event) => {
  switch (event.data.messageName) {
    case 'loaded':
      console.log('loaded')
      break
    default:
      console.log('unknown message', e.data)
  }
}

const cropTopLeft = (e) => {
  if (snipMode && e.getModifierState('Shift')) {
    console.log('got here', cropAssistant)
    cropAssistant.style.left = `-${e.clientX}px`
    cropAssistant.style.top = `-${e.clientY}px`
  }
}

const toggleSnipMode = () => {
  snipMode = !snipMode
  if (snipMode) {
    snipBtn.style.backgroundColor = 'red'
    snipBtn.style.color = 'white'
    snipBtn.style.border = 'none'
    snipBtn.innerText = 'ON'
  } else {
    snipBtn.style.backgroundColor = 'white'
    snipBtn.style.color = 'red'
    snipBtn.style.border = 'none'
    snipBtn.innerText = 'OFF'
  }
}

window.addEventListener('message', helperMessageHandler, false)
window.addEventListener('click', cropTopLeft)
snipBtn.addEventListener('click', toggleSnipMode)
/* ------------ HELPERS ------------ */
// send message utility
const messageParent = (message) => {
  window.parent.postMessage(message, '*')
}

