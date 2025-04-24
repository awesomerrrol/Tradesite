'use client';

import React, { useRef, useState } from 'react';
import { PineScriptWorkspace } from '@/components/PineScriptWorkspace';
import WorkspaceControls from '@/components/WorkspaceControls';
import CodeOutput from '@/components/CodeOutput';
import CodeExport from '@/components/CodeExport';
import type { WorkspaceSvg } from 'blockly';

export default function Home() {
  const [code, setCode] = useState('');
  const [errors] = useState<string[]>([]);
  const workspaceRef = useRef<WorkspaceSvg | null>(null);

  const handleCodeChange = (newCode: string, workspace: WorkspaceSvg) => {
    setCode(newCode);
    workspaceRef.current = workspace;
  };

  const handleUndo = () => {
    workspaceRef.current?.undo(false);
  };

  const handleRedo = () => {
    workspaceRef.current?.undo(true);
  };

  const handleReset = () => {
    workspaceRef.current?.clear();
  };

  return (
    <main className="flex min-h-screen flex-col p-4 gap-4" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Pine Script Generator</h1>
        <WorkspaceControls
          onUndo={handleUndo}
          onRedo={handleRedo}
          onReset={handleReset}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4 flex-grow">
        <div className="border rounded-lg overflow-hidden" style={{ borderColor: 'var(--blockly-grid)' }}>
          <PineScriptWorkspace onCodeChange={handleCodeChange} />
        </div>
        <div className="flex flex-col gap-4">
          <CodeOutput code={code} errors={errors} />
          <CodeExport code={code} />
        </div>
      </div>
    </main>
  );
}
