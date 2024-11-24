// // NodeContainer.js
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Handle } from 'reactflow';
import debounce from 'lodash/debounce';

// Simple SVG Icons as components
const Icons = {
  Input: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" className="node-icon">
      <path
        fill="currentColor"
        d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"
      />
      <path fill="currentColor" d="M7 12h10v2H7z" />
    </svg>
  ),
  Output: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" className="node-icon">
      <path
        fill="currentColor"
        d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"
      />
      <path fill="currentColor" d="M12 7l5 5-5 5v-4H7v-2h5z" />
    </svg>
  ),
  Text: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" className="node-icon">
      <path
        fill="currentColor"
        d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"
      />
      <path fill="currentColor" d="M7 7h10v2H7zm0 4h10v2H7zm0 4h7v2H7z" />
    </svg>
  ),
  ChevronDown: ({ className }) => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  ),
};

const getNodeIcon = (type) => {
  const IconComponent = Icons[type] || Icons.Text;
  return <IconComponent />;
};

export const CustomHandle = ({ id, type, position, top }) => {
  return (
    <Handle
      type={type}
      position={position}
      id={id}
      className={`handle ${type}`}
      style={{ top: `${top}%` }}
    />
  );
};

export const NodeContainer = ({ children, type, className }) => {
  return (
    <div className={`node-container node-type-${type.toLowerCase()} ${className}`}>
      {children}
    </div>
  );
};

export const NodeComponent = ({
  id,
  data,
  type,
  isInput,
  handles = [],
  textarea = false,
  additionalContent,
}) => {
  const [name, setName] = useState(data?.name || '');
  const [nodeType, setNodeType] = useState(data?.type || 'Text');
  const [text, setText] = useState(data?.text || '');
  const [isExpanded, setIsExpanded] = useState(true);
  const inputRef = useRef(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = useCallback(
    debounce(() => {
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
        inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
      }
    }, 100),
    []
  );

  useEffect(() => {
    adjustTextareaHeight();
  }, [text, adjustTextareaHeight]);

  return (
    <NodeContainer type={type} className={isExpanded ? 'expanded' : 'collapsed'}>
      <div className="node-header">
        {getNodeIcon(type)}
        <span className="node-title">{type}</span>
        <button
          className="expand-button"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Icons.ChevronDown
            className={`node-chevron ${isExpanded ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {isExpanded && (
        <div className="node-content">
          <div className="form-field">
            <label className="input-label">Name</label>
            <input
              type="text"
              className="text-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name..."
            />
          </div>

          {type !== 'Text' && (
            <div className="form-field">
              <label className="input-label">Type</label>
              <select
                className="select-input"
                value={nodeType}
                onChange={(e) => setNodeType(e.target.value)}
              >
                <option value="Text">Text</option>
                {isInput && <option value="File">File</option>}
                {!isInput && <option value="Image">Image</option>}
              </select>
            </div>
          )}

          {textarea && (
            <div className="form-field">
              <label className="input-label">Content</label>
              <textarea
                ref={inputRef}
                className="text-input"
                value={text}
                onChange={handleTextChange}
                placeholder="Enter content..."
              />
            </div>
          )}

          {additionalContent}
        </div>
      )}

      {handles.map((handle) => (
        <CustomHandle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          top={handle.top}
        />
      ))}
    </NodeContainer>
  );
};


