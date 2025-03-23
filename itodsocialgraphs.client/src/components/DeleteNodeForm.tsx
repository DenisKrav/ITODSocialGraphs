import React, { useState } from "react";
import { deleteNode } from "../services/api";

interface Props {
    onUpdate: () => void;
}

const DeleteNodeForm: React.FC<Props> = ({ onUpdate }) => {
    const [id, setId] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        try {
            await deleteNode(id);
            setId("");
            onUpdate();
        } catch (err) {
            console.error("Помилка видалення вузла:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded bg-white shadow space-y-2">
            <h3 className="text-lg font-semibold">Видалити вузол</h3>
            <input
                type="text"
                placeholder="ID вузла"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full px-2 py-1 border rounded"
            />
            <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Видалити
            </button>
        </form>
    );
};

export default DeleteNodeForm;
