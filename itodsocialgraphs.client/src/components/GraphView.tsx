import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Graph, Node } from "../types/graph";

interface GraphViewProps {
  graph: Graph;
  highlightedNodes?: string[];
  highlightedEdges?: { source: string; target: string }[];
}

const GraphView: React.FC<GraphViewProps> = ({
  graph,
  highlightedNodes = [],
  highlightedEdges = [],
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!graph.nodes.length) return;

    const width = 600;
    const height = 400;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const simulation = d3
      .forceSimulation<Node>(graph.nodes)
      .force(
        "link",
        d3
          .forceLink<Node, d3.SimulationLinkDatum<Node>>(graph.edges)
          .id((d) => d.id)
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append("g")
      .attr("stroke-width", 2)
      .selectAll("line")
      .data(graph.edges)
      .join("line")
      .attr("stroke", (d: any) => {
        const src = typeof d.source === "string" ? d.source : d.source.id;
        const tgt = typeof d.target === "string" ? d.target : d.target.id;
        const isHighlighted = highlightedEdges.some(
          (e) => e.source === src && e.target === tgt
        );
        return isHighlighted ? "#f97316" : "#ccc"; // orange або сіро
      });

    const node = svg
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll<SVGCircleElement, Node>("circle")
      .data(graph.nodes)
      .join("circle")
      .attr("r", 15)
      .attr("fill", (d) =>
        highlightedNodes.includes(d.id) ? "#facc15" : "#3b82f6"
      )
      .call(drag(simulation));

    const label = svg
      .append("g")
      .selectAll("text")
      .data(graph.nodes)
      .join("text")
      .text((d) => d.name)
      .attr("font-size", 12)
      .attr("fill", "#000");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => (d.source as Node).x!)
        .attr("y1", (d: any) => (d.source as Node).y!)
        .attr("x2", (d: any) => (d.target as Node).x!)
        .attr("y2", (d: any) => (d.target as Node).y!);

      node
        .attr("cx", (d) => d.x!)
        .attr("cy", (d) => d.y!);

      label
        .attr("x", (d) => d.x! + 18)
        .attr("y", (d) => d.y!);
    });
  }, [graph, highlightedNodes, highlightedEdges]);

  return (
    <div className="rounded border p-4 bg-white shadow">
      <h2 className="text-xl font-semibold mb-2">Візуалізація графа</h2>
      <svg ref={svgRef} width={"100%"} height={400} />
    </div>
  );
};

function drag(simulation: d3.Simulation<Node, undefined>) {
  return d3
    .drag<SVGCircleElement, Node>()
    .on("start", (event, d) => {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    })
    .on("drag", (event, d) => {
      d.fx = event.x;
      d.fy = event.y;
    })
    .on("end", (event, d) => {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    });
}

export default GraphView;


// import React, { useEffect, useRef } from "react";
// import * as d3 from "d3";
// import { Graph, Node } from "../types/graph";

// interface GraphViewProps {
//   graph: Graph;
// }

// const GraphView: React.FC<GraphViewProps> = ({ graph }) => {
//   const svgRef = useRef<SVGSVGElement>(null);

//   useEffect(() => {
//     if (!graph.nodes.length) return;

//     const width = 600;
//     const height = 400;

//     const svg = d3.select(svgRef.current);
//     svg.selectAll("*").remove(); // очищення перед перерендером

//     // типізована симуляція
//     const simulation = d3
//       .forceSimulation<Node>(graph.nodes)
//       .force(
//         "link",
//         d3
//           .forceLink<Node, d3.SimulationLinkDatum<Node>>(graph.edges)
//           .id((d) => d.id)
//           .distance(100)
//       )
//       .force("charge", d3.forceManyBody().strength(-200))
//       .force("center", d3.forceCenter(width / 2, height / 2));

//     const link = svg
//       .append("g")
//       .attr("stroke", "#ccc")
//       .attr("stroke-width", 2)
//       .selectAll("line")
//       .data(graph.edges)
//       .join("line");

//     const node = svg
//       .append("g")
//       .attr("stroke", "#fff")
//       .attr("stroke-width", 1.5)
//       .selectAll<SVGCircleElement, Node>("circle")
//       .data(graph.nodes)
//       .join("circle")
//       .attr("r", 15)
//       .attr("fill", "#3b82f6")
//       .call(drag(simulation));

//     const label = svg
//       .append("g")
//       .selectAll("text")
//       .data(graph.nodes)
//       .join("text")
//       .text((d) => d.name)
//       .attr("font-size", 12)
//       .attr("fill", "#000");

//     simulation.on("tick", () => {
//       link
//         .attr("x1", (d: any) => (d.source as Node).x!)
//         .attr("y1", (d: any) => (d.source as Node).y!)
//         .attr("x2", (d: any) => (d.target as Node).x!)
//         .attr("y2", (d: any) => (d.target as Node).y!);

//       node
//         .attr("cx", (d) => d.x!)
//         .attr("cy", (d) => d.y!);

//       label
//         .attr("x", (d) => d.x! + 18)
//         .attr("y", (d) => d.y!);
//     });
//   }, [graph]);

//   return (
//     <div className="rounded border p-4 bg-white shadow">
//       <h2 className="text-xl font-semibold mb-2">Візуалізація графа</h2>
//       <svg ref={svgRef} width={"100%"} height={400} />
//     </div>
//   );
// };

// // drag функція
// function drag(simulation: d3.Simulation<Node, undefined>) {
//   return d3
//     .drag<SVGCircleElement, Node>()
//     .on("start", (event, d) => {
//       if (!event.active) simulation.alphaTarget(0.3).restart();
//       d.fx = d.x;
//       d.fy = d.y;
//     })
//     .on("drag", (event, d) => {
//       d.fx = event.x;
//       d.fy = event.y;
//     })
//     .on("end", (event, d) => {
//       if (!event.active) simulation.alphaTarget(0);
//       d.fx = null;
//       d.fy = null;
//     });
// }

// export default GraphView;
