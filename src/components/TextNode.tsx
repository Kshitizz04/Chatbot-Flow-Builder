import { Handle, Position } from "@xyflow/react";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { RiWhatsappFill } from "react-icons/ri";
import { useFlowContext } from "../context/FlowContext";

interface TextNodeProps {
    data: { label: string };
    id?: string;
}

const TextNode = ({ data, id }: TextNodeProps) => {
    const { selectedNodeId } = useFlowContext();
    const isSelected = id === selectedNodeId;
    return (
        <div className={`w-64 h-24 bg-gray-100 shadow-md shadow-outline rounded-md flex flex-col ${isSelected ? 'border border-accent' : ''}`}>
            <Handle
                type="target"
                position={Position.Left}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={true}
                style={{ width: 10, height: 10, border: '2px solid #ffffff', backgroundColor: isSelected ? 'var(--color-accent)' : '' }}
            />
            <div className="w-full flex justify-between items-center rounded-t-md bg-tertiary text-on-tertiary p-2 text-center">
                <div className="flex items-center gap-2">
                    <BiMessageRoundedDetail className="text-md" />
                    <p className="font-semibold text-sm">Send Message</p>
                </div>
                <RiWhatsappFill className="text-lg bg-white p-[2px] rounded-full aspect-square text-green-500" />
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-2 w-full">
                <p className="text-xs break-words">{data.label}</p>
            </div>
            <Handle
                type="source"
                position={Position.Right}
                style={{ width: 10, height: 10, border: '2px solid #ffffff', backgroundColor: isSelected ? 'var(--color-accent)' : '' }}
            />
        </div>
    );
};

export default TextNode;