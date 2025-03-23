import React, { useState } from "react";
import { Edge } from "../types/graph";
import { addEdge } from "../services/api";

interface Props {
  onUpdate: () => void;
}

const EdgeForm: React.FC<Props> = ({ onUpdate }) => {
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!source || !target || source === target) return;

    const newEdge: Edge = { source, target };
    try {
      await addEdge(newEdge);
      setSource("");
      setTarget("");
      onUpdate(); // оновити граф
    } catch (error) {
      console.error("Помилка додавання зв’язку:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded bg-white shadow space-y-2">
      <h3 className="text-lg font-semibold">Додати зв’язок</h3>
      <input
        type="text"
        placeholder="Source ID"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        className="w-full px-2 py-1 border rounded"
      />
      <input
        type="text"
        placeholder="Target ID"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        className="w-full px-2 py-1 border rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Додати зв’язок
      </button>
    </form>
  );
};

export default EdgeForm;
