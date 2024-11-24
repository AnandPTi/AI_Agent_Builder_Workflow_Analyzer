import { NodeComponent } from './nodeContainer';

export const TranslatorNode = ({ id, data }) => {
  const handles = [
    { type: "target", position: "left", id: `${id}-textInput`, top: 33 },
    { type: "source", position: "right", id: `${id}-translatedText` },
  ];

  const additionalContent = (
    <div>
      <span>Select Target Language</span>
      <select style={{ width: "100%", padding: "5px", marginTop: "10px" }}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
      </select>
    </div>
  );

  return (
    <NodeComponent
      id={id}
      type="Translator"
      isInput={false}
      handles={handles}
      additionalContent={additionalContent}
    />
  );
};
