import React from "react";
import { useFlowContext } from "../context/FlowContext";
import { useReactFlow } from "@xyflow/react";
import { MdArrowBack } from "react-icons/md";

const SettingsPanel: React.FC = () => {
    const { selectedNodeId } = useFlowContext();
    const { getNodes, setNodes } = useReactFlow();

    const node = getNodes().find((n) => n.id === selectedNodeId);

    if (!node) return <p className="p-4">Select a node to edit settings</p>;

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const updatedNodes = getNodes().map((n) =>
            n.id === selectedNodeId ? { ...n, data: { ...n.data, label: e.target.value } } : n
        );
        setNodes(updatedNodes);
    };

    return (
        <div className="w-full h-full flex flex-col justify-start">

            <div className="w-full p-3 relative border-b border-outline">
                <p className="font-semibold text-center">Message</p>
                <MdArrowBack className="absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>

            <div className="w-full p-3 border-b border-outline">
                <p className="text-sm text-gray-500">{node.type}</p>
                <textarea
                    value={typeof node.data.label === "string" ? node.data.label : ""}
                    onChange={(e) => onChange(e)}
                    placeholder="Type your message here..."
                    className="w-full p-2 border border-outline rounded"  
                />
            </div>
        </div>
    );
};

export default SettingsPanel;
