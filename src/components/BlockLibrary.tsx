import React from 'react';

const BlockLibrary: React.FC = () => {
  const blocks = [
    { name: 'Market Order', type: 'order' },
    { name: 'Limit Order', type: 'order' },
    { name: 'Stop Loss', type: 'risk' },
    { name: 'Take Profit', type: 'risk' },
    { name: 'Moving Average', type: 'indicator' },
    { name: 'RSI', type: 'indicator' },
  ];

  return (
    <div className="space-y-2">
      {blocks.map((block, index) => (
        <div
          key={index}
          className="p-3 bg-blue-50 rounded-md cursor-move hover:bg-blue-100 transition-colors"
          draggable
        >
          <div className="font-medium">{block.name}</div>
          <div className="text-sm text-gray-500">{block.type}</div>
        </div>
      ))}
    </div>
  );
};

export default BlockLibrary; 