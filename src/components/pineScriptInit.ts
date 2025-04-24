import Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import type { Block } from 'blockly';

// Add type declarations for Blockly
declare module 'blockly' {
  interface BlocklyOptions {
    toolbox: any;
  }
}

// Strategy Declaration Block
Blockly.Blocks['pine_strategy_declaration'] = {
  init: function(this: Block) {
    this.appendDummyInput()
      .appendField('Strategy')
      .appendField(new Blockly.FieldTextInput('My Strategy'), 'TITLE')
      .appendField('overlay')
      .appendField(new Blockly.FieldCheckbox('TRUE'), 'OVERLAY');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip('Declare a Pine Script strategy\n\n' +
      'Example: strategy("My Strategy", overlay=true)\n\n' +
      'Documentation: https://www.tradingview.com/pine-script-reference/v5/#fun_strategy');
    this.setHelpUrl('https://www.tradingview.com/pine-script-reference/v5/#fun_strategy');
  }
};

// Number Input Block
Blockly.Blocks['pine_input_number'] = {
  init: function(this: Block) {
    this.appendDummyInput()
      .appendField('Input')
      .appendField(new Blockly.FieldTextInput('length'), 'VAR_NAME')
      .appendField('=')
      .appendField(new Blockly.FieldNumber(14), 'DEFAULT')
      .appendField('title:')
      .appendField(new Blockly.FieldTextInput('Length'), 'TITLE');
    this.setOutput(true, 'Number');
    this.setColour(230);
    this.setTooltip('Define a numeric input parameter\n\n' +
      'Example: length = input(14, title="Length")\n\n' +
      'Documentation: https://www.tradingview.com/pine-script-reference/v5/#fun_input');
    this.setHelpUrl('https://www.tradingview.com/pine-script-reference/v5/#fun_input');
  }
};

// Plot Block
Blockly.Blocks['pine_plot'] = {
  init: function(this: Block) {
    this.appendValueInput('VALUE')
      .setCheck('Number')
      .appendField('Plot');
    this.appendDummyInput()
      .appendField('title:')
      .appendField(new Blockly.FieldTextInput('Line'), 'TITLE')
      .appendField('color:')
      .appendField(new Blockly.FieldTextInput('#2196F3'), 'COLOR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip('Plot a value on the chart\n\n' +
      'Example: plot(close, title="Close", color=color.blue)\n\n' +
      'Documentation: https://www.tradingview.com/pine-script-reference/v5/#fun_plot');
    this.setHelpUrl('https://www.tradingview.com/pine-script-reference/v5/#fun_plot');
  }
};

// Add Pine Script generators
Object.assign(javascriptGenerator, {
  pine_strategy_declaration: function(block: Block): string {
    const title = block.getFieldValue('TITLE');
    const overlay = block.getFieldValue('OVERLAY') === 'TRUE';
    return `//@version=5\nstrategy("${title}", overlay=${overlay})\n\n`;
  },

  pine_input_number: function(block: Block): [string, number] {
    const varName = block.getFieldValue('VAR_NAME');
    const defaultValue = block.getFieldValue('DEFAULT');
    const title = block.getFieldValue('TITLE');
    return [`${varName} = input.int(${defaultValue}, title="${title}")`, 0];
  },

  pine_plot: function(block: Block): string {
    const value = javascriptGenerator.valueToCode(block, 'VALUE', 0) || '0';
    const title = block.getFieldValue('TITLE');
    const color = block.getFieldValue('COLOR');
    return `plot(${value}, title="${title}", color=color.new(color.rgb(${parseInt(color.substr(1,2), 16)}, ${parseInt(color.substr(3,2), 16)}, ${parseInt(color.substr(5,2), 16)})))\n`;
  }
});

// Initialize Pine Script workspace
export function initializePineScriptWorkspace() {
  // Register custom category
  Blockly.registry.register(
    Blockly.registry.Type.TOOLBOX_ITEM,
    'PINE_SCRIPT_CATEGORY',
    Blockly.ToolboxCategory
  );
} 