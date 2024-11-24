import { NodeComponent } from './nodeContainer';

export const IDENode = ({ id, data }) => {
  const handles = [
    { type: "target", position: "left", id: `${id}-codeInput`, top: 33 },
    { type: "source", position: "right", id: `${id}-output` },
  ];

  const additionalContent = (
    <div>
      <textarea
        placeholder="Write JavaScript code here"
        style={{
          width: "100%",
          height: "80px",
          marginTop: "10px",
          fontFamily: "monospace",
        }}
      />
    </div>
  );

  return (
    <NodeComponent
      id={id}
      type="IDE"
      isInput={false}
      handles={handles}
      additionalContent={additionalContent}
    />
  );
};
