figma.showUI(__html__)

figma.ui.onmessage = (msg) => {
  if (msg.type === 'scan') {
    // Implement scanning logic here
  } else if (msg.type === 'resolve') {
    // Implement resolving logic here
  }
}