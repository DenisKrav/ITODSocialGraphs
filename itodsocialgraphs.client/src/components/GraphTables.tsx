import React from "react";
import { Graph } from "../types/graph";

interface Props {
    graph: Graph;
}

const GraphTables: React.FC<Props> = ({ graph }) => {
    return (
        <div className="mt-6 space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-2">🔵 Вузли</h3>
                <table className="w-full table-auto border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-2 py-1 border">ID</th>
                            <th className="px-2 py-1 border">Ім'я</th>
                        </tr>
                    </thead>
                    <tbody>
                        {graph.nodes.map((node) => (
                            <tr key={node.id}>
                                <td className="px-2 py-1 border">{node.id}</td>
                                <td className="px-2 py-1 border">{node.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">🔗 Зв’язки</h3>
                <table className="w-full table-auto border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-2 py-1 border">Source</th>
                            <th className="px-2 py-1 border">Target</th>
                        </tr>
                    </thead>
                    <tbody>
                        {graph.edges.map((edge, index) => (
                            <tr key={index}>
                                <td className="px-2 py-1 border">{typeof edge.source === "string" ? edge.source : edge.source.id}</td>
                                <td className="px-2 py-1 border">{typeof edge.target === "string" ? edge.target : edge.target.id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GraphTables;
