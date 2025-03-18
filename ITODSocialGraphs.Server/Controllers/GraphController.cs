using ITODSocialGraphs.Server.Models;
using ITODSocialGraphs.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace ITODSocialGraphs.Server.Controllers
{
    [ApiController]
    [Route("api/graph")]
    public class GraphController : ControllerBase
    {
        private readonly GraphService _graphService = new();

        [HttpGet("get")]
        public IActionResult GetGraph()
        {
            var graph = _graphService.LoadGraph();
            return Ok(graph);
        }

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

        [HttpPost("add-edge")]
        public IActionResult AddEdge([FromBody] Edge edge)
        {
            var graph = _graphService.LoadGraph();
            if (!graph.Nodes.Any(n => n.Id == edge.Source) || !graph.Nodes.Any(n => n.Id == edge.Target))
            {
                return BadRequest("Один з вузлів не існує.");
            }
            graph.Edges.Add(edge);
            _graphService.SaveGraph(graph);
            return Ok(graph);
        }

        [HttpDelete("delete-node/{id}")]
        public IActionResult DeleteNode(string id)
        {
            var graph = _graphService.LoadGraph();
            graph.Nodes.RemoveAll(n => n.Id == id);
            graph.Edges.RemoveAll(e => e.Source == id || e.Target == id);
            _graphService.SaveGraph(graph);
            return Ok(graph);
        }

        [HttpDelete("delete-edge/{source}/{target}")]
        public IActionResult DeleteEdge(string source, string target)
        {
            var graph = _graphService.LoadGraph();
            graph.Edges.RemoveAll(e => e.Source == source && e.Target == target);
            _graphService.SaveGraph(graph);
            return Ok(graph);
        }
    }
}
