import React from "react";
import { BsChatText } from "react-icons/bs";

// making an array for each node type, so in future we can new node types here and the rendering logic will remain the same
const NODE_TYPES = [
    {
        type: "Text",
        label: "Message",
        icon: <BsChatText className="text-2xl" />,
        color: "text-accent border-accent"
    },
    // Example for future node types:
    // {
    //     type: "Image",
    //     label: "Image",
    //     icon: <BsImage className="text-2xl" />,
    //     color: "text-blue-500 border-blue-500"
    // }
];

const NodesPanel = () => {
    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <div className="p-3 grid grid-cols-2 gap-2">
            {NODE_TYPES.map((node) => (
                <div
                    key={node.type}
                    onDragStart={(e) => onDragStart(e, node.type)}
                    draggable
                    className={`p-2 cursor-grab flex flex-col items-center justify-center border rounded-md ${node.color}`}
                >
                    {node.icon}
                    <p className="font-semibold">{node.label}</p>
                </div>
            ))}
        </div>
    );
};

export default NodesPanel;
