import { CSSProperties } from "react";
import { INode, NodeTypeEnum } from "../interfaces/Node";
export type IParsedNode = {
  id: string;
  name: string;
  value?: string;
  childIds: string[];
  style: CSSProperties;
  type: NodeTypeEnum;
  parentId?: string;
}

export type INodeComponent = Omit<IParsedNode, 'childIds'> & {
  children: INodeComponent[];
}

export type IParsedNodeRecord = Record<string, IParsedNode>

// Parse component, to make it's easier to update
export const parseComponent = (
  components: INode[],
  parentId?: string
): IParsedNodeRecord => {
  return components.reduce((acc, component) => {
    const {
      children = [],
      id,
      name,
      value,
      type,
      x,
      y,
      ...remainStyle
    } = component;
    acc[component.id] = {
      style: {
        left: x,
        top: y,
        ...remainStyle
      },
      type,
      id,
      name,
      value,
      parentId,
      childIds: children.map((child) => child.id)
    };
    if (children.length) {
      return { ...acc, ...parseComponent(children, component.id) };
    }
    return acc;
  }, {} as IParsedNodeRecord);
}

export const deparseComponent = (
  components: IParsedNodeRecord,
  rootChildIds: string[]
): INodeComponent[] => {
  return rootChildIds.map((childId) => {
    const { childIds, ...remain } = components[childId];
    return {
      ...remain,
      children: deparseComponent(components, childIds)
    } as INodeComponent
  })
}
