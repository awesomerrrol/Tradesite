import React, { useEffect, useRef } from 'react';
import * as Blockly from 'blockly';
import type { WorkspaceSvg } from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import './pineScriptBlocks';

interface PineScriptWorkspaceProps {
  onCodeChange: (code: string, workspace: WorkspaceSvg) => void;
}

export const PineScriptWorkspace: React.FC<PineScriptWorkspaceProps> = ({ onCodeChange }) => {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<WorkspaceSvg | null>(null);

  useEffect(() => {
    if (!blocklyDiv.current || workspaceRef.current) return;

    const workspace = Blockly.inject(blocklyDiv.current, {
      toolbox: {
        kind: 'categoryToolbox',
        contents: [
          {
            kind: 'category',
            name: 'VARIABLES',
            colour: '#5C6BC0',
            contents: [
              { kind: 'block', type: 'pine_close' },
              { kind: 'block', type: 'pine_open' },
              { kind: 'block', type: 'pine_high' },
              { kind: 'block', type: 'pine_low' },
              { kind: 'block', type: 'pine_volume' },
            ]
          },
          {
            kind: 'category',
            name: 'INDICATORS',
            colour: '#26A69A',
            contents: [
              { kind: 'block', type: 'pine_rsi' },
              { kind: 'block', type: 'pine_sma' },
              { kind: 'block', type: 'pine_ema' },
            ]
          },
          {
            kind: 'category',
            name: 'STRATEGY',
            colour: '#EF5350',
            contents: [
              { kind: 'block', type: 'pine_strategy_declaration' },
              { kind: 'block', type: 'pine_strategy_entry' },
              { kind: 'block', type: 'pine_strategy_close' },
            ]
          },
          {
            kind: 'category',
            name: 'LOGIC',
            colour: '#8D6E63',
            contents: [
              { kind: 'block', type: 'pine_if_else' },
              { kind: 'block', type: 'pine_comparison' },
            ]
          },
        ],
      },
      grid: {
        spacing: 20,
        length: 3,
        colour: '#ccc',
        snap: true,
      },
      move: {
        scrollbars: true,
        drag: true,
        wheel: true,
      },
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2,
      },
      theme: 'zelos',
    });

    workspaceRef.current = workspace;

    workspace.addChangeListener(() => {
      const code = javascriptGenerator.workspaceToCode(workspace);
      onCodeChange(code, workspace);
    });

    return () => {
      workspace.dispose();
    };
  }, [onCodeChange]);

  return (
    <div 
      ref={blocklyDiv} 
      className="w-full h-full"
    />
  );
}; 