import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface WorkspaceDB extends DBSchema {
  workspaces: {
    key: string;
    value: {
      id: string;
      name: string;
      data: string;
      lastModified: Date;
    };
  };
}

class WorkspaceStorage {
  private db: IDBPDatabase<WorkspaceDB> | null = null;
  private static instance: WorkspaceStorage;

  private constructor() {}

  static getInstance(): WorkspaceStorage {
    if (!WorkspaceStorage.instance) {
      WorkspaceStorage.instance = new WorkspaceStorage();
    }
    return WorkspaceStorage.instance;
  }

  async initDB(): Promise<void> {
    if (!this.db) {
      this.db = await openDB<WorkspaceDB>('trading-workspaces', 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains('workspaces')) {
            const store = db.createObjectStore('workspaces', { keyPath: 'id' });
            store.createIndex('name', 'name');
            store.createIndex('lastModified', 'lastModified');
          }
        },
      });
    }
  }

  async saveWorkspace(id: string, name: string, data: string): Promise<void> {
    await this.initDB();
    if (!this.db) throw new Error('Database not initialized');

    await this.db.put('workspaces', {
      id,
      name,
      data,
      lastModified: new Date(),
    });
  }

  async loadWorkspace(id: string): Promise<string | null> {
    await this.initDB();
    if (!this.db) throw new Error('Database not initialized');

    const workspace = await this.db.get('workspaces', id);
    return workspace?.data || null;
  }

  async listWorkspaces(): Promise<Array<{ id: string; name: string; lastModified: Date }>> {
    await this.initDB();
    if (!this.db) throw new Error('Database not initialized');

    const workspaces = await this.db.getAll('workspaces');
    return workspaces.map(({ id, name, lastModified }) => ({
      id,
      name,
      lastModified,
    }));
  }

  async deleteWorkspace(id: string): Promise<void> {
    await this.initDB();
    if (!this.db) throw new Error('Database not initialized');

    await this.db.delete('workspaces', id);
  }
}

export const workspaceStorage = WorkspaceStorage.getInstance(); 