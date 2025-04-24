'use client';

import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

interface WorkspaceControlsProps {
  onUndo: () => void;
  onRedo: () => void;
  onReset: () => void;
}

const WorkspaceControls: React.FC<WorkspaceControlsProps> = ({ 
  onUndo, 
  onRedo, 
  onReset 
}) => {
  // Create SVG icons without Dark Reader attributes
  const createSvgIcon = (path: string) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
      suppressHydrationWarning
    >
      <path fillRule="evenodd" d={path} clipRule="evenodd" />
    </svg>
  );

  const buttonStyle = {
    backgroundColor: 'var(--accent)',
    color: 'white',
    border: '1px solid var(--accent-dark)'
  };

  return (
    <div className="relative" suppressHydrationWarning>
      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        <button
          onClick={onUndo}
          className="p-2 rounded-lg shadow hover:bg-opacity-90"
          title="Undo"
          style={buttonStyle}
          suppressHydrationWarning
        >
          {createSvgIcon("M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z")}
        </button>
        <button
          onClick={onRedo}
          className="p-2 rounded-lg shadow hover:bg-opacity-90"
          title="Redo"
          style={buttonStyle}
          suppressHydrationWarning
        >
          {createSvgIcon("M12.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H7a5 5 0 00-5 5v2a1 1 0 11-2 0v-2a7 7 0 017-7h7.586l-2.293-2.293a1 1 0 010-1.414z")}
        </button>
      </div>

      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={2}
        centerOnInit={true}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div className="absolute top-4 left-4 z-10 flex space-x-2">
              <button
                onClick={() => zoomIn()}
                className="p-2 rounded-lg shadow hover:bg-opacity-90"
                title="Zoom In"
                style={buttonStyle}
                suppressHydrationWarning
              >
                {createSvgIcon("M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z")}
              </button>
              <button
                onClick={() => zoomOut()}
                className="p-2 rounded-lg shadow hover:bg-opacity-90"
                title="Zoom Out"
                style={buttonStyle}
                suppressHydrationWarning
              >
                {createSvgIcon("M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z")}
              </button>
              <button
                onClick={() => {
                  resetTransform();
                  onReset();
                }}
                className="p-2 rounded-lg shadow hover:bg-opacity-90"
                title="Reset View"
                style={buttonStyle}
                suppressHydrationWarning
              >
                {createSvgIcon("M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z")}
              </button>
            </div>
            <TransformComponent
              wrapperClass="w-full h-full"
              contentClass="w-full h-full"
            >
              <div className="w-full h-full">
                {/* Content will be injected by parent */}
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};

export default WorkspaceControls; 