import { NodeComponent } from "./components/NodeComponent"
import { INode, NodeTypeEnum } from "./interfaces/Node"

function App() {
  const node = {
    type: NodeTypeEnum.Button,
    value: "Test",
    border: "1px solid grey",
    x: 0,
    y: 200,
    children: [
      {
        type: NodeTypeEnum.Div,
        value: "Test",
        border: "1px solid grey",
        x: 50,
        y: 200,
      }
    ]
  } as INode

  return (
    <div>
      <NodeComponent {...node} />
    </div>
  )
}

export default App
