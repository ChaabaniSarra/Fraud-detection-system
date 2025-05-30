// src/model/GraphModel.js
import neo4j from 'neo4j-driver';

const uri = "neo4j://20.47.81.26:7687";
const user = "neo4j";
const password = "Unfrauded*sarra*2025";

export async function fetchGraphData() {
  const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
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

  await session.close();
  await driver.close();

  return { nodes: Object.values(nodes), links };
}
