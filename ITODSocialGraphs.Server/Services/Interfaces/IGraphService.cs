using ITODSocialGraphs.Server.Models;
using Newtonsoft.Json;
using QuickGraph;

namespace ITODSocialGraphs.Server.Services.Interfaces
{
    public interface IGraphService
    {
        public Graph LoadGraph();

        public void SaveGraph(Graph graph);

        // 🔥 Знаходження центральних вузлів (визначення найвпливовіших)
        public List<Node> FindCentralNodes();

        // 🔥 Пошук найкоротшого шляху (Дейкстра)
        public List<string> FindShortestPath(string source, string target);

        // 🔥 Пошук "містків" (ключових зв’язків)
        public List<Edge> FindBridges();
    }
}
