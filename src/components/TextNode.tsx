import { Handle, Position } from "@xyflow/react";

interface TextNodeProps {
    data: { label: string };
}

const TextNode = ({ data }: TextNodeProps) => {
    return (
        <div className="w-96 h-28 bg-gray-100 border border-gray-300 rounded-md p-4 flex flex-col relative">
            <Handle
                type="target"
                position={Position.Left}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={true}
                className="w-5 h-5 bg-blue-500 rounded-full absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2"
            />
            <div className="w-full rounded-t-md bg-gray-200 p-2 text-center">
                Send Message
            </div>
            <textarea
                className="w-full flex-1 border-none focus:ring-none focus:outline-none resize-none"
                placeholder="Type your message here..."
                value={data.label}
                onChange={(e) => console.log('Text changed:', e.target.value)}
            />
            <Handle
                type="source"
                position={Position.Right}
                isConnectable={true}
                className="w-5 h-5 bg-green-500 rounded-full absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2"
            />
        </div>
    );
};

export default TextNode;