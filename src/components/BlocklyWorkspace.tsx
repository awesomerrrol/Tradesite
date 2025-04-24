'use client';

import React, { useEffect, useRef } from 'react';
import Blockly from 'blockly';
import 'blockly/blocks';
import 'blockly/javascript';
import 'blockly/msg/en';
import './pineScriptBlocks';

interface BlocklyWorkspaceProps {
  onCodeChange: (code: string) => void;
}

const BlocklyWorkspace: React.FC<BlocklyWorkspaceProps> = ({ onCodeChange }) => {
  const workspaceRef = useRef<HTMLDivElement>(null);
  const workspaceInstance = useRef<Blockly.WorkspaceSvg | null>(null);

  const handleWorkspaceChange = () => {
    if (workspaceInstance.current) {
      const code = Blockly.JavaScript.workspaceToCode(workspaceInstance.current);
      onCodeChange(code);
    }
  };

  useEffect(() => {
    const initializeBlockly = () => {
      if (!workspaceRef.current || workspaceInstance.current) return;

      const toolbox = {
        kind: 'categoryToolbox',
        contents: [
          {
            kind: 'category',
            name: 'VARIABLES',
            categorystyle: 'variable_category',
            contents: [
              { kind: 'block', type: 'price_close' },
              { kind: 'block', type: 'price_open' },
              { kind: 'block', type: 'price_high' },
              { kind: 'block', type: 'price_low' }
            ]
          },
          {
            kind: 'category',
            name: 'CONSTANTS',
            colour: '#5C81A6',
            contents: [
              {
                kind: 'block',
                type: 'math_number',
                fields: {
                  NUM: 14
                }
              }
            ]
          },
          {
            kind: 'category',
            name: 'FUNCTIONS',
            colour: '#5CA65C',
            contents: [
              { kind: 'block', type: 'indicator_rsi' },
              { kind: 'block', type: 'indicator_sma' },
              { kind: 'block', type: 'indicator_ema' }
            ]
          },
          {
            kind: 'category',
            name: 'KEYWORDS',
            colour: '#A65C81',
            contents: [
              { kind: 'block', type: 'signal_crossover' },
              { kind: 'block', type: 'signal_crossunder' }
            ]
          },
          {
            kind: 'category',
            name: 'TYPES',
            colour: '#81A65C',
            contents: [
              { kind: 'block', type: 'strategy_long' },
              { kind: 'block', type: 'strategy_short' },
              { kind: 'block', type: 'strategy_close' }
            ]
          }
        ]
      };

      // Initialize Blockly workspace
      workspaceInstance.current = Blockly.inject(workspaceRef.current, {
        toolbox,
        toolboxPosition: 'start', // Places toolbox on the left
        horizontalLayout: false,
        zoom: {
          controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2,
          pinch: true
        },
        move: {
          drag: true,
          wheel: true
        },
        grid: {
          spacing: 25,
          length: 3,
          colour: '#ccc',
          snap: true
        },
        theme: Blockly.Theme.defineTheme('pinecraft', {
          name: 'pinecraft',
          base: Blockly.Themes.Classic,
          componentStyles: {
            workspaceBackgroundColour: '#ffffff',
            toolboxBackgroundColour: '#ffffff',
            toolboxForegroundColour: '#000000',
            flyoutBackgroundColour: '#f8f9fa',
            flyoutForegroundColour: '#000000',
            flyoutOpacity: 1,
            scrollbarColour: '#cccccc',
            insertionMarkerColour: '#000000',
            insertionMarkerOpacity: 0.3,
            scrollbarOpacity: 0.4,
            cursorColour: '#000000'
          }
        }),
        trashcan: true,
        scrollbars: true,
        sounds: true,
        renderer: 'zelos'
      });

      // Add change listener
      workspaceInstance.current.addChangeListener(handleWorkspaceChange);

      // Add some initial blocks as an example
      const xml = Blockly.utils.xml.textToDom(`
        <xml>
          <block type="strategy_long" x="20" y="20">
            <next>
              <block type="strategy_close">
                <next>
                  <block type="strategy_short"></block>
                </next>
              </block>
            </next>
          </block>
        </xml>
      `);
      Blockly.Xml.domToWorkspace(xml, workspaceInstance.current);
    };

    initializeBlockly();

    return () => {
      if (workspaceInstance.current) {
        workspaceInstance.current.dispose();
        workspaceInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="h-full border border-gray-300 rounded-md">
      <div 
        ref={workspaceRef} 
        className="h-full w-full"
      />
    </div>
  );
};

export default BlocklyWorkspace; 