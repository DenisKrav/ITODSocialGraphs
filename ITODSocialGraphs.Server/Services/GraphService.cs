using ITODSocialGraphs.Server.Models;
using ITODSocialGraphs.Server.Services.Interfaces;
using Newtonsoft.Json;
using QuickGraph;
using QuickGraph.Algorithms;

namespace ITODSocialGraphs.Server.Services
{
    public class GraphService: IGraphService
    {
        private const string FilePath = "graph.json";

        public Graph LoadGraph()
        {
            if (!File.Exists(FilePath))
            {
                return new Graph();
            }
            var json = File.ReadAllText(FilePath);
            return JsonConvert.DeserializeObject<Graph>(json) ?? new Graph();
        }

        public void SaveGraph(Graph graph)
        {
            File.WriteAllText(FilePath, JsonConvert.SerializeObject(graph, Formatting.Indented));
        }

        // 🔥 Знаходження центральних вузлів (визначення найвпливовіших)
        public List<Node> FindCentralNodes()
        {
            var graph = LoadGraph();
            var centrality = new Dictionary<string, int>();

            foreach (var node in graph.Nodes)
            {
                centrality[node.Id] = 0;
            }

            foreach (var edge in graph.Edges)
            {
                centrality[edge.Source]++;
                centrality[edge.Target]++;
            }

            return graph.Nodes.OrderByDescending(n => centrality[n.Id]).Take(3).ToList();
        }

        // 🔥 Пошук найкоротшого шляху (Дейкстра)
        public List<string> FindShortestPath(string source, string target)
        {
            var graph = LoadGraph();
            var adjacencyGraph = new AdjacencyGraph<string, Edge<string>>();

            foreach (var node in graph.Nodes)
            {
                adjacencyGraph.AddVertex(node.Id);
            }

            foreach (var edge in graph.Edges)
            {
                adjacencyGraph.AddEdge(new Edge<string>(edge.Source, edge.Target));
            }

            var tryGetPaths = adjacencyGraph.ShortestPathsDijkstra(e => 1.0, source);
            if (tryGetPaths(target, out var path))
            {
                return path.Select(e => e.Source).ToList();
            }

            return new List<string> { "Шлях не знайдено" };
        }

        // 🔥 Пошук "містків" (ключових зв’язків)
        public List<Edge> FindBridges()
        {
            var graph = LoadGraph();
            var result = new List<Edge>();

            foreach (var edge in graph.Edges.ToList())
            {
                graph.Edges.Remove(edge);
                var visited = new HashSet<string>();
                DFS(graph.Nodes.FirstOrDefault()?.Id, visited, graph);

                if (visited.Count < graph.Nodes.Count)
                {
                    result.Add(edge);
                }

                graph.Edges.Add(edge);
            }

            return result;
        }

        private void DFS(string nodeId, HashSet<string> visited, Graph graph)
        {
            if (nodeId == null || visited.Contains(nodeId))
                return;

            visited.Add(nodeId);
            foreach (var edge in graph.Edges)
            {
                if (edge.Source == nodeId) DFS(edge.Target, visited, graph);
                if (edge.Target == nodeId) DFS(edge.Source, visited, graph);
            }
        }
    }
}
