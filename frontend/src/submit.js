import React from 'react';
import { useState } from 'react';
import { useStore } from "./store";
import axios from "axios";

// SVG Icon Components
const CheckIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    className="node-icon"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const CloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="node-icon"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// Add these styles to your index.css


const CustomAlert = ({ message, onClose }) => {
  return (
    <div className="alert-overlay">
      <div className="alert-container">
        <div className="alert-header">
          <div className="alert-title">
            <CheckIcon />
            <h2 className="node-title">Submission Results</h2>
          </div>
          <button className="close-icon-button" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        
        <div className="alert-content">
          <p dangerouslySetInnerHTML={{ 
            __html: message.replace(
              /<strong class="highlight">(\d+)<\/strong>/g,
              '<span class="highlight">$1</span>'
            )
          }} />
        </div>

        <div className="alert-footer">
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const [alertMessage, setAlertMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("http://127.0.0.1:8000/pipeline/analyze", {
        nodes,
        edges,
      });
      
      const { num_nodes, num_edges, is_dag } = response.data;
      const message = `The pipeline contains <strong class="highlight">${num_nodes}</strong> nodes and <strong class="highlight">${num_edges}</strong> edges. It is ${
        is_dag ? "" : "not "
      }a Directed Acyclic Graph (DAG).`;
      setAlertMessage(message);
    } catch (error) {
      console.error("Error submitting pipeline:", error);
      setAlertMessage("Failed to submit pipeline. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const closeAlert = () => {
    setAlertMessage(null);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isLoading}
        className="submit-button"
      >
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
      {alertMessage && <CustomAlert message={alertMessage} onClose={closeAlert} />}
    </div>
  );
};

export default SubmitButton;