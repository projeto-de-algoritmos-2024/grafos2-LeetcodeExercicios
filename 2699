function modifiedGraphEdges(
    n: number,
    edges: number[][],
    source: number,
    destination: number,
    target: number
): number[][] {
    const INF = 2_000_000_000;
    const graph: number[][][] = Array.from({ length: n }, () => []);

    for (const [u, v, w] of edges) {
        if (w !== -1) {
            graph[u].push([v, w]);
            graph[v].push([u, w]);
        }
    }

    const initialDistance = dijkstra(graph, source, destination);
    if (initialDistance < target) return []; 
    if (initialDistance === target) {

        for (const edge of edges) {
            if (edge[2] === -1) edge[2] = INF;
        }
        return edges;
    }

    for (let i = 0; i < edges.length; i++) {
        const [u, v, w] = edges[i];
        if (w !== -1) continue;

        edges[i][2] = 1;
        graph[u].push([v, 1]);
        graph[v].push([u, 1]);

        const updatedDistance = dijkstra(graph, source, destination);
        if (updatedDistance <= target) {
            edges[i][2] += target - updatedDistance;
            for (let j = i + 1; j < edges.length; j++) {
                if (edges[j][2] === -1) edges[j][2] = INF;
            }
            return edges;
        }
    }

    return [];
}

function dijkstra(graph: number[][][], src: number, dst: number): number {
    const dist = Array(graph.length).fill(Infinity);
    const minHeap = new MinHeap();

    dist[src] = 0;
    minHeap.insert(0, src);

    while (!minHeap.isEmpty()) {
        const [currentDist, u] = minHeap.extractMin()!;

        for (const [v, w] of graph[u]) {
            if (currentDist + w < dist[v]) {
                dist[v] = currentDist + w;
                minHeap.insert(dist[v], v);
            }
        }
    }

    return dist[dst];
}

class MinHeap {
    private heap: number[][];

    constructor() {
        this.heap = [];
    }

    insert(key: number, value: number): void {
        this.heap.push([key, value]);
        this.bubbleUp(this.heap.length - 1);
    }

    extractMin(): number[] | undefined {
        if (this.heap.length === 0) return undefined;
        const min = this.heap[0];
        const last = this.heap.pop()!;
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.bubbleDown(0);
        }
        return min;
    }

    private bubbleUp(index: number): void {
        const [key, value] = this.heap[index];
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex][0] <= key) break;
            this.heap[index] = this.heap[parentIndex];
            index = parentIndex;
        }
        this.heap[index] = [key, value];
    }

    private bubbleDown(index: number): void {
        const [key, value] = this.heap[index];
        const lastIndex = this.heap.length - 1;

        while (true) {
            let smallestIndex = index;
            const leftIndex = 2 * index + 1;
            const rightIndex = 2 * index + 2;

            if (
                leftIndex <= lastIndex &&
                this.heap[leftIndex][0] < this.heap[smallestIndex][0]
            ) {
                smallestIndex = leftIndex;
            }
            if (
                rightIndex <= lastIndex &&
                this.heap[rightIndex][0] < this.heap[smallestIndex][0]
            ) {
                smallestIndex = rightIndex;
            }
            if (smallestIndex === index) break;

            [this.heap[index], this.heap[smallestIndex]] = [
                this.heap[smallestIndex],
                this.heap[index],
            ];
            index = smallestIndex;
        }
    }

    isEmpty(): boolean {
        return this.heap.length === 0;
    }
}
