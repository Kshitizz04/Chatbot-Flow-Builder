import React, { useEffect, useState } from "react";
import { useFlowContext } from "../context/FlowContext";
import { useReactFlow, type Node } from "@xyflow/react";
import { MdArrowBack, MdDelete } from "react-icons/md";

const SettingsPanel: React.FC = () => {
    const { selectedNodeId, setSelectedNodeId } = useFlowContext();
    const [dataValue, setDataValue] = useState("");
    const { getNodes, setNodes, getEdges, setEdges } = useReactFlow();
    let node: Node | null = getNodes().find((n) => n.id === selectedNodeId) || null;

    useEffect(()=>{
        const currentNode = getNodes().find((n) => n.id === selectedNodeId);
        if (currentNode) {
            setDataValue(currentNode.data.label as string);
            node = currentNode;
        }
    }, [selectedNodeId]);

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDataValue(e.target.value);
        setNodes(nds =>
            nds.map(n =>
                n.id === selectedNodeId
                    ? { ...n, data: { ...n.data, label: e.target.value } }
                    : n
            )
        );
    };

    const onBack = () => {
        setSelectedNodeId(null);
    };

    const onDelete = () => {
        setNodes(getNodes().filter(n => n.id !== selectedNodeId));
        setEdges(getEdges().filter(e => e.source !== selectedNodeId && e.target !== selectedNodeId));
        setSelectedNodeId(null);
    };

    return (
        <div className="w-full h-full flex flex-col justify-start">

            <div className="w-full p-3 relative border-b border-outline">
                <p className="font-semibold text-center">Message</p>
                <button
                    onClick={onBack}
                    className="cursor-pointer absolute left-3 top-1/2 transform -translate-y-1/2"
                >
                    <MdArrowBack />
                </button>
            </div>

            <div className="w-full p-3 border-b border-outline">
                <p className="text-sm text-gray-500 mb-2">{node?.type}</p>
                <textarea
                    value={dataValue as string}
                    onChange={(e) => onChange(e)}
                    placeholder="Type your message here..."
                    className="w-full p-2 border border-outline rounded scrollbar-none"  
                />
            </div>

            <div className="w-full p-3 mt-auto">
                <button
                    onClick={onDelete}
                    className="cursor-pointer w-full flex items-center justify-center gap-2 py-2 px-4 border border-on-error bg-error text-on-error rounded"
                >
                    <MdDelete />
                    Delete Node
                </button>
            </div>
        </div>
    );
};

export default SettingsPanel;
