import { Handle, Position } from "@xyflow/react";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { RiWhatsappFill } from "react-icons/ri";

interface TextNodeProps {
    data: { label: string };
}

const TextNode = ({ data }: TextNodeProps) => {
    return (
        <div className="w-64 h-24 bg-gray-100 shadow-md shadow-outline rounded-md flex flex-col">
            <Handle
                type="target"
                position={Position.Left}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={true}
                style={{ width: 10, height: 10, border: '2px solid #ffffff' }}
            />
            <div className="w-full flex justify-between items-center rounded-t-md bg-tertiary text-on-tertiary p-2 text-center">
                <div className="flex items-center gap-2">
                    <BiMessageRoundedDetail className="text-lg" />
                    <p className="font-semibold text-sm">Send Message</p>
                </div>
                <RiWhatsappFill className="text-lg bg-white p-1 rounded-full aspect-square text-green-500" />
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto p-2">
                <p className="text-xs">{data.label}</p>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                style={{ width: 10, height: 10, border: '2px solid #ffffff' }}
            />
        </div>
    );
};

export default TextNode;