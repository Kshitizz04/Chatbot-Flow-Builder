import React from "react";
import { FlowProvider } from "./context/FlowContext";
import MainPage from "./components/MainPage";
import { ReactFlowProvider } from "@xyflow/react";

const App: React.FC = () => {
	return (
		<ReactFlowProvider>
			<FlowProvider>
				<h1 className="text-center text-2xl font-bold my-4">Chatbot Flow Builder</h1>
				<MainPage/>
			</FlowProvider>
		</ReactFlowProvider>
	);
};

export default App;

