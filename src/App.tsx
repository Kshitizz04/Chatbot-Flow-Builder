import React from "react";
import { FlowProvider } from "./context/FlowContext";

const App: React.FC = () => {
	return (
		<FlowProvider>
			<h1 className="text-center text-2xl font-bold my-4">Chatbot Flow Builder</h1>
		</FlowProvider>
	);
};

export default App;

