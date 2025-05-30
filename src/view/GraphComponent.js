// src/view/GraphComponent.js
import React from 'react';
import ForceGraph2D from 'react-force-graph-2d';

export default function GraphComponent({ data }) {
  return (
    <ForceGraph2D
      graphData={data}
      nodeAutoColorBy="label"
      nodeLabel={node => `${node.label} ${node.name || ""}`}
      linkLabel={link => link.label}
    />
  );
}
