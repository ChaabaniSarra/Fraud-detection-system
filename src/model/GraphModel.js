import neo4j from 'neo4j-driver';

const driver = neo4j.driver(
  "neo4j://20.47.81.26:7687",
  neo4j.auth.basic('neo4j', 'Unfrauded*sarra*2025')
);

export async function fetchGraphData(filters = {}) {
  const session = driver.session();

  // Add filters to query if needed (simple example without filters)
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
      label: r.type,
      color: r.type === "FRAUD" ? "red" : "gray"
    });
  });

  await session.close();

  return { nodes: Object.values(nodes), links };
}

export async function closeDriver() {
  await driver.close();
}
