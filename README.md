# Chatbot Flow Builder

**Repo:** [https://github.com/Kshitizz04/Chatbot-Flow-Builder](https://github.com/Kshitizz04/Chatbot-Flow-Builder)  
**Live Demo:** [https://chatbot-flow-builder-orpin.vercel.app/](https://chatbot-flow-builder-orpin.vercel.app/)

A simple extensible chatbot flow builder built with React, TypeScript, and [React Flow](https://reactflow.dev/).

## Packages Used

- [React Flow](https://reactflow.dev/) — interactive flow builder
- [Tailwind CSS](https://tailwindcss.com/) — utility-first CSS framework for styling
- [React Icons](https://react-icons.github.io/react-icons/) — icon library for UI elements

## Features

- Drag and drop nodes to build your chatbot flow.
- Only one type of node supported currently ("Message"), but easily extensible.
- Connect nodes with edges.
- Source handles allow only one outgoing edge.
- Target handles allow multiple incoming edges.
- Settings panel to edit node content.
- Save button validates the flow and shows error/success messages.

## Architecture

- **App Structure:**  
  The app uses React functional components and Context API for state management.  
  - `App.tsx`: Root component, sets up providers.
  - `MainPage.tsx`: Layout and main logic, including save validation and panel switching.
  - `Canvas.tsx`: Renders the flow builder using React Flow, manages nodes and edges.
  - `NodesPanel.tsx`: Displays available node types for drag-and-drop, easily extensible via a config array.
  - `SettingsPanel.tsx`: Allows editing of selected node's content and node deletion.
  - `FlowContext.tsx`: Centralizes the selected node state.
  - `reactflowNodeTypes.ts`: Maps node type strings to React components for extensibility.

- **Extending Node Types:**  
  To add new node types, update the `NODE_TYPES` array in `src/components/NodesPanel.tsx` and add the corresponding React component to `src/types/reactflowNodeTypes.ts`.

- **Styling:**  
  Tailwind CSS is used for rapid UI development and theming.  
  Custom colors and themes are defined in `index.css`.

## Getting Started

```bash
npm install
npm run dev
```

---
