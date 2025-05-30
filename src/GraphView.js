// GraphView.js
import React, { useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import neo4j from 'neo4j-driver';


export default function GraphView() {
  const [data, setData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    async function fetchData() {
      const driver = neo4j.driver(
        "neo4j://20.47.81.26:7687", // adapte si besoin
       neo4j.auth.basic('neo4j', 'Unfrauded*sarra*2025')  // remplace par ton mot de passe
      );
      const session = driver.session();

      const result = await session.run('MATCH (a)-[r]->(b) RETURN a, r, b');

      const nodes = {};
      const links = [];

      result.records.forEach(record => {
        const a = record.get('a');
        const b = record.get('b');
        const r = record.get('r');

        nodes[a.identity.toInt()] = { id: a.identity.toInt(), label: a.labels[0], ...a.properties };
        nodes[b.identity.toInt()] = { id: b.identity.toInt(), label: b.labels[0], ...b.properties };

        links.push({
          source: a.identity.toInt(),
          target: b.identity.toInt(),
          label: r.type
        });
      });

      setData({
        nodes: Object.values(nodes),
        links: links
      });

      await session.close();
      await driver.close();
    }

    fetchData();
  }, []);

  return (
    <ForceGraph2D
     graphData={data}
      nodeAutoColorBy="label"
      nodeLabel={node => `${node.label} ${node.name || ""}`}
      linkLabel={link => link.label}
    /> 
//     <ForceGraph2D
//   graphData={data}
//   nodeAutoColorBy="label"
//   nodeLabel={node =>
//     `Label: ${node.label}
// Name: ${node.name || 'N/A'}
// ID: ${node.id || 'N/A'}
// Type: ${node.type || 'N/A'}`
//   }
//   linkLabel={link =>
//     `Label: ${link.label}
// Source: ${link.source?.id || link.source}
// Target: ${link.target?.id || link.target}
// Confidence: ${link.confidence || 'N/A'}`
//   }
// />

  );
}
