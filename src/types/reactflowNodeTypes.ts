import TextNode from "../components/TextNode";

// this has to be passed to the ReactFlow component as nodeTypes prop
// https://reactflow.dev/examples/nodes/custom-node
export const nodeTypes = {
    Text: TextNode,
}