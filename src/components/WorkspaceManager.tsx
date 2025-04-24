import React, { useState, useEffect } from 'react';
import { workspaceStorage } from '@/services/workspaceStorage';

interface WorkspaceManagerProps {
  onLoadWorkspace: (data: string) => void;
  onSaveWorkspace: () => string;
}

const WorkspaceManager: React.FC<WorkspaceManagerProps> = ({
  onLoadWorkspace,
  onSaveWorkspace,
}) => {
  const [workspaces, setWorkspaces] = useState<Array<{ id: string; name: string; lastModified: Date }>>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [workspaceName, setWorkspaceName] = useState('');
  const [selectedWorkspace, setSelectedWorkspace] = useState<string | null>(null);

  useEffect(() => {
    loadWorkspaces();
  }, []);

  const loadWorkspaces = async () => {
    const list = await workspaceStorage.listWorkspaces();
    setWorkspaces(list);
  };

  const handleSave = async () => {
    if (!workspaceName.trim()) return;

    const workspaceData = onSaveWorkspace();
    const id = `workspace_${Date.now()}`;
    
    await workspaceStorage.saveWorkspace(id, workspaceName, workspaceData);
    setShowSaveDialog(false);
    setWorkspaceName('');
    loadWorkspaces();
  };

  const handleLoad = async (id: string) => {
    const data = await workspaceStorage.loadWorkspace(id);
    if (data) {
      onLoadWorkspace(data);
      setSelectedWorkspace(id);
    }
  };

  const handleDelete = async (id: string) => {
    await workspaceStorage.deleteWorkspace(id);
    loadWorkspaces();
    if (selectedWorkspace === id) {
      setSelectedWorkspace(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Saved Workspaces</h3>
        <button
          onClick={() => setShowSaveDialog(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save Current
        </button>
      </div>

      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Save Workspace</h3>
            <input
              type="text"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              placeholder="Workspace name"
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowSaveDialog(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {workspaces.map((workspace) => (
          <div
            key={workspace.id}
            className={`p-3 border rounded flex justify-between items-center ${
              selectedWorkspace === workspace.id ? 'bg-blue-50' : ''
            }`}
          >
            <div>
              <div className="font-medium">{workspace.name}</div>
              <div className="text-sm text-gray-500">
                {new Date(workspace.lastModified).toLocaleString()}
              </div>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleLoad(workspace.id)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Load
              </button>
              <button
                onClick={() => handleDelete(workspace.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkspaceManager; 