from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
from collections import defaultdict, deque

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    data: Optional[Dict] = None  # Allow nodes to have optional data

class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.post("/pipeline/analyze")
def analyze_pipeline(pipeline: Pipeline):
    node_ids = {node.id for node in pipeline.nodes}  # Set of all node IDs
    edge_sources = {edge.source for edge in pipeline.edges}
    edge_targets = {edge.target for edge in pipeline.edges}

    # Identify undefined nodes (used in edges but not listed as nodes)
    undefined_nodes = (edge_sources | edge_targets) - node_ids

    # Check if the graph is a DAG
    graph = defaultdict(list)
    in_degree = defaultdict(int)

    for edge in pipeline.edges:
        graph[edge.source].append(edge.target)
        in_degree[edge.target] += 1

    queue = deque([node.id for node in pipeline.nodes if in_degree[node.id] == 0])
    visited_count = 0

    while queue:
        node = queue.popleft()
        visited_count += 1
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    is_dag = visited_count == len(node_ids)  # Compare with actual number of defined nodes

    # Response
    response = {
        "num_nodes": len(pipeline.nodes),
        "num_edges": len(pipeline.edges),
        "is_dag": is_dag,
        "undefined_nodes": list(undefined_nodes),
    }

    if undefined_nodes:
        response["message"] = "The pipeline contains undefined nodes referenced in edges."

    return response
