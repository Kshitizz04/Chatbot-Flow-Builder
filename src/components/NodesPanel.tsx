import React from "react";

const NodesPanel = () => {
    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <div className="p-4 border-r border-gray-300">
            <h3 className="font-bold mb-2">Nodes</h3>
            <div
                onDragStart={(e) => onDragStart(e, "textNode")}
                draggable
                className="p-2 border rounded-md bg-white cursor-grab shadow-sm"
            >
                Text Node
            </div>
        </div>
    );
};

export default NodesPanel;
