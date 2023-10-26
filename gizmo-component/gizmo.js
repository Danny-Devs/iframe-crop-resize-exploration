let cropAssistant = document.getElementById('crop-assistant')
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

const toggleSnipMode = () => {
  snipMode = !snipMode
}

const cropTopLeft = (e) => {
  if (snipMode && e.getModifierState('Shift')) {
    inn.style.left = `-${e.clientX}px`
    cropAssistant.style.top = `-${e.clientY}px`
  }
}

window.addEventListener('DOMContentLoaded', () => {
  
})
window.addEventListener('message', helperMessageHandler, false)
window.addEventListener('click', cropTopLeft)

/* ------------ HELPERS ------------ */
// send message utility
const messageParent = (message) => {
  window.parent.postMessage(message, '*')
}