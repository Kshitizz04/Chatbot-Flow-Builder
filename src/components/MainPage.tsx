import React from "react";
import NodesPanel from "./NodesPanel";
import Canvas from "./Canvas";
import SettingsPanel from "./SettingsPanel";
import { useFlowContext } from "../context/FlowContext";
import { useReactFlow } from "@xyflow/react";

const MainPage: React.FC = () => {
    const { selectedNodeId } = useFlowContext();
    const { getNodes, getEdges } = useReactFlow();

    const handleSave = () => {
        const nodes = getNodes();
        const edges = getEdges();

        // Find nodes with no incoming edge (empty target handle)
        const nodesWithNoTarget = nodes.filter(node =>
            !edges.some(edge => edge.target === node.id)
        );

        if (nodes.length > 1 && nodesWithNoTarget.length > 1) {
            alert("Error: More than one node has empty target handles!");
            return;
        }
        alert("Flow saved!");
    };

    return (
        <div className="flex flex-col h-screen w-screen">
            <div className="flex justify-end items-center p-4 bg-gray-200">
                <div className="flex w-full items-center justify-center">
                    <div className="bg-red-500 text-white p-2 rounded-md">
                        Alert
                    </div>
                </div>
                <div className="w-96 flex items-center justify-center">
                    <button
                        className="p-2 bg-blue-500 text-white rounded-md"
                        onClick={handleSave}
                    >
                        Save Flow
                    </button>
                </div>
            </div>

            <div className="flex flex-1">
                <div className="flex-1">
                    <Canvas />
                </div>
                <div className="w-1/4">
                    {selectedNodeId ? <SettingsPanel /> : <NodesPanel />}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
