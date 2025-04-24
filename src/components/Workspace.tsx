import React, { useState } from 'react';
import BlocklyWorkspace from './BlocklyWorkspace';

const Workspace: React.FC = () => {
  const [generatedCode, setGeneratedCode] = useState<string>('');

  const handleCodeChange = (code: string) => {
    setGeneratedCode(code);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">
        <BlocklyWorkspace onCodeChange={handleCodeChange} />
      </div>
      {generatedCode && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-sm font-semibold mb-2">Generated Code:</h3>
          <pre className="text-xs bg-white p-2 rounded overflow-auto">
            {generatedCode}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Workspace; 