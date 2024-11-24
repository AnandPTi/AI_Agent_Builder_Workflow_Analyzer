import { NodeComponent } from './nodeContainer';

export const CalculatorNode = ({ id, data }) => {
  const handles = [
    { type: "target", position: "left", id: `${id}-input1`, top: 33 },
    { type: "target", position: "left", id: `${id}-input2`, top: 67 },
    { type: "source", position: "right", id: `${id}-result` },
  ];

  const additionalContent = (
    <div>
      <span>Performs arithmetic operations</span>
      <form style={{ marginTop: "10px" }}>
        <select style={{ width: "100%", padding: "5px" }}>
          <option value="add">Addition</option>
          <option value="subtract">Subtraction</option>
          <option value="multiply">Multiplication</option>
          <option value="divide">Division</option>
        </select>
      </form>
    </div>
  );

  return (
    <NodeComponent
      id={id}
      type="Calculator"
      isInput={false}
      handles={handles}
      additionalContent={additionalContent}
    />
  );
};
