import { Blockly } from 'blockly';

// Listen for messages from the main thread
self.onmessage = (event: MessageEvent) => {
  const { workspaceXml } = event.data;

  try {
    // Create a temporary workspace for code generation
    const workspace = new Blockly.Workspace();
    const dom = Blockly.Xml.textToDom(workspaceXml);
    Blockly.Xml.domToWorkspace(dom, workspace);

    // Generate code
    const code = Blockly.JavaScript.workspaceToCode(workspace);

    // Clean up
    workspace.dispose();

    // Send the generated code back to the main thread
    self.postMessage({ code });
  } catch (error) {
    self.postMessage({ error: error.message });
  }
}; 