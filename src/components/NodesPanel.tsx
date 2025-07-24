import React from "react";
import { BsChatText } from "react-icons/bs";

const NodesPanel = () => {
    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <div className="p-3 grid grid-cols-2 gap-2">
            <div
                onDragStart={(e) => onDragStart(e, "Text")}
                draggable
                className="p-2 cursor-grab flex flex-col items-center justify-center text-accent border border-accent rounded-md"
            >
                <BsChatText className="text-2xl" />
                <p className="font-semibold">Message</p>
            </div>
        </div>
    );
};

export default NodesPanel;
