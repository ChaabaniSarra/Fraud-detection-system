// src/controller/GraphController.js
import React, { useEffect, useState } from 'react';
import GraphComponent from '../view/GraphComponent';
import { fetchGraphData } from '../model/GraphModel';

export default function GraphController() {
  const [data, setData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    fetchGraphData().then(setData);
  }, []);

  return <GraphComponent data={data} />;
}
