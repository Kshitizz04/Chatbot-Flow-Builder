// since the app is small, ill just use context API instead of redux/zustand or other state management libraries
import React, { createContext, useContext, useState, type ReactNode } from 'react';

// Only Id of the selected node needs to be centralized for now
// This can be extended later if more state management is needed
interface FlowContextProps {
	selectedNodeId: string | null;
	setSelectedNodeId: (id: string | null) => void;
}

const FlowContext = createContext<FlowContextProps | undefined>(undefined);

export const FlowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

	return (
		<FlowContext.Provider value={{ selectedNodeId, setSelectedNodeId }}>
			{children}
		</FlowContext.Provider>
	);
};

export const useFlowContext = () => {
	const context = useContext(FlowContext);
	if (!context) throw new Error("useFlowContext must be used inside FlowProvider");
	return context;
};