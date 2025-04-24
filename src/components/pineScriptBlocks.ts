'use client';

import * as Blockly from 'blockly';
import { Order } from 'blockly/javascript';
import { javascriptGenerator } from 'blockly/javascript';

// Make sure Blockly is loaded before defining blocks
if (typeof window !== 'undefined') {
  // RSI Block
  Blockly.common.defineBlocksWithJsonArray([{
    "type": "pine_rsi",
    "message0": "RSI source: %1 length: %2",
    "args0": [
      {
        "type": "input_value",
        "name": "SOURCE",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "LENGTH",
        "check": "Number"
      }
    ],
    "output": "Number",
    "colour": 230,
    "tooltip": "Calculates the Relative Strength Index (RSI)",
    "helpUrl": "https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}rsi"
  }]);

  // SMA Block
  Blockly.common.defineBlocksWithJsonArray([{
    "type": "pine_sma",
    "message0": "SMA source: %1 length: %2",
    "args0": [
      {
        "type": "input_value",
        "name": "SOURCE",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "LENGTH",
        "check": "Number"
      }
    ],
    "output": "Number",
    "colour": 230,
    "tooltip": "Calculates the Simple Moving Average (SMA)",
    "helpUrl": "https://www.tradingview.com/pine-script-reference/v5/#fun_ta{dot}sma"
  }]);

  // If-Else Block
  Blockly.common.defineBlocksWithJsonArray([{
    "type": "pine_if_else",
    "message0": "if %1",
    "args0": [
      {
        "type": "input_value",
        "name": "CONDITION",
        "check": "Boolean"
      }
    ],
    "message1": "then %1",
    "args1": [
      {
        "type": "input_statement",
        "name": "DO"
      }
    ],
    "message2": "else %1",
    "args2": [
      {
        "type": "input_statement",
        "name": "ELSE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 210,
    "tooltip": "Pine Script if-else statement",
    "helpUrl": "https://www.tradingview.com/pine-script-docs/en/v5/language/Conditional_structures.html"
  }]);

  // Strategy Entry Block
  Blockly.common.defineBlocksWithJsonArray([{
    "type": "pine_strategy_entry",
    "message0": "Enter %1 id: %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DIRECTION",
        "options": [
          ["Long", "LONG"],
          ["Short", "SHORT"]
        ]
      },
      {
        "type": "input_value",
        "name": "ID",
        "check": "String"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Enter a position in the specified direction",
    "helpUrl": "https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}entry"
  }]);

  // Strategy Close Block
  Blockly.common.defineBlocksWithJsonArray([{
    "type": "pine_strategy_close",
    "message0": "Close position with id: %1",
    "args0": [
      {
        "type": "input_value",
        "name": "ID",
        "check": "String"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Close an open position",
    "helpUrl": "https://www.tradingview.com/pine-script-reference/v5/#fun_strategy{dot}close"
  }]);

  // Strategy Declaration Block
  Blockly.common.defineBlocksWithJsonArray([{
    "type": "pine_strategy_declaration",
    "message0": "Strategy %1 overlay %2",
    "args0": [
      {
        "type": "field_input",
        "name": "TITLE",
        "text": "My Strategy"
      },
      {
        "type": "field_checkbox",
        "name": "OVERLAY",
        "checked": true
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 160,
    "tooltip": "Declare a Pine Script strategy",
    "helpUrl": "https://www.tradingview.com/pine-script-reference/v5/#fun_strategy"
  }]);

  // Price Blocks
  Blockly.Blocks['price_close'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('close');
      this.setOutput(true, 'Number');
      this.setColour('#5C81A6');
      this.setTooltip('Current closing price');
    }
  };

  Blockly.Blocks['price_open'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('open');
      this.setOutput(true, 'Number');
      this.setColour('#5C81A6');
      this.setTooltip('Current opening price');
    }
  };

  Blockly.Blocks['price_high'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('high');
      this.setOutput(true, 'Number');
      this.setColour('#5C81A6');
      this.setTooltip('Current high price');
    }
  };

  Blockly.Blocks['price_low'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('low');
      this.setOutput(true, 'Number');
      this.setColour('#5C81A6');
      this.setTooltip('Current low price');
    }
  };

  // Indicator Blocks
  Blockly.Blocks['indicator_rsi'] = {
    init: function() {
      this.appendValueInput('SOURCE')
        .setCheck('Number')
        .appendField('RSI(');
      this.appendValueInput('LENGTH')
        .setCheck('Number')
        .appendField(', length=');
      this.appendDummyInput()
        .appendField(')');
      this.setInputsInline(true);
      this.setOutput(true, 'Number');
      this.setColour('#5CA65C');
      this.setTooltip('Relative Strength Index');
    }
  };

  Blockly.Blocks['indicator_sma'] = {
    init: function() {
      this.appendValueInput('SOURCE')
        .setCheck('Number')
        .appendField('SMA(');
      this.appendValueInput('LENGTH')
        .setCheck('Number')
        .appendField(', length=');
      this.appendDummyInput()
        .appendField(')');
      this.setInputsInline(true);
      this.setOutput(true, 'Number');
      this.setColour('#5CA65C');
      this.setTooltip('Simple Moving Average');
    }
  };

  Blockly.Blocks['indicator_ema'] = {
    init: function() {
      this.appendValueInput('SOURCE')
        .setCheck('Number')
        .appendField('EMA(');
      this.appendValueInput('LENGTH')
        .setCheck('Number')
        .appendField(', length=');
      this.appendDummyInput()
        .appendField(')');
      this.setInputsInline(true);
      this.setOutput(true, 'Number');
      this.setColour('#5CA65C');
      this.setTooltip('Exponential Moving Average');
    }
  };

  // Signal Blocks
  Blockly.Blocks['signal_crossover'] = {
    init: function() {
      this.appendValueInput('A')
        .setCheck('Number')
        .appendField('crossover(');
      this.appendValueInput('B')
        .setCheck('Number')
        .appendField(', ');
      this.appendDummyInput()
        .appendField(')');
      this.setInputsInline(true);
      this.setOutput(true, 'Boolean');
      this.setColour('#A65C81');
      this.setTooltip('True when A crosses above B');
    }
  };

  Blockly.Blocks['signal_crossunder'] = {
    init: function() {
      this.appendValueInput('A')
        .setCheck('Number')
        .appendField('crossunder(');
      this.appendValueInput('B')
        .setCheck('Number')
        .appendField(', ');
      this.appendDummyInput()
        .appendField(')');
      this.setInputsInline(true);
      this.setOutput(true, 'Boolean');
      this.setColour('#A65C81');
      this.setTooltip('True when A crosses below B');
    }
  };

  // Strategy Blocks
  Blockly.Blocks['strategy_long'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('strategy.entry("Long", strategy.long)');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour('#A65C81');
      this.setTooltip('Enter a long position');
    }
  };

  Blockly.Blocks['strategy_short'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('strategy.entry("Short", strategy.short)');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour('#A65C81');
      this.setTooltip('Enter a short position');
    }
  };

  Blockly.Blocks['strategy_close'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('strategy.close_all()');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour('#A65C81');
      this.setTooltip('Close all positions');
    }
  };
}

