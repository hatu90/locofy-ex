import { useState } from "react";

import "./AddButton.css";
import { NodeTypeEnum } from "../../../interfaces/Node";

const NODE_TYPES = [
  NodeTypeEnum.Div,
  NodeTypeEnum.Image,
  NodeTypeEnum.Button,
  NodeTypeEnum.Input,
];

type AddButtonProps = {
  onClick: (nodeType: NodeTypeEnum) => void;
};

export function AddButton({ onClick }: AddButtonProps) {
  const [showAddMenu, setShowAddMenu] = useState(false);

  return (
    <div className="addButton">
      <button onClick={() => setShowAddMenu(!showAddMenu)}>Add</button>
      {showAddMenu && (
        <div className="addButton">
          {NODE_TYPES.map((nodeType) => (
            <button onClick={() => onClick(nodeType)} key={nodeType}>
              {nodeType}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
