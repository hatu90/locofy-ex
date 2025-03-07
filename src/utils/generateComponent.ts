import { NodeTypeEnum } from "../interfaces/Node";
import { IParsedNode } from "./parseComponents";

export const generateComponent = (
  nodeType: NodeTypeEnum,
  id: string,
  parentId?: string
) => ({
  id: id.toString(),
  name: `${nodeType}-${id}`,
  type: nodeType,
  childIds: [] as string[],
  value: nodeType,
  style: {},
  parentId
} as IParsedNode)
