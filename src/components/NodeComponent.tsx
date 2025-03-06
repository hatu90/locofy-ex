import { useState } from "react";
import { INode, NodeTypeEnum } from "../interfaces/Node";

export function NodeComponent(props: INode) {
  const { name, value, x, y, type, children = [], ...remain } = props;
  const initialStyle = {
    position: "fixed",
    outline: "none",
    top: y,
    left: x,
    ...remain
  } as React.CSSProperties;

  const highlightStyle = {
    border: "2px solid red"
  }

  const [isSelected, setIsSelected] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnter: React.EventHandler<React.MouseEvent> = (e) => {
    e.stopPropagation();
    setIsHovered(true);
  }

  const onMouseLeave: React.EventHandler<React.MouseEvent> = (e) => {
    e.stopPropagation();
    setIsHovered(false);
  }

  const onClick: React.EventHandler<React.MouseEvent> = (e) => {
    e.stopPropagation();
    setIsSelected((v) => !v);
  }

  const isHighlighted = isSelected || isHovered;

  const style = isHighlighted ? { ...initialStyle, ...highlightStyle } : initialStyle;

  switch (type) {
    case NodeTypeEnum.Div:
      return (
        <div
          style={style}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
        >
          {value}
          {
            children.map((child) => <NodeComponent {...child} />)
          }
        </div>
      )

    case NodeTypeEnum.Button:
      return (
        <button
          style={style}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
        >
          {value}
          {
            children.map((child) => <NodeComponent {...child} key={child.id} />)
          }
        </button>
      )

    case NodeTypeEnum.Image:
      return (
        <img
          width={remain.width}
          height={remain.height}
          style={style}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          alt={name}
        />
      )

    case NodeTypeEnum.Input:
      return (
        <input
          value={value}
          name={name}
          style={style}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      )

    default:
      return null;
  }

}