// Code generators for the blocks
Object.assign(javascriptGenerator, {
  pine_rsi: function(block: Blockly.Block) {
    const source = javascriptGenerator.valueToCode(block, 'SOURCE', Order.NONE) || 'close';
    const length = javascriptGenerator.valueToCode(block, 'LENGTH', Order.NONE) || '14';
    return [`ta.rsi(${source}, ${length})`, Order.FUNCTION_CALL];
  },

  pine_sma: function(block: Blockly.Block) {
    const source = javascriptGenerator.valueToCode(block, 'SOURCE', Order.NONE) || 'close';
    const length = javascriptGenerator.valueToCode(block, 'LENGTH', Order.NONE) || '20';
    return [`ta.sma(${source}, ${length})`, Order.FUNCTION_CALL];
  },

  pine_if_else: function(block: Blockly.Block) {
    const condition = javascriptGenerator.valueToCode(block, 'CONDITION', Order.NONE);
    const doCode = javascriptGenerator.statementToCode(block, 'DO');
    const elseCode = javascriptGenerator.statementToCode(block, 'ELSE');
    return `if ${condition}\n${doCode}${elseCode ? `else\n${elseCode}` : ''}`;
  },

  pine_strategy_entry: function(block: Blockly.Block) {
    const direction = block.getFieldValue('DIRECTION');
    const id = javascriptGenerator.valueToCode(block, 'ID', Order.NONE) || '""';
    return `strategy.entry(${id}, strategy.${direction.toLowerCase()})\n`;
  },

  pine_strategy_close: function(block: Blockly.Block) {
    const id = javascriptGenerator.valueToCode(block, 'ID', Order.NONE) || '""';
    return `strategy.close(${id})\n`;
  },

  pine_strategy_declaration: function(block: Blockly.Block) {
    const title = block.getFieldValue('TITLE');
    const overlay = block.getFieldValue('OVERLAY') === 'TRUE';
    return `//@version=5\nstrategy("${title}", overlay=${overlay})\n\n`;
  },

  price_close: function() {
    return ['close', Blockly.JavaScript.ORDER_ATOMIC];
  },

  price_open: function() {
    return ['open', Blockly.JavaScript.ORDER_ATOMIC];
  },

  price_high: function() {
    return ['high', Blockly.JavaScript.ORDER_ATOMIC];
  },

  price_low: function() {
    return ['low', Blockly.JavaScript.ORDER_ATOMIC];
  },

  indicator_rsi: function(block) {
    const source = Blockly.JavaScript.valueToCode(block, 'SOURCE', Blockly.JavaScript.ORDER_NONE) || 'close';
    const length = Blockly.JavaScript.valueToCode(block, 'LENGTH', Blockly.JavaScript.ORDER_NONE) || '14';
    return [`ta.rsi(${source}, ${length})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  },

  indicator_sma: function(block) {
    const source = Blockly.JavaScript.valueToCode(block, 'SOURCE', Blockly.JavaScript.ORDER_NONE) || 'close';
    const length = Blockly.JavaScript.valueToCode(block, 'LENGTH', Blockly.JavaScript.ORDER_NONE) || '20';
    return [`ta.sma(${source}, ${length})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  },

  indicator_ema: function(block) {
    const source = Blockly.JavaScript.valueToCode(block, 'SOURCE', Blockly.JavaScript.ORDER_NONE) || 'close';
    const length = Blockly.JavaScript.valueToCode(block, 'LENGTH', Blockly.JavaScript.ORDER_NONE) || '20';
    return [`ta.ema(${source}, ${length})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  },

  signal_crossover: function(block) {
    const a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_NONE) || '0';
    const b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_NONE) || '0';
    return [`ta.crossover(${a}, ${b})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  },

  signal_crossunder: function(block) {
    const a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_NONE) || '0';
    const b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_NONE) || '0';
    return [`ta.crossunder(${a}, ${b})`, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  },

  strategy_long: function() {
    return 'strategy.entry("Long", strategy.long)\n';
  },

  strategy_short: function() {
    return 'strategy.entry("Short", strategy.short)\n';
  },

  strategy_close: function() {
    return 'strategy.close_all()\n';
  }
}); 