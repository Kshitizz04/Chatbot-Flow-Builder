import React, { useCallback, useEffect, useRef, useState } from "react";
import NodesPanel from "./NodesPanel";
import Canvas from "./Canvas";
import SettingsPanel from "./SettingsPanel";
import { useFlowContext } from "../context/FlowContext";
import { useReactFlow, type ReactFlowInstance } from "@xyflow/react";

/**
 -  This is the main layout for the Chatbot Flow Builder app.
 -  Displays the top bar with a Save button and status messages.
 -  Renders the flow builder canvas and the side panel (NodesPanel or SettingsPanel).
 -  Handles validation for saving the flow, displays error or success messages.
 */

 // key used to store the flow in localStorage
 const FLOW_KEY = "saved-flow";

const MainPage: React.FC = () => {
    const { selectedNodeId } = useFlowContext();
    const { getNodes, getEdges, setNodes, setEdges, setViewport } = useReactFlow();
    const [saveStatus, setSaveStatus] = useState<null | "error" | "success">(null);
    const [saveSuccessMessage, setSaveSuccessMessage] = useState("");
    const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
    // I wanted to render the restore button only if there is a saved flow in localStorage
    const [hasSavedFlow, setHasSavedFlow] = useState(false);

    // timeout ref only used for cleanup purposes
    const timeoutRef = useRef<number | null>(null);

    // Reference: https://reactflow.dev/examples/interaction/save-and-restore
    const handleSave = useCallback(() => {
        const nodes = getNodes();
        const edges = getEdges();

        // Find nodes with no incoming edge (empty target handle)
        const nodesWithNoTarget = nodes.filter(node =>
            !edges.some(edge => edge.target === node.id)
        );

        // Feature 7 a. display error if there are more than one Nodes and more than one Node has empty target handles
        if (nodes.length > 1 && nodesWithNoTarget.length > 1) {
            setSaveSuccessMessage("Cannot Save Flow");
            setSaveStatus("error");
        }else{
            if (rfInstance) {
                const flow = rfInstance.toObject();
                localStorage.setItem(FLOW_KEY, JSON.stringify(flow));
                setHasSavedFlow(true);
                setSaveSuccessMessage("Flow saved successfully!");
                setSaveStatus("success");
            } else {
                setSaveSuccessMessage("Flow instance not available");
                setSaveStatus("error");
            }
        }

        // error feedback is conditionally displayed based on the saveStatus, we need to reset it to make is disappear after a few seconds
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setSaveStatus(null);
            setSaveSuccessMessage("");
        }, 3000);
    },[rfInstance]);

    // Restore function
    const onRestore = useCallback(() => {
        const flowStr = localStorage.getItem(FLOW_KEY);
        if(!flowStr){
            setSaveSuccessMessage("No saved flow found");
            setSaveStatus("error");
            return;
        } 
        const restoreFlow = async () => {
            const flow = JSON.parse(flowStr);
        
            if (flow) {
                const { x = 0, y = 0, zoom = 1 } = flow.viewport;
                setNodes(flow.nodes || []);
                setEdges(flow.edges || []);
                setViewport({ x, y, zoom });
            }
        };
    
        restoreFlow();

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setSaveStatus(null);
            setSaveSuccessMessage("");
        }, 3000);
    }, [setNodes, setViewport]);

    // Timeout cleanup and check for saved flow in local storage
    useEffect(() => {
        setHasSavedFlow(!!localStorage.getItem(FLOW_KEY));
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <div className="flex flex-col h-screen w-screen bg-surface">

            {/* Top bar with Save button and status messages */}
            <div className="flex justify-end items-center py-4 bg-container text-on-container font-bold">
                <div className="flex flex-1 items-center justify-center">
                    {saveStatus && (
                        <div className={`text-on-error py-2 px-4 rounded-md ${saveStatus=== "error" ? "bg-error" : "bg-green-300"}`}>
                            {saveSuccessMessage}
                        </div>
                    )}
                </div>
                <div className="w-1/4 flex gap-2 items-center justify-center">
                    <button
                        className="py-2 px-4 border border-accent text-accent rounded-md"
                        onClick={handleSave}
                    >
                        Save Changes
                    </button>

                    {hasSavedFlow && (
                        <button
                            className="py-2 px-4 border border-accent text-accent rounded-md"
                            onClick={onRestore}
                        >
                            Restore Flow
                        </button>)
                    }
                </div>
            </div>

            {/* canvas and side panel */}
            <div className="flex flex-1">
                <div className="flex-1">
                    <Canvas onInit={setRfInstance} />
                </div>
                <div className="w-1/4 border border-outline">
                    {selectedNodeId ? <SettingsPanel /> : <NodesPanel />}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
