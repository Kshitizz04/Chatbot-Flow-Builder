import React from "react";
import { useFlowContext } from "../context/FlowContext";
import { useReactFlow } from "@xyflow/react";

const SettingsPanel: React.FC = () => {
    const { selectedNodeId } = useFlowContext();
    const { getNodes, setNodes } = useReactFlow();

    const node = getNodes().find((n) => n.id === selectedNodeId);

    if (!node) return <p className="p-4">Select a node to edit settings</p>;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedNodes = getNodes().map((n) =>
            n.id === selectedNodeId ? { ...n, data: { ...n.data, label: e.target.value } } : n
        );
        setNodes(updatedNodes);
    };

    return (
        <div className="p-4 border-r border-gray-300">
            <h3 className="font-bold mb-2">Settings</h3>
            <input
                type="text"
                value={typeof node.data.label === "string" ? node.data.label : ""}
                onChange={onChange}
                placeholder="Enter text"
                className="w-full p-2 border rounded"
            />
        </div>
    );
};

export default SettingsPanel;
