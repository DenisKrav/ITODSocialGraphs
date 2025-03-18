using ITODSocialGraphs.Server.Models;
using Newtonsoft.Json;

namespace ITODSocialGraphs.Server.Services
{
    public class GraphService
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
    }
}
