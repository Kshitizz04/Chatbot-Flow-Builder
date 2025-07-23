import React from "react";
import { FlowProvider } from "./context/FlowContext";
import MainPage from "./components/MainPage";
import { ReactFlowProvider } from "@xyflow/react";

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

