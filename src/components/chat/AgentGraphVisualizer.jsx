import React from "react";
import ReactFlow, {
  Background,
  Controls,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

const AgentGraphVisualizer = ({ loading }) => {
  const nodes = [
    {
      id: "1",
      position: { x: 50, y: 120 },
      data: { label: "👤 User Query" },
      style: nodeStyle("#3B82F6", loading),
    },
    {
      id: "2",
      position: { x: 270, y: 120 },
      data: { label: "🧠 Router Agent\n110ms" },
      style: nodeStyle("#8B5CF6", loading),
    },
    {
      id: "3",
      position: { x: 540, y: 20 },
      data: { label: "🎓 Education\n240ms" },
      style: nodeStyle("#10B981", loading),
    },
    {
      id: "4",
      position: { x: 540, y: 120 },
      data: { label: "🌾 Agriculture\n210ms" },
      style: nodeStyle("#F59E0B", loading),
    },
    {
      id: "5",
      position: { x: 540, y: 220 },
      data: { label: "🏥 Healthcare\n190ms" },
      style: nodeStyle("#EF4444", loading),
    },
    {
      id: "6",
      position: { x: 800, y: 120 },
      data: { label: "📋 Response Aggregator\n95ms" },
      style: nodeStyle("#06B6D4", loading),
    },
  ];

  const edges = [
    edge("e1", "1", "2"),
    edge("e2", "2", "3"),
    edge("e3", "2", "4"),
    edge("e4", "2", "5"),
    edge("e5", "3", "6"),
    edge("e6", "4", "6"),
    edge("e7", "5", "6"),
  ];

  return (
    <div
      style={{
        width: "100%",
        height: 320,
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        nodesDraggable={false}
        nodesConnectable={false}
        zoomOnScroll={false}
        panOnDrag={false}
      >
        <Background />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
};

const nodeStyle = (color, loading) => ({
  background: color,
  color: "#fff",
  borderRadius: 12,
  padding: 10,
  width: 170,
  textAlign: "center",
  fontWeight: 600,
  border: loading ? "3px solid #fff" : "2px solid transparent",
  boxShadow: loading
    ? `0 0 18px ${color}`
    : "0 0 8px rgba(0,0,0,0.3)",
  whiteSpace: "pre-line",
});

const edge = (id, source, target) => ({
  id,
  source,
  target,
  animated: true,
  markerEnd: {
    type: MarkerType.ArrowClosed,
  },
});

export default AgentGraphVisualizer;