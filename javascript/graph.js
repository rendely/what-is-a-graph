class Graph {
  constructor(paths) {
    this.graph = {};

    if (paths.length === 1) {
      this.graph[paths[0]] = new Set();
      return;
    }

    for (const path of paths){
      for (let i=0; i < path.length -1; i++){
        const firstNode = path[i];
        const secondNode = path[i+1];
        this.addVertex(firstNode, [secondNode]);        
      }
    }

  }

  isAdjacent(vertexA, vertexB) {
    if (vertexA in this.graph){
      return this.graph[vertexA].has(vertexB)
    }

    return false;
  }

  // array is an adjacency list
  addVertex(vertex, array) {
    for (let i=0; i < array.length; i++){
      const firstNode = vertex;
      const secondNode = array[i];
      
      if (firstNode in this.graph){
        this.graph[firstNode].add(secondNode);
      }else{
        this.graph[firstNode] = new Set(secondNode);
      }

      if (secondNode in this.graph){
        this.graph[secondNode].add(firstNode);
      }else{
        this.graph[secondNode] = new Set(firstNode)
      }
    }

  }
}

if (require.main === module) {
  // add your own tests in here
  let graph = new Graph([]);

  console.log("Expecting: {}");
  console.log(graph.graph);

  console.log("");

  graph = new Graph([["a", "b", "c"], ["b", "d"]]);

  console.log('Expecting: { a: { "b" }, b: { "a", "c", "d" }, c: { "b" }, d: { "b" }}');
  console.log(graph.graph);

  console.log("");

  console.log("Expecting: true");
  console.log(graph.isAdjacent("a", "b"));

  console.log("");

  console.log("Expecting: false");
  console.log(graph.isAdjacent("a", "c"));

  console.log("");

  graph.addVertex("e", ["a", "d"]);
  console.log('Expecting: { a: { "b", "e" }, b: { "a", "c", "d" }, c: { "b" }, d: { "b", "e" }, e: { "a", "d" } }');
  console.log(graph.graph);

  console.log("")
}

module.exports = Graph;

// Please add your pseudocode to this file
// And a written explanation of your solution
