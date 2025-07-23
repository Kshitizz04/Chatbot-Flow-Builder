import React from "react";
import { Handle, Position } from "@xyflow/react";

interface TextNodeProps {
  data: { label: string };
}

const TextNode: React.FC<TextNodeProps> = ({ data }) => {
  return (
    <div className="bg-gray-100 border border-gray-400 rounded-md p-2 min-w-[150px]">
      <p>{data.label}</p>
      <Handle type="source" position={Position.Right} id="source" />
      <Handle type="target" position={Position.Left} id="target" />
    </div>
  );
};

export default TextNode;