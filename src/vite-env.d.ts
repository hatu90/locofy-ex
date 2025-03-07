/// <reference types="vite/client" />
declare module 'react-style-editor' {
  export interface StyleEditorProps {
    value?: string;
    onChange: (value: string) => void;
  }

  const StyleEditor: React.FC<StyleEditorProps>;

  export default StyleEditor;
}
