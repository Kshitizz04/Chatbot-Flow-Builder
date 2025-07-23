// since the app is small, ill just use context API instead of redux/zustand or other state management libraries
import React, { createContext, useContext, useState, type ReactNode } from 'react';

// Only Id of the selected node needs to be centralized for now, as other things like coordinates are needed only in the canvas component
// This can be extended later if more state management is needed
interface FlowContextProps {
	selectedNodeId: string;
	setSelectedNodeId: (id: string) => void;
}

const FlowContext = createContext<FlowContextProps | undefined>(undefined);

export const FlowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [selectedNodeId, setSelectedNodeId] = useState<string>('default-id');

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