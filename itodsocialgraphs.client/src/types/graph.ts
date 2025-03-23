export interface Node {
    id: string;
    name: string;
    x?: number;
    y?: number;
    vx?: number;
    vy?: number;
    fx?: number | null;
    fy?: number | null;
  }
  
  export interface Edge {
    source: string | Node;
    target: string | Node;
  }
  
  export interface Graph {
    nodes: Node[];
    edges: Edge[];
  }
  