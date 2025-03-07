import { CSSProperties, useEffect, useState } from "react";
import toStyle from "css-to-style";
import { stringifyCSSProperties } from "react-style-stringify";

import { NodeComponent } from "./components/NodeComponent/NodeComponent";
import { INode, NodeTypeEnum } from "./interfaces/Node";
import { InspectTool } from "./components/InspectTool";
import {
  IParsedNodeRecord,
  deparseComponent,
  parseComponent,
} from "./utils/parseComponents";
import { AddButton } from "./components/ToolBar/AddButton/AddButton";
import { generateComponent } from "./utils/generateComponent";
import { ValueTool } from "./components/ValueTool";
import { extractCSS } from "./utils/extractCss";

import "./App.css";

let startId = 1;

const initialNodes = [
  {
    id: "1",
    name: "Div-1",
    type: NodeTypeEnum.Div,
    value: "Test",
    x: 0,
    y: 200,
  },
] as INode[];

function App() {
  const [parsedComponents, setParsedComponents] = useState<IParsedNodeRecord>(
    parseComponent(initialNodes)
  );

  const [rootChildIds, setRootChildIds] = useState(
    initialNodes.map((node) => node.id)
  );

  const [toolOpen, setToolOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );

  const [inspectValue, setInspectValue] = useState("");

  const components = deparseComponent(parsedComponents, rootChildIds);

  const onSelectComponent = (nodeId: string) => {
    setSelectedComponent((prev) => {
      if (prev === nodeId) {
        return null;
      }
      return nodeId;
    });
  };

  const handleAdd = (nodeType: NodeTypeEnum) => {
    startId += 1;
    const nodeId = startId.toString();
    if (selectedComponent) {
      setParsedComponents({
        ...parsedComponents,
        [nodeId]: generateComponent(nodeType, nodeId, selectedComponent),
        [selectedComponent]: {
          ...parsedComponents[selectedComponent],
          childIds: parsedComponents[selectedComponent].childIds.concat(nodeId),
        },
      });
    } else {
      setParsedComponents({
        ...parsedComponents,
        [nodeId]: generateComponent(nodeType, nodeId),
      });
      setRootChildIds((prev) => prev.concat(nodeId));
    }
  };

  const handleRemove = () => {
    setToolOpen(false);
    if (!selectedComponent) {
      return;
    }
    const { parentId, id } = parsedComponents[selectedComponent];
    if (parentId) {
      const parent = parsedComponents[parentId];
      const newParent = {
        ...parent,
        childIds: parent.childIds.filter((childId) => childId !== id),
      };
      setParsedComponents({
        ...parsedComponents,
        [parentId]: newParent,
      });
    } else {
      setRootChildIds((prev) => prev.filter((childId) => childId !== id));
    }
    setSelectedComponent(null);
  };

  const onInspect = () => {
    setToolOpen((prev) => !prev);
  };

  const inspectingComponent = selectedComponent
    ? parsedComponents[selectedComponent]
    : null;

  const initialSpectValue =
    toolOpen && inspectingComponent
      ? `#${inspectingComponent.name} {
        ${stringifyCSSProperties(inspectingComponent.style)}
      }`
      : "";

  useEffect(() => {
    setInspectValue(initialSpectValue);
  }, [initialSpectValue]);

  const handleInspectChanged = (inspectValue: string) => {
    if (selectedComponent) {
      setParsedComponents({
        ...parsedComponents,
        [selectedComponent]: {
          ...parsedComponents[selectedComponent],
          style: toStyle(extractCSS(inspectValue)) as CSSProperties,
        },
      });
    }
  };

  const handleValueChange = (value?: string) => {
    if (selectedComponent) {
      setParsedComponents({
        ...parsedComponents,
        [selectedComponent]: {
          ...parsedComponents[selectedComponent],
          value,
        },
      });
    }
  };

  const isAddEnable =
    !selectedComponent ||
    [NodeTypeEnum.Button, NodeTypeEnum.Div].includes(
      parsedComponents[selectedComponent].type
    );

  const isRemoveEnable = !!selectedComponent;

  useEffect(() => {
    if (!selectedComponent) {
      setToolOpen(false);
    }
  }, [selectedComponent]);

  return (
    <main>
      <div id="preview">
        <div className="toolbar">
          <button onClick={onInspect}>Inspect</button>
          {isRemoveEnable && <button onClick={handleRemove}>Remove</button>}
          {isAddEnable && (
            <AddButton onClick={handleAdd} key={selectedComponent} />
          )}
        </div>
        {components.map((component) => (
          <NodeComponent
            node={component}
            key={component.id}
            onClick={onSelectComponent}
            selectedId={selectedComponent}
          />
        ))}
      </div>
      {toolOpen && selectedComponent && (
        <div id="inspect-tool">
          <InspectTool
            value={inspectValue}
            name="test"
            onChange={handleInspectChanged}
          />
          <ValueTool
            value={inspectingComponent?.value}
            onChange={handleValueChange}
          />
        </div>
      )}
    </main>
  );
}

export default App;
