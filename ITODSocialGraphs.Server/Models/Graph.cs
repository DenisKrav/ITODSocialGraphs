namespace ITODSocialGraphs.Server.Models
{
    public class Graph
    {
        public List<Node> Nodes { get; set; } = new();
        public List<Edge> Edges { get; set; } = new();
    }

    public class Node
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }

    public class Edge
    {
        public string Source { get; set; }
        public string Target { get; set; }
    }
}
