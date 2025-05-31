import React from 'react';

export default function NodeDetails({ selectedNode }) {
  if (!selectedNode) return <div className="node-details">Select a node to see details.</div>;

  return (
    <div className="node-details">
      <h4>Node Details</h4>
      <ul>
        {Object.entries(selectedNode).map(([key, value]) => (
          <li key={key}><strong>{key}</strong>: {value?.toString()}</li>
        ))}
      </ul>
    </div>
  );
}
