const fs = require('fs');
const file = 'src/utils/content/posts.ts';
let code = fs.readFileSync(file, 'utf8');

const newPost = `
  {
    slug: "why-nexora-moved-to-neo4j",
    title: "Why Nexora's connection graph moved from PostgreSQL to Neo4j",
    excerpt: "How rewriting our social graph query engine fixed critical latency bottlenecks.",
    date: "2026-10-07",
    tags: ["Backend", "GraphDB", "Neo4j"],
    draft: true,
    content: \`
When I built the first version of Nexora, I naturally reached for PostgreSQL. It was reliable, familiar, and handled all of our early relational data beautifully. For a while, mapping the social graph in SQL worked fine.

However, as the user base grew and connections multiplied, a critical bottleneck emerged. Our recommendation engine required finding mutual connections—essentially querying 2nd and 3rd-degree networks. In a relational database, this meant writing recursive, self-referential JOINs. The deeper the graph query, the slower it ran.

What started as acceptable performance quickly degraded. Multi-hop queries in SQL require a self-join per hop, meaning intermediate result sets grow with each step. As the application scaled, the recommendation latency spiked from milliseconds to several seconds under load. The architecture simply wasn't built for traversing deep relationships efficiently.

The solution wasn't to optimize the SQL queries further, but to rethink how the data was stored. I migrated the connection relationships into a dedicated Neo4j graph database, while keeping core user accounts and credentials in PostgreSQL.

Neo4j stores relationships as direct physical pointers—a concept known as index-free adjacency. This means a graph traversal follows stored relationships directly, so query latency depends only on the size of the neighbourhood visited, not the total graph size.

By isolating the connection logic into a dedicated Connection Service powered by Neo4j and Cypher queries, the recommendation latency plummeted. The tradeoff, of course, is polyglot persistence and eventual consistency. When a new user profile is created in PostgreSQL, a corresponding node must be created in Neo4j. If the Neo4j write fails, reconciliation logic or an event listener must self-heal the graph node.

Despite the added complexity of managing dual data stores, the performance gains were undeniable. Nexora's social graph is now resilient, scalable, and fundamentally better aligned with the workload it handles.
    \`
  },
`;

code = code.replace(/export const staticPosts: BlogPost\[\] = \[/, `export const staticPosts: BlogPost[] = [\n${newPost}`);
code = code.replace(/slug: "building-resilient-apis"/g, 'draft: true,\n    slug: "building-resilient-apis"');
code = code.replace(/slug: "designing-for-performance"/g, 'draft: true,\n    slug: "designing-for-performance"');

fs.writeFileSync(file, code);
