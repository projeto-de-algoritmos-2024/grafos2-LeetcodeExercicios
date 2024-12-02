function dfs(
    graph: number[][],
    node: number,
    parent: number,
    ids: number[],
    low: number[],
    visited: Set<number>,
    result: number[][],
    time: { current: number }
  ) {
    visited.add(node);
    ids[node] = low[node] = time.current++;
    
    for (const neighbor of graph[node]) {
      if (neighbor === parent) continue; 
  
      if (!visited.has(neighbor)) {
        dfs(graph, neighbor, node, ids, low, visited, result, time);
        low[node] = Math.min(low[node], low[neighbor]);
        if (low[neighbor] > ids[node]) {
          result.push([node, neighbor]);
        }
      } else {
        low[node] = Math.min(low[node], ids[neighbor]);
      }
    }
  }

  function criticalConnections(n: number, connections: number[][]): number[][] {
    const graph: number[][] = Array.from({ length: n }, () => []);
    const ids: number[] = new Array(n).fill(-1);
    const low: number[] = new Array(n).fill(0);
    const visited = new Set<number>();
    const result: number[][] = [];
    const time = { current: 0 };
  
    // Construir o grafo
    for (const [u, v] of connections) {
      graph[u].push(v);
      graph[v].push(u);
    }
  
    // Executar DFS
    for (let i = 0; i < n; i++) {
      if (!visited.has(i)) {
        dfs(graph, i, -1, ids, low, visited, result, time);
      }
    }
  
    return result;
  }
  