import { useEffect, useState } from "react";
import { Graph } from "./types/graph";
import { getGraph } from "./services/api";
import GraphView from "./components/GraphView";
import NodeForm from "./components/NodeForm";
import EdgeForm from "./components/EdgeForm";
import DeleteNodeForm from "./components/DeleteNodeForm";
import DeleteEdgeForm from "./components/DeleteEdgeForm";
import GraphTables from "./components/GraphTables";
import GraphAnalysisPanel from "./components/GraphAnalysisPanel";

function App() {
    const [graph, setGraph] = useState<Graph>({ nodes: [], edges: [] });
    const [highlightedNodes, setHighlightedNodes] = useState<string[]>([]);
    const [highlightedEdges, setHighlightedEdges] = useState<{ source: string; target: string }[]>([]);

    const fetchGraph = async () => {
        try {
            const data = await getGraph();
            setGraph(data);
        } catch (err) {
            console.error("Помилка завантаження графа:", err);
        }
    };

    useEffect(() => {
        fetchGraph();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Соціальний граф</h1>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                    <NodeForm onUpdate={fetchGraph} />
                    <EdgeForm onUpdate={fetchGraph} />
                    <DeleteNodeForm onUpdate={fetchGraph} />
                    <DeleteEdgeForm onUpdate={fetchGraph} />
                </div>
                <div className="md:w-2/3">
                    {/* <GraphView graph={graph} />
                    <GraphAnalysisPanel /> */}
                    <GraphView
                        graph={graph}
                        highlightedNodes={highlightedNodes}
                        highlightedEdges={highlightedEdges}
                    />

                    <GraphAnalysisPanel
                        setHighlightedNodes={setHighlightedNodes}
                        setHighlightedEdges={setHighlightedEdges}
                    />
                    <GraphTables graph={graph} />
                </div>
            </div>
        </div>
    );
}

export default App;
