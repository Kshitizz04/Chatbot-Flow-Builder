// since the app is small, ill just use context API instead of redux/zustand or other state management libraries
import React, { createContext, useContext, useState, type ReactNode } from 'react';

// placeholder context for setup
interface FlowContextProps {
    something: string;
    setSomething: React.Dispatch<React.SetStateAction<string>>;
}

const FlowContext = createContext<FlowContextProps | undefined>(undefined);

export const FlowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [something, setSomething] = useState<string>('default value');

  return (
    <FlowContext.Provider value={{ something, setSomething }}>
      {children}
    </FlowContext.Provider>
  );
};