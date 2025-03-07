import StyleEditor from 'react-style-editor';

type InspectToolProps = {
  name: string;
  value: string;
  onChange: (value: string) => void;
}

export function InspectTool(props: InspectToolProps) {
  return (
    <StyleEditor value={props.value} onChange={props.onChange} />
  )
}
