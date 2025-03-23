import React, { useState } from "react";
import {
  getCentralNodes,
  getShortestPath,
  getBridges,
} from "../services/api";
import { Node, Edge } from "../types/graph";

const GraphAnalysisPanel: React.FC = () => {
  const [centralNodes, setCentralNodes] = useState<Node[]>([]);
  const [bridges, setBridges] = useState<Edge[]>([]);
  const [path, setPath] = useState<string[]>([]);
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");

  const handleCentralNodes = async () => {
    const data = await getCentralNodes();
    setCentralNodes(data);
    setPath([]);
    setBridges([]);
  };

  const handleShortestPath = async () => {
    if (!source || !target) return;
    const data = await getShortestPath(source, target);
    setPath(data);
    setCentralNodes([]);
    setBridges([]);
  };

  const handleBridges = async () => {
    const data = await getBridges();
    setBridges(data);
    setCentralNodes([]);
    setPath([]);
  };

  return (
    <div className="mt-6 p-4 border rounded bg-white shadow space-y-4">
      <h3 className="text-xl font-semibold">🔍 Аналіз графа</h3>

      <div className="space-y-2">
        <button
          onClick={handleCentralNodes}
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          Найвпливовіші вузли
        </button>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="ID відправника"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="px-2 py-1 border rounded w-full"
          />
          <input
            type="text"
            placeholder="ID отримувача"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="px-2 py-1 border rounded w-full"
          />
          <button
            onClick={handleShortestPath}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Найкоротший шлях
          </button>
        </div>

        <button
          onClick={handleBridges}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Показати ключові зв’язки
        </button>
      </div>

      {/* Результати */}
      {centralNodes.length > 0 && (
        <div>
          <h4 className="font-semibold mt-4">🔥 Найвпливовіші вузли:</h4>
          <ul className="list-disc pl-6">
            {centralNodes.map((node) => (
              <li key={node.id}>
                {node.id} — {node.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {path.length > 0 && (
        <div>
          <h4 className="font-semibold mt-4">🧭 Найкоротший шлях:</h4>
          <p>{path.join(" → ")}</p>
        </div>
      )}

      {bridges.length > 0 && (
        <div>
          <h4 className="font-semibold mt-4">🛤 Ключові зв’язки (мости):</h4>
          <ul className="list-disc pl-6">
            {bridges.map((edge, i) => (
              <li key={i}>
                {typeof edge.source === "string" ? edge.source : edge.source.id} →{" "}
                {typeof edge.target === "string" ? edge.target : edge.target.id}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GraphAnalysisPanel;
