import React, { useState } from "react";
import NodesPanel from "./NodesPanel";
import Canvas from "./Canvas";
import SettingsPanel from "./SettingsPanel";
import { useFlowContext } from "../context/FlowContext";
import { useReactFlow } from "@xyflow/react";

const MainPage: React.FC = () => {
    const { selectedNodeId } = useFlowContext();
    const { getNodes, getEdges } = useReactFlow();
    const [saveStatus, setSaveStatus] = useState<null | "error" | "success">(null);
    const [saveSuccessMessage, setSaveSuccessMessage] = useState("");

    const handleSave = () => {
        const nodes = getNodes();
        const edges = getEdges();

        const nodesWithNoTarget = nodes.filter(node =>
            !edges.some(edge => edge.target === node.id)
        );

        if (nodes.length > 1 && nodesWithNoTarget.length > 1) {
            setSaveSuccessMessage("Cannot Save Flow");
            setSaveStatus("error");
        }else{
            setSaveSuccessMessage("Flow saved successfully!");
            setSaveStatus("success");
        }
        setTimeout(() => {
            setSaveStatus(null);
            setSaveSuccessMessage("");
        }, 3000);
    };

    return (
        <div className="flex flex-col h-screen w-screen bg-surface">
            <div className="flex justify-end items-center py-4 bg-container text-on-container font-bold">
                <div className="flex flex-1 items-center justify-center">
                    {saveStatus && (
                        <div className={`text-on-error py-2 px-4 rounded-md ${saveStatus=== "error" ? "bg-error" : "bg-green-300"}`}>
                            {saveSuccessMessage}
                        </div>
                    )}
                </div>
                <div className="w-1/4 flex items-center justify-center">
                    <button
                        className="py-2 px-4 border border-accent text-accent rounded-md"
                        onClick={handleSave}
                    >
                        Save Changes
                    </button>
                </div>
            </div>

            <div className="flex flex-1">
                <div className="flex-1">
                    <Canvas />
                </div>
                <div className="w-1/4 border border-outline">
                    {selectedNodeId ? <SettingsPanel /> : <NodesPanel />}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
