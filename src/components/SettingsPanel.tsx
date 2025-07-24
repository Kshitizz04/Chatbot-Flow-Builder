import React from "react";
import { useFlowContext } from "../context/FlowContext";
import { useReactFlow } from "@xyflow/react";
import { MdArrowBack, MdDelete } from "react-icons/md";

const SettingsPanel: React.FC = () => {
    const { selectedNodeId, setSelectedNodeId } = useFlowContext();
    const { getNodes, setNodes, getEdges, setEdges } = useReactFlow();

    const node = getNodes().find((n) => n.id === selectedNodeId);

    if (!node) return <p className="p-4">Select a node to</p>;

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const updatedNodes = getNodes().map((n) =>
            n.id === selectedNodeId ? { ...n, data: { ...n.data, label: e.target.value } } : n
        );
        setNodes(updatedNodes);
    };

    const onBack = () => {
        setSelectedNodeId(null);
    };

    const onDelete = () => {
        setNodes(getNodes().filter(n => n.id !== selectedNodeId));
        setEdges(getEdges().filter(e => e.source !== selectedNodeId && e.target !== selectedNodeId));
        setSelectedNodeId(null);
    };

    return (
        <div className="w-full h-full flex flex-col justify-start">

            <div className="w-full p-3 relative border-b border-outline">
                <p className="font-semibold text-center">Message</p>
                <button
                    onClick={onBack}
                    className="cursor-pointer absolute left-3 top-1/2 transform -translate-y-1/2"
                >
                    <MdArrowBack />
                </button>
            </div>

            <div className="w-full p-3 border-b border-outline">
                <p className="text-sm text-gray-500 mb-2">{node.type}</p>
                <textarea
                    value={typeof node.data.label === "string" ? node.data.label : ""}
                    onChange={(e) => onChange(e)}
                    placeholder="Type your message here..."
                    className="w-full p-2 border border-outline rounded"  
                />
            </div>

            <div className="w-full p-3 mt-auto">
                <button
                    onClick={onDelete}
                    className="cursor-pointer w-full flex items-center justify-center gap-2 py-2 px-4 border border-on-error bg-error text-on-error rounded"
                >
                    <MdDelete />
                    Delete Node
                </button>
            </div>
        </div>
    );
};

export default SettingsPanel;
