import React, { useEffect, useState } from 'react';
import { fetchGraphData } from '../model/GraphModel';
import { fetchFraudSummary, fetchAlertList } from '../model/FraudModel';

import FraudSummary from '../view/FraudSummary';
import AlertList from '../view/AlertList';
import GraphComponent from '../view/GraphComponent';
import FiltersPanel from '../view/FiltersPanel';
import NodeDetails from '../view/NodeDetails';

import '../styles/Dashboard.css';

export default function DashboardController() {
  const [originalGraph, setOriginalGraph] = useState({ nodes: [], links: [] });
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [summary, setSummary] = useState({ totalCases: 0, suspiciousPercentage: 0, fraudTypesCount: {} });
  const [alerts, setAlerts] = useState([]);
  const [filters, setFilters] = useState({ label: '', fraudType: '', riskScore: 0, company: '' });
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    async function loadData() {
      const [graph, sum, alertList] = await Promise.all([
        fetchGraphData(),
        fetchFraudSummary(),
        fetchAlertList(),
      ]);
      setOriginalGraph(graph);
      setSummary(sum);
      setAlerts(alertList);
      setGraphData(graph); // Set default
    }
    loadData();
  }, []);

  useEffect(() => {
    // Filter based on label
    if (!filters.label) {
      setGraphData(originalGraph);
    } else {
      const filteredNodes = originalGraph.nodes.filter(node => node.label === filters.label);
      const filteredNodeIds = new Set(filteredNodes.map(node => node.id));
      const filteredLinks = originalGraph.links.filter(link => 
        filteredNodeIds.has(link.source) && filteredNodeIds.has(link.target)
      );
      setGraphData({ nodes: filteredNodes, links: filteredLinks });
    }
  }, [filters.label, originalGraph]);

  const availableLabels = [...new Set(originalGraph.nodes.map(n => n.label))];

  return (
    <div className="dashboard-container">
      <div className="sidebar">
       <NodeDetails selectedNode={selectedNode} />

        <FiltersPanel 
          filters={filters} 
          setFilters={setFilters}
          labels={availableLabels} 
        />
        <FraudSummary summary={summary} />
        <AlertList alerts={alerts} onViewDetails={(id) => alert(`Claim: ${id}`)} />
      </div>
      <div className="main-content">
        <h3>Graph Visualization</h3>
        <div className="graph-container">
          <GraphComponent data={graphData} onNodeClick={setSelectedNode} />
        </div>
      </div>
    </div>
  );
}
