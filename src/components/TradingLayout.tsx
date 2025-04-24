import React from 'react';

interface TradingLayoutProps {
  blockLibrary: React.ReactNode;
  workspace: React.ReactNode;
  codeOutput: React.ReactNode;
}

const TradingLayout: React.FC<TradingLayoutProps> = ({
  blockLibrary,
  workspace,
  codeOutput,
}) => {
  return (
    <div className="h-screen w-screen" style={{ background: 'var(--background)' }}>
      <div className="grid grid-cols-[300px_1fr_300px] h-full gap-4 p-4">
        {/* Block Library Panel */}
        <div className="rounded-lg shadow-md p-4 overflow-auto" 
             style={{ 
               background: 'var(--blockly-toolbox)',
               color: 'var(--blockly-toolbox-text)',
               borderColor: 'var(--blockly-grid)'
             }}>
          <h2 className="text-lg font-semibold mb-4">Block Library</h2>
          {blockLibrary}
        </div>

        {/* Workspace Panel */}
        <div className="rounded-lg shadow-md p-4 overflow-auto"
             style={{ 
               background: 'var(--blockly-bg)',
               color: 'var(--blockly-text)',
               borderColor: 'var(--blockly-grid)'
             }}>
          <h2 className="text-lg font-semibold mb-4">Workspace</h2>
          {workspace}
        </div>

        {/* Code Output Panel */}
        <div className="rounded-lg shadow-md p-4 overflow-auto"
             style={{ 
               background: 'var(--blockly-toolbox)',
               color: 'var(--blockly-toolbox-text)',
               borderColor: 'var(--blockly-grid)'
             }}>
          <h2 className="text-lg font-semibold mb-4">Code Output</h2>
          {codeOutput}
        </div>
      </div>
    </div>
  );
};

export default TradingLayout; 