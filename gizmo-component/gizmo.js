import './style.css'

const gizmo = document.getElementById('gizmo')
const cropAssistant = document.getElementById('crop-assistant')
const cropPositioning = document.getElementById('crop-positioning')
const xyReadout = document.getElementById('xy-readout')
const scaleUpBtn = document.getElementById('scale-up-btn')
const snipBtn = document.getElementById('snip-btn')
let snipMode = false
let croppedWidth
let croppedHeight
let snippetX
let snippetY

const helperMessageHandler = (event) => {
  switch (event.data.messageName) {
    case 'loaded':
      console.log('loaded')
      break
    default:
      console.log('unknown message', event.data)
  }
}

const cropTopLeft = (e) => {
  if (snipMode && e.getModifierState('Shift')) {
    // console.log('got here', cropAssistant)
    snippetX = e.clientX
    snippetY = e.clientY
    cropAssistant.style.left = `-${e.clientX}px`
    cropAssistant.style.top = `-${e.clientY}px`
  }
}

const cropBottomRight = (e) => {
  if (snipMode && e.getModifierState('Alt')) {
    // console.log('cropBottomRight')
    cropPositioning.style.width = `${e.clientX}px`
    cropPositioning.style.height = `${e.clientY}px`
    croppedWidth = e.clientX
    croppedHeight = e.clientY
    console.log(`cropped width: ${croppedWidth}px`, `cropped height: ${croppedHeight}px`)
  }
}

const scaleUpSnippet = () => {    
  let newSnippetHeight
  let newSnippetWidth
  let snippetAR = croppedWidth / croppedHeight
  let scale

  const defaultWidth = 1024
  const defaultHeight = 680
  const defaultAR = defaultWidth / defaultHeight

  if (snippetAR > defaultAR) {
    newSnippetWidth = defaultWidth
    scale = newSnippetWidth / croppedWidth
    newSnippetHeight = newSnippetWidth / snippetAR
    
    cropAssistant.style['transform-origin'] = `${snippetX}px ${snippetY}px`
    cropAssistant.style.transform = `scale(${scale})`
    
    cropPositioning.style.width = `${newSnippetWidth}px`
    cropPositioning.style.height = `${newSnippetHeight}px`
  } else if (snippetAR < defaultAR) {
    newSnippetHeight = defaultHeight
    scale = newSnippetHeight / croppedHeight
    newSnippetWidth = newSnippetHeight * snippetAR

    cropAssistant.style['transform-origin'] = `${snippetX}px ${snippetY}px`
    cropAssistant.style.transform = `scale(${scale})`

    cropPositioning.style.width = `${newSnippetWidth}px`
    cropPositioning.style.height = `${newSnippetHeight}px`
  } else {
    newSnippetHeight = defaultHeight
    newSnippetWidth = defaultWidth
    scale = newSnippetHeight / croppedHeight

    cropAssistant.style['transform-origin'] = `${snippetX}px ${snippetY}px`
    cropAssistant.style.transform = `scale(${scale})`

    cropPositioning.style.width = `${newSnippetWidth}px`
    cropPositioning.style.height = `${newSnippetHeight}px`
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

/* ------------ HELPERS ------------ */
// send message utility
const messageParent = (message) => {
  window.parent.postMessage(message, '*')
}

window.addEventListener('message', helperMessageHandler, false)
window.addEventListener('click', cropTopLeft)
window.addEventListener('click', cropBottomRight)
window.addEventListener('mousemove', (e) => {
  xyReadout.innerText = `X: ${e.clientX}, Y: ${e.clientY}, window width: ${window.innerWidth}, window height: ${window.innerHeight}`
})
scaleUpBtn.addEventListener('click', scaleUpSnippet)
snipBtn.addEventListener('click', toggleSnipMode)