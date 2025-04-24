import Blockly from 'blockly';

interface PineScriptGenerator {
  [key: string]: (block: Blockly.Block) => string;
}

const pineScriptGenerator: PineScriptGenerator = {
  // Indicator blocks
  'pine_rsi': (block: Blockly.Block) => {
    const source = Blockly.JavaScript.valueToCode(block, 'SOURCE', Blockly.JavaScript.ORDER_NONE) || 'close';
    const length = Blockly.JavaScript.valueToCode(block, 'LENGTH', Blockly.JavaScript.ORDER_NONE) || '14';
    return `ta.rsi(${source}, ${length})`;
  },

  'pine_sma': (block: Blockly.Block) => {
    const source = Blockly.JavaScript.valueToCode(block, 'SOURCE', Blockly.JavaScript.ORDER_NONE) || 'close';
    const length = Blockly.JavaScript.valueToCode(block, 'LENGTH', Blockly.JavaScript.ORDER_NONE) || '20';
    return `ta.sma(${source}, ${length})`;
  },

  // Logic blocks
  'pine_if_else': (block: Blockly.Block) => {
    const condition = Blockly.JavaScript.valueToCode(block, 'CONDITION', Blockly.JavaScript.ORDER_NONE);
    const doCode = Blockly.JavaScript.statementToCode(block, 'DO');
    const elseCode = Blockly.JavaScript.statementToCode(block, 'ELSE');
    
    let code = `if ${condition}\n`;
    code += doCode;
    if (elseCode) {
      code += `else\n${elseCode}`;
    }
    return code;
  },

  // Strategy blocks
  'pine_strategy_entry': (block: Blockly.Block) => {
    const direction = block.getFieldValue('DIRECTION');
    const id = Blockly.JavaScript.valueToCode(block, 'ID', Blockly.JavaScript.ORDER_NONE) || '""';
    return `strategy.entry(${id}, strategy.${direction.toLowerCase()})`;
  },

  'pine_strategy_close': (block: Blockly.Block) => {
    const id = Blockly.JavaScript.valueToCode(block, 'ID', Blockly.JavaScript.ORDER_NONE) || '""';
    return `strategy.close(${id})`;
  },

  // Comparison blocks
  'logic_compare': (block: Blockly.Block) => {
    const operator = block.getFieldValue('OP');
    const order = Blockly.JavaScript.ORDER_RELATIONAL;
    const argument0 = Blockly.JavaScript.valueToCode(block, 'A', order) || '0';
    const argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || '0';
    return `${argument0} ${operator} ${argument1}`;
  },

  // Math blocks
  'math_number': (block: Blockly.Block) => {
    return block.getFieldValue('NUM');
  },

  // Text blocks
  'text': (block: Blockly.Block) => {
    const text = block.getFieldValue('TEXT');
    return `"${text}"`;
  }
};

export function generatePineScript(workspace: Blockly.Workspace): string {
  // Generate the code header
  let code = `//@version=5
strategy("Generated Strategy", overlay=true)

`;

  // Get all top-level blocks
  const blocks = workspace.getTopBlocks(false);
  
  // Generate code for each block
  blocks.forEach(block => {
    const blockType = block.type;
    if (pineScriptGenerator[blockType]) {
      code += pineScriptGenerator[blockType](block) + '\n';
    }
  });

  return code;
}

export function validatePineScript(code: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Basic syntax validation
  if (!code.includes('//@version=5')) {
    errors.push('Missing Pine Script version declaration');
  }
  
  if (!code.includes('strategy(')) {
    errors.push('Missing strategy declaration');
  }

  // Check for common syntax errors
  const lines = code.split('\n');
  lines.forEach((line, index) => {
    // Check for unclosed parentheses
    const openParens = (line.match(/\(/g) || []).length;
    const closeParens = (line.match(/\)/g) || []).length;
    if (openParens !== closeParens) {
      errors.push(`Unmatched parentheses in line ${index + 1}`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
} 