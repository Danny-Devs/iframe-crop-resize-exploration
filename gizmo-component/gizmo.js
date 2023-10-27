import './style.css'

let cropAssistant = document.getElementById('crop-assistant')
let cropPositioning = document.getElementById('crop-positioning')
let xyReadout = document.getElementById('xy-readout')
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

const cropBottomRight = (e) => {
  if (snipMode && e.getModifierState('Alt')) {
    console.log('cropBottomRight')
    cropPositioning.style.width = `${e.clientX}px`
    cropPositioning.style.height = `${e.clientY}px`
    console.log('cropPositioning', cropPositioning)
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
window.addEventListener('click', cropBottomRight)
window.addEventListener('mousemove', (e) => {
  xyReadout.innerText = `${e.clientX}, ${e.clientY}`
})
snipBtn.addEventListener('click', toggleSnipMode)
/* ------------ HELPERS ------------ */
// send message utility
const messageParent = (message) => {
  window.parent.postMessage(message, '*')
}

