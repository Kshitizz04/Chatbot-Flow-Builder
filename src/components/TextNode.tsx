import { Handle, Position } from "@xyflow/react";

interface TextNodeProps {
    data: { label: string };
}

const TextNode = ({ data }: TextNodeProps) => {
    return (
        <div className="w-96 h-28 bg-gray-100 border border-gray-300 rounded-md p-4 flex flex-col">
            <Handle
                type="target"
                position={Position.Left}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={true}
            />
            <div className="w-full rounded-t-md bg-gray-200 p-2 text-center">
                Send Message
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto">
                <p>{data.label}</p>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                isConnectable={true}
            />
        </div>
    );
};

export default TextNode;