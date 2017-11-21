// This is not node.js, but rather a "node" object used in the attack trees.

// This is an especially important class, because it can be overriden in order to implement other attack models.
// By default it does simple min/max costing with one attribute.
// Data stored in a d3-compatible format: https://github.com/d3/d3-hierarchy/blob/master/README.md#hierarchy
class Node {
  constructor(id, label, attributeObj) {
    this.attributes = attributeObj;
    this.label = label;
    this.id = id;
  }

  addChild(node, edgesStore, nodesStore) {
    // Add to node store.
    nodesStore.addNode(node)

    // Add edge from this.id to node.id
    var newEdge = new Edge(this.id, node.id);
    edgesStore.addEdge(newEdge);

  }

  // Can be extended
  calculate() {
    return 0;
  }
}

class Nodes {
  constructor() {
    this.nodes = [];
  }

  addNode(node) {
    this.nodes.push(node);
  }

  generateUniqueNodeID() {
    // Sort nodes. Then, find a gap.
    this.nodes.sort(function(a, b) {
      return a.id - b.id;
    });

    for (var i = 0; i < this.nodes.length; i++) {
      if (i == 0) {
        if (this.nodes[i].id != 0) {
          return 0;
        }
      } else {
        if (this.nodes[i].id - this.nodes[i - 1].id != 1) {
          return this.nodes[i].id + 1;
        }
      }
    }

    return this.nodes.length;
  }

  getNode(id) {
    for (var i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].id == id) {
        return this.nodes[i]
      }
    }

    return null;
  }
}

class Edge {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }
}

class Edges {
  constructor() {
    this.edges = [];
  }

  addEdge(edge) {
    this.edges.push(edge);
  }
}