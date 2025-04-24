import React from 'react';

interface CodeExportProps {
  code: string;
}

const CodeExport: React.FC<CodeExportProps> = ({ code }) => {
  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      // You might want to add a toast notification here
      alert('Code copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy code:', err);
      alert('Failed to copy code to clipboard');
    }
  };

  const handleDownload = () => {
    // Create a blob with the code
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    link.download = 'trading_strategy.pine';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const buttonStyle = {
    backgroundColor: 'var(--accent)',
    color: 'white',
    border: '1px solid var(--accent-dark)'
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={handleCopyToClipboard}
        className="px-4 py-2 rounded hover:opacity-90 flex items-center space-x-2"
        style={buttonStyle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
        </svg>
        <span>Copy Code</span>
      </button>
      <button
        onClick={handleDownload}
        className="px-4 py-2 rounded hover:opacity-90 flex items-center space-x-2"
        style={buttonStyle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        <span>Download</span>
      </button>
    </div>
  );
};

export default CodeExport; 