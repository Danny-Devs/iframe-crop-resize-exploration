let iframe
let outerContainer
let innerContainer

window.addEventListener('DOMContentLoaded', () => {
  iframe = document.getElementById('gizmo-iframe')
  outerContainer = document.getElementById('outer-container')
  innerContainer = document.getElementById('inner-container')
  iframe.addEventListener('load', () => {
    messageIframe({ messageName: 'loaded'})
    resizeIframe()
  })
})

window.addEventListener('resize', () => {
  console.log('resize')
  resizeIframe()
})

const defaultIframeWidth = 1024
const defaultIframeHeight = 680
const gizmoAR = defaultIframeWidth / defaultIframeHeight

const resizeIframe = () => {  let newIframeHeight
  let newIframeWidth
  let scale

  const outerContainerWidth = outerContainer.offsetWidth
  const outerContainerHeight = outerContainer.offsetHeight

  if (outerContainerWidth / outerContainerHeight > gizmoAR) {
    newIframeHeight = outerContainerHeight
    scale = newIframeHeight / defaultIframeHeight
    newIframeWidth = newIframeHeight * gizmoAR
    const transform = `translate(-${defaultIframeWidth / 2}px,-${
      defaultIframeHeight / 2
    }px) scale(${scale},${scale}) translate(${defaultIframeWidth / 2}px,${
      defaultIframeHeight / 2
    }px)`
    iframe.style.transform = transform
    innerContainer.style.width = `${newIframeWidth}px`
    innerContainer.style.height = `${newIframeHeight}px`
  } else if (outerContainerWidth / outerContainerHeight < gizmoAR) {
    newIframeWidth = outerContainerWidth
    scale = newIframeWidth / defaultIframeWidth
    newIframeHeight = newIframeWidth / gizmoAR
    const transform = `translate(-${defaultIframeWidth / 2}px,-${
      defaultIframeHeight / 2
    }px) scale(${scale},${scale}) translate(${defaultIframeWidth / 2}px,${
      defaultIframeHeight / 2
    }px)`
    iframe.style.transform = transform
    innerContainer.style.width = `${newIframeWidth}px`
    innerContainer.style.height = `${newIframeHeight}px`
  } else {
    scale = 1
    const transform = `translate(-${defaultIframeWidth / 2}px,-${
      defaultIframeHeight / 2
    }px) scale(${scale},${scale}) translate(${defaultIframeWidth / 2}px,${
      defaultIframeHeight / 2
    }px)`
    iframe.style.transform = transform
    innerContainer.style.width = `${defaultIframeWidth}px`
    innerContainer.style.height = `${defaultIframeWidth}px`
  }
}

/* ------------ HELPERS ------------ */
// helper utility
const messageIframe = (message) => {
  iframe.contentWindow.postMessage(message, '*')
}