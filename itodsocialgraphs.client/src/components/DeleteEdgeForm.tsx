import React, { useState } from "react";
import { deleteEdge } from "../services/api";

interface Props {
  onUpdate: () => void;
}

const DeleteEdgeForm: React.FC<Props> = ({ onUpdate }) => {
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!source || !target) return;
    try {
      await deleteEdge(source, target);
      setSource("");
      setTarget("");
      onUpdate();
    } catch (err) {
      console.error("Помилка видалення зв’язку:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded bg-white shadow space-y-2">
      <h3 className="text-lg font-semibold">Видалити зв’язок</h3>
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
      <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
        Видалити
      </button>
    </form>
  );
};

export default DeleteEdgeForm;
