import { NodeComponent } from './nodeContainer';

export const APIFetchNode = ({ id, data }) => {
  const handles = [
    { type: "target", position: "left", id: `${id}-urlInput`, top: 33 },
    { type: "source", position: "right", id: `${id}-apiResponse` },
  ];

  const additionalContent = (
    <div>
      <input
        type="text"
        placeholder="Enter API URL"
        style={{
          width: "100%",
          padding: "5px",
          marginTop: "10px",
        }}
      />
    </div>
  );

  return (
    <NodeComponent
      id={id}
      type="APIFetch"
      isInput={false}
      handles={handles}
      additionalContent={additionalContent}
    />
  );
};
