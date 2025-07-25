import React from "react";
import { FlowProvider } from "./context/FlowContext";
import MainPage from "./components/MainPage";
import { ReactFlowProvider } from "@xyflow/react";

/**
 - 	Wrapping with ReactFlowProvider here we need flow's internal states outside the ReactFlow component as well.
 	For example, in the SettingsPanel on Nodes Panel.
 - Wrapping with FlowProvider which is a custom context provider to manage the selected node state.
 - Renders the MainPage component, which contains the main UI and logic.
 */

const App: React.FC = () => {
	return (
		<ReactFlowProvider>
			<FlowProvider>
				<MainPage/>
			</FlowProvider>
		</ReactFlowProvider>
	);
};

export default App;

