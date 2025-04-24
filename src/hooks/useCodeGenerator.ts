import { useEffect, useRef, useState, useCallback } from 'react';

interface UseCodeGeneratorProps {
  onCodeChange?: (code: string) => void;
}

export function useCodeGenerator({ onCodeChange }: UseCodeGeneratorProps = {}) {
  const workerRef = useRef<Worker | null>(null);
  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode);
    onCodeChange?.(newCode);
  }, [onCodeChange]);

  useEffect(() => {
    // Initialize the Web Worker
    workerRef.current = new Worker(
      new URL('../workers/codeGenerator.worker.ts', import.meta.url)
    );

    // Set up message handler
    workerRef.current.onmessage = (event) => {
      const { code, error } = event.data;
      if (error) {
        setError(error);
      } else {
        handleCodeChange(code);
      }
      setIsGenerating(false);
    };

    // Clean up
    return () => {
      workerRef.current?.terminate();
    };
  }, [handleCodeChange]);

  const generateCode = (workspaceXml: string) => {
    if (!workerRef.current) return;

    setIsGenerating(true);
    setError(null);
    workerRef.current.postMessage({ workspaceXml });
  };

  return {
    code,
    error,
    isGenerating,
    generateCode,
  };
} 