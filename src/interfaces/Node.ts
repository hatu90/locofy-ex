export enum NodeTypeEnum {
  Div = "Div",
  Input = "Input",
  Image = "Image",
  Button = "Button"
}

export type INode = {
  id: string;
  x: number;
  y: number;
  name: string;
  type: NodeTypeEnum;
  width: number;
  height: number;
  display?: string;
  value?: string;
  backgroundColor?: string;
  color?: string;
  border?: string;
  children: INode[]
}