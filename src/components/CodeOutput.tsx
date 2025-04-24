import React from 'react';
import CodeExport from './CodeExport';

interface CodeOutputProps {
  code: string;
  errors: string[];
}

const CodeOutput: React.FC<CodeOutputProps> = ({ code, errors }) => {
  return (
    <div className="h-full flex flex-col" style={{ 
      background: 'var(--blockly-toolbox)', 
      color: 'var(--blockly-toolbox-text)', 
      borderRadius: '0.5rem',
      padding: '1rem' 
    }}>
      <div className="flex-1 font-mono text-sm">
        <div className="flex justify-between items-center mb-2">
          <div>VERSION V6...</div>
          <CodeExport code={code} />
        </div>
        <div className="mb-4">
          {code.split('\n').map((line, index) => (
            <div key={index} className="whitespace-pre-wrap">{line}</div>
          ))}
        </div>
        {errors.length > 0 && (
          <div className="mt-4 p-4 rounded-md" style={{
            backgroundColor: 'rgba(60, 60, 60, 0.5)',
            border: '1px solid var(--accent)'
          }}>
            <h3 className="font-semibold mb-2" style={{ color: '#e0e0e0' }}>Errors:</h3>
            <ul className="list-disc list-inside" style={{ color: '#c0c0c0' }}>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeOutput; 