import { NodeComponent } from './nodeContainer';

export const DataVisualizerNode = ({ id, data }) => {
  const handles = [
    { type: "target", position: "left", id: `${id}-dataInput`, top: 50 },
    { type: "source", position: "right", id: `${id}-visualization` },
  ];

  const additionalContent = (
    <div>
      <span>Select Visualization Type</span>
      <select style={{ width: "100%", padding: "5px", marginTop: "10px" }}>
        <option value="bar">Bar Chart</option>
        <option value="pie">Pie Chart</option>
      </select>
    </div>
  );

  return (
    <NodeComponent
      id={id}
      type="DataVisualizer"
      isInput={false}
      handles={handles}
      additionalContent={additionalContent}
    />
  );
};
