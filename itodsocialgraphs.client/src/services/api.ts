import axios from "axios";
import { Edge, Graph, Node } from "../types/graph";

const BASE_URL = "https://localhost:7048/api/graph";

export const getGraph = async (): Promise<Graph> => {
    const res = await axios.get(`${BASE_URL}/get`);
    return res.data;
};

export const addNode = async (node: Node): Promise<void> => {
    await axios.post(`${BASE_URL}/add-node`, node);
};

export const addEdge = async (edge: Edge): Promise<void> => {
    await axios.post(`${BASE_URL}/add-edge`, edge);
};

export const deleteNode = async (id: string): Promise<void> => {
    await axios.delete(`${BASE_URL}/delete-node/${id}`);
};

export const deleteEdge = async (source: string, target: string): Promise<void> => {
    await axios.delete(`${BASE_URL}/delete-edge/${source}/${target}`);
};

export const getCentralNodes = async (): Promise<Node[]> => {
    const res = await axios.get(`${BASE_URL}/central-nodes`);
    return res.data;
};

export const getShortestPath = async (source: string, target: string): Promise<string[]> => {
    const res = await axios.get(`${BASE_URL}/shortest-path/${source}/${target}`);
    return res.data;
};

export const getBridges = async (): Promise<Edge[]> => {
    const res = await axios.get(`${BASE_URL}/bridges`);
    return res.data;
};

