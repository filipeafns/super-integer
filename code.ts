// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// This will store the scan results
let results: Array<{id: string, name: string, type: string, property: string, value: number}> = [];

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'scan') {
    // Perform the scan
    results = await performScan();
    figma.ui.postMessage({ type: 'scan-results', results });
  } else if (msg.type === 'focus-and-fit') {
    const node = figma.getNodeById(results[msg.index].id);
    if (node && node.type !== 'DOCUMENT' && node.type !== 'PAGE') {
      // Select the node
      figma.currentPage.selection = [node];
      
      // Focus on the node
      figma.viewport.scrollAndZoomIntoView([node]);

      // Fit the node to the screen
      const padding = 100; // Add some padding around the node
      const bounds = node.absoluteBoundingBox;
      if (bounds) {
        figma.viewport.bounds = {
          x: bounds.x - padding,
          y: bounds.y - padding,
          width: bounds.width + padding * 2,
          height: bounds.height + padding * 2
        };
      }
    }
  } else if (msg.type === 'create-rectangles') {
    const nodes: SceneNode[] = [];
    for (let i = 0; i < msg.count; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};

async function performScan(): Promise<Array<{id: string, name: string, type: string, property: string, value: number}>> {
  const scanResults: Array<{id: string, name: string, type: string, property: string, value: number}> = [];
  
  figma.currentPage.findAll().forEach(node => {
    if ('x' in node && !Number.isInteger(node.x)) {
      scanResults.push({
        id: node.id,
        name: node.name,
        type: node.type,
        property: 'x',
        value: node.x
      });
    }
    if ('y' in node && !Number.isInteger(node.y)) {
      scanResults.push({
        id: node.id,
        name: node.name,
        type: node.type,
        property: 'y',
        value: node.y
      });
    }
    // Add check for non-integer font size
    if ('fontSize' in node && typeof node.fontSize === 'number' && !Number.isInteger(node.fontSize)) {
      scanResults.push({
        id: node.id,
        name: node.name,
        type: node.type,
        property: 'fontSize',
        value: node.fontSize
      });
    }
  });

  return scanResults;
}