import React, { useCallback } from "react";
import { useFlowContext } from "../context/FlowContext";
import {
    addEdge,
    ReactFlow,
    useEdgesState,
    useNodesState,
    type Connection,
    type Edge,
    type Node
} from "@xyflow/react";
import { nodeTypes } from "../types/reactflowNodeTypes";

const Canvas = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const { setSelectedNodeId } = useFlowContext();

    const onConnect = useCallback(
        (connection: Connection) => {
            const existingEdge = edges.find(
                (e) => e.source === connection.source && e.sourceHandle === connection.sourceHandle
            );
            if (existingEdge) {
                alert("Each source can only have one outgoing edge");
                return;
            }
            setEdges((eds) => addEdge(connection, eds));
        },
        [edges, setEdges]
    );

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const type = event.dataTransfer.getData("application/reactflow");
            if (!type) return;

            const reactFlowBounds = event.currentTarget.getBoundingClientRect();
            const position = {
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            };

            const newNode: Node = {
                id: `${+new Date()}`,
                type,
                position,
                data: { label: "New Text Node" },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [setNodes]
    );

    return (
        <div className="flex-1 h-full" onDrop={onDrop} onDragOver={onDragOver}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                onNodeClick={(_, node) => setSelectedNodeId(node.id)}
                fitView
            />
        </div>
    );
};

export default Canvas;

