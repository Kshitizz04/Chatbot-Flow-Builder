import React, { useCallback } from "react";
import { useFlowContext } from "../context/FlowContext";
import {
    addEdge,
    Controls,
    MarkerType,
    MiniMap,
    ReactFlow,
    useEdgesState,
    useNodesState,
    useReactFlow,
    type Connection,
    type Edge,
    type Node
} from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import { nodeTypes } from "../types/reactflowNodeTypes";

/**
 * This component renders the main flow builder area using React Flow.
 - Manages the state for nodes and edges using React Flow hooks.
 - Handles drag-and-drop for adding new nodes to the canvas.
 - Handles connecting nodes with edges, enforcing the rule that each source handle can only have one outgoing edge.

 * functions:
 - onConnect: Prevents multiple outgoing edges from the same source handle by checking existing edges before adding a new one.
 - onDrop: Adds a new node at the drop position when a node type is dragged from the NodesPanel.
 - onDragOver: Enables dropping nodes onto the canvas.
 - onNodeClick and onPaneClick: Used to select and deselect nodes, which controls whether the SettingsPanel or NodesPanel is shown.

 - defaultEdgeOptions prop: Ensures all edges have an arrow at the target end.
 - MiniMap and Controls props: Provide additional UI features for navigation and overview.
 */

const Canvas = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const { setSelectedNodeId } = useFlowContext();
    const { screenToFlowPosition } = useReactFlow();

    const onConnect = useCallback(
        (connection: Connection) => {
            // check if the source handle already has an outgoing edge
            const hasOutgoing = edges.some(
                (e) =>
                    e.source === connection.source &&
                    (e.sourceHandle ?? null) === (connection.sourceHandle ?? null)
            );

            // if it has outgoing edge, then we prevent user from adding further
            if (hasOutgoing) {
                // some error message can be shown here to let user know about the rules
                // i dont think we need to
                return;
            }
            setEdges((eds) => addEdge(connection, eds));
        },
        [edges, setEdges]
    );

    // Allow dropping nodes onto the canvas
    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    // Add a new node at the drop position
    // https://reactflow.dev/examples/interaction/drag-and-drop
    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            // when we start dragging a node from nodes panel, we set the this value to the type of node being dragged
            // here we get that type and add a new node of that type
            // in future, we can set the data of the node and default values too, or extend our FlowContext.tsx to do this
            // but since we have one node type for now, we can just add a new node with default data
            const type = event.dataTransfer.getData("application/reactflow");
            if (!type) return;

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newNode: Node = {
                id: `${+new Date()}`,
                type,
                position,
                data: { label: "Text Message" },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [setNodes, screenToFlowPosition]
    );

    return (
        <div className="flex-1 h-full" onDragOver={onDragOver}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                nodeTypes={nodeTypes}
                onNodeClick={(_, node) => setSelectedNodeId(node.id)}
                onPaneClick={() => setSelectedNodeId(null)}
                fitView
                defaultEdgeOptions={{ markerEnd: { type: MarkerType.ArrowClosed } }}
            >
                <MiniMap
                    nodeStrokeColor={(n) => {
                        if (n.type === 'Text') return 'var(--color-on-tertiary)';
                        else return '#ff0072';
                    }}
                    nodeColor={(n) => {
                        if (n.type === 'text') return '#fff';
                        return '#fff';
                    }}
                />
                <Controls/>
            </ReactFlow>
        </div>
    );
};

export default Canvas;

