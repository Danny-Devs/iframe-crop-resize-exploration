let iframe = document.getElementById('gizmo-iframe')
let outerContainer = document.getElementById('outer-container')
let innerContainer = document.getElementById('inner-container')
const indexReadout = document.getElementById('index-readout')


iframe.addEventListener('load', () => {
  messageIframe({ messageName: 'loaded'})
  resizeIframe()
})

window.addEventListener('resize', () => {
  resizeIframe()
})
window.addEventListener('message', (event) => {
  switch (event.data.messageName) {
    default:
      console.log('index.js: unknown message', e.data)
  }
})


const defaultIframeWidth = 1024
const defaultIframeHeight = 680
const gizmoAR = defaultIframeWidth / defaultIframeHeight

const resizeIframe = () => {  
  let newIframeHeight
  let newIframeWidth
  let scale

  const outerContainerWidth = outerContainer.offsetWidth
  const outerContainerHeight = outerContainer.offsetHeight

  if (outerContainerWidth / outerContainerHeight > gizmoAR) {
    newIframeHeight = outerContainerHeight
    scale = newIframeHeight / defaultIframeHeight
    newIframeWidth = newIframeHeight * gizmoAR
    iframe.style.transformOrigin = '0 0'
    iframe.style.transform = `scale(${scale})`
    innerContainer.style.width = `${newIframeWidth}px`
    innerContainer.style.height = `${newIframeHeight}px`
  } else if (outerContainerWidth / outerContainerHeight < gizmoAR) {
    newIframeWidth = outerContainerWidth
    scale = newIframeWidth / defaultIframeWidth
    newIframeHeight = newIframeWidth / gizmoAR
    iframe.style.transformOrigin = '0 0'
    iframe.style.transform = `scale(${scale})`
    innerContainer.style.width = `${newIframeWidth}px`
    innerContainer.style.height = `${newIframeHeight}px`
  } else {
    scale = 1
    iframe.style.transformOrigin = '0 0'
    iframe.style.transform = `scale(${scale})`
    innerContainer.style.width = `${defaultIframeWidth}px`
    innerContainer.style.height = `${defaultIframeWidth}px`
  }
}

/* ------------ HELPERS ------------ */
// send message utility
const messageIframe = (message) => {
  iframe.contentWindow.postMessage(message, '*')
}

window.addEventListener('mousemove', (e) => {
  indexReadout.innerText = `indexX: ${e.clientX}, indexY: ${e.clientY}, window width: ${window.innerWidth}, window height: ${window.innerHeight}`
})