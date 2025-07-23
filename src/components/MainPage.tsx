import React from "react";
import NodesPanel from "./NodesPanel";
import SettingsPanel from "./SettingsPanel";
import { useFlowContext } from "../context/FlowContext";
import Canvas from "./Canvas";

const MainPage = () => {
    const { selectedNodeId } = useFlowContext();

    return (
        <div className="flex h-[90vh]">
            {selectedNodeId ? <SettingsPanel /> : <NodesPanel />}
            <div className="flex-1 relative">
                <Canvas />
            </div>
        </div>
    );
};

export default MainPage;
