import React, { useState } from "react";
import { Node } from "../types/graph";
import { addNode } from "../services/api";

interface Props {
  onUpdate: () => void;
}

const NodeForm: React.FC<Props> = ({ onUpdate }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !name) return;

    const newNode: Node = { id, name };
    try {
      await addNode(newNode);
      setId("");
      setName("");
      onUpdate(); // оновити граф
    } catch (error) {
      console.error("Помилка додавання вузла:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded bg-white shadow space-y-2">
      <h3 className="text-lg font-semibold">Додати вузол</h3>
      <input
        type="text"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="w-full px-2 py-1 border rounded"
      />
      <input
        type="text"
        placeholder="Ім'я"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-2 py-1 border rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Додати
      </button>
    </form>
  );
};

export default NodeForm;
