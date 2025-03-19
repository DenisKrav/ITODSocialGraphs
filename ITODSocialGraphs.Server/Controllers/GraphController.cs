using ITODSocialGraphs.Server.Models;
using ITODSocialGraphs.Server.Services;
using ITODSocialGraphs.Server.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ITODSocialGraphs.Server.Controllers
{
    [ApiController]
    [Route("api/graph")]
    public class GraphController : ControllerBase
    {
        private readonly IGraphService _graphService;

        public GraphController(IGraphService graphService)
        {
            _graphService = graphService;
        }

        // 🔹 Отримання всього графа
        [HttpGet("get")]
        public IActionResult GetGraph()
        {
            var graph = _graphService.LoadGraph();
            return Ok(graph);
        }

        // 🔹 Додавання нового вузла (користувача)
        [HttpPost("add-node")]
        public IActionResult AddNode([FromBody] Node node)
        {
            var graph = _graphService.LoadGraph();
            if (graph.Nodes.Any(n => n.Id == node.Id))
            {
                return BadRequest("Вузол з таким ID вже існує.");
            }
            graph.Nodes.Add(node);
            _graphService.SaveGraph(graph);
            return Ok(graph);
        }

        // 🔹 Додавання зв'язку між користувачами
        [HttpPost("add-edge")]
        public IActionResult AddEdge([FromBody] Edge edge)
        {
            var graph = _graphService.LoadGraph();
            if (!graph.Nodes.Any(n => n.Id == edge.Source) || !graph.Nodes.Any(n => n.Id == edge.Target))
            {
                return BadRequest("Один із вузлів не існує.");
            }
            graph.Edges.Add(edge);
            _graphService.SaveGraph(graph);
            return Ok(graph);
        }

        // 🔹 Видалення вузла (користувача)
        [HttpDelete("delete-node/{id}")]
        public IActionResult DeleteNode(string id)
        {
            var graph = _graphService.LoadGraph();
            var node = graph.Nodes.FirstOrDefault(n => n.Id == id);
            if (node == null) return NotFound("Вузол не знайдено.");

            graph.Nodes.Remove(node);
            graph.Edges.RemoveAll(e => e.Source == id || e.Target == id);
            _graphService.SaveGraph(graph);
            return Ok(graph);
        }

        // 🔹 Видалення зв’язку між двома вузлами
        [HttpDelete("delete-edge/{source}/{target}")]
        public IActionResult DeleteEdge(string source, string target)
        {
            var graph = _graphService.LoadGraph();
            var edge = graph.Edges.FirstOrDefault(e => e.Source == source && e.Target == target);
            if (edge == null) return NotFound("Зв’язок не знайдено.");

            graph.Edges.Remove(edge);
            _graphService.SaveGraph(graph);
            return Ok(graph);
        }

        // 🔥 Аналіз соціального графа 🔥

        // 🔹 Знаходження найвпливовіших вузлів
        [HttpGet("central-nodes")]
        public IActionResult GetCentralNodes()
        {
            var nodes = _graphService.FindCentralNodes();
            return Ok(nodes);
        }

        // 🔹 Пошук найкоротшого шляху між двома користувачами
        [HttpGet("shortest-path/{source}/{target}")]
        public IActionResult GetShortestPath(string source, string target)
        {
            var path = _graphService.FindShortestPath(source, target);
            return Ok(path);
        }

        // 🔹 Пошук "містків" у графі (ключових зв’язків)
        [HttpGet("bridges")]
        public IActionResult GetBridges()
        {
            var bridges = _graphService.FindBridges();
            return Ok(bridges);
        }
    }
}
