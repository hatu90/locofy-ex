import { NodeTypeEnum } from "../../interfaces/Node";
import { INodeComponent } from "../../utils/parseComponents";

import "./NodeComponent.css";

type NodeComponentProps = {
  node: INodeComponent;
  onClick: (nodeId: string) => void;
  selectedId: string | null;
};

export function NodeComponent(props: NodeComponentProps) {
  const { onClick, selectedId, node } = props;
  const { name, value, style: initialStyle, type, children = [], id } = node;

  const highlightStyle = {
    border: "2px solid red",
  };

  const isSelected = selectedId === node.id;

  const handleClick: React.EventHandler<React.MouseEvent> = (e) => {
    e.stopPropagation();
    onClick(node.id);
  };

  const isHighlighted = isSelected;

  const style = isHighlighted
    ? { ...initialStyle, ...highlightStyle }
    : initialStyle;

  switch (type) {
    case NodeTypeEnum.Div:
      return (
        <div
          className="component"
          style={style}
          onClick={handleClick}
          id={id}
        >
          {name}
          {children.map((child) => (
            <NodeComponent
              key={child.id}
              node={child}
              onClick={onClick}
              selectedId={selectedId}
            />
          ))}
        </div>
      );

    case NodeTypeEnum.Button:
      return (
        <button
          className="component"
          style={style}
          onClick={handleClick}
          id={id}
        >
          {name}
          {children.map((child) => (
            <NodeComponent
              node={child}
              key={child.id}
              onClick={onClick}
              selectedId={selectedId}
            />
          ))}
        </button>
      );

    case NodeTypeEnum.Image:
      return (
        <img
          className="component"
          onClick={handleClick}
          style={style}
          alt={name}
          id={id}
          src={value}
        />
      );

    case NodeTypeEnum.Input:
      return (
        <input
          className="component"
          value={value}
          name={name}
          style={style}
          onClick={handleClick}
          id={id}
          readOnly
        />
      );

    default:
      return null;
  }
}
