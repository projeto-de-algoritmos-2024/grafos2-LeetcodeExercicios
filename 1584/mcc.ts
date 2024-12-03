function minCostConnectPoints(points: number[][]): number {
    const N = points.length;
    const costs: number[] = new Array(N).fill(Infinity);
    const visited: boolean[] = new Array(N).fill(false); 
    let totalCost = 0;
    let numVisited = 0;

    costs[0] = 0;

    while (numVisited < N) {
        let minCost = Infinity;
        let currentPoint = -1;

        for (let i = 0; i < N; i++) {
            if (!visited[i] && costs[i] < minCost) {
                minCost = costs[i];
                currentPoint = i;
            }
        }

        visited[currentPoint] = true;
        totalCost += minCost;
        numVisited++;

        const [x0, y0] = points[currentPoint];

        for (let i = 0; i < N; i++) {
            if (!visited[i]) {
                const [x1, y1] = points[i];
                const cost = Math.abs(x0 - x1) + Math.abs(y0 - y1);
                costs[i] = Math.min(costs[i], cost);
            }
        }
    }

    return totalCost;
}
