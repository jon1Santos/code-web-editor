import './code-editor.css';
import { useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { Cell } from '../state';
import { editor } from 'monaco-editor';


interface CodeEditorProps{
    onInputChange: (id: string, content: string) => void;
    cell: Cell;
    
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onInputChange, cell })=>{
    const editorRef = useRef<any>();
    const codeEditorOptions: editor.IStandaloneEditorConstructionOptions =  {
        wordWrap: 'on',
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
    }
    const onClick = ()=>{
        const unformatted = editorRef.current.getModel().getValue();

        const formatted = prettier.format(unformatted, {
            parser: 'babel',
            plugins: [parser],
            useTabs: false,
            semi: true,
            singleQuote: true,
        }).replace(/\n$/, '');

        editorRef.current.setValue(formatted);
    };

    return (
        <div className="editor-wrapper">
            <button className="button button-format is-primary is-small" onClick={onClick}>Format</button>
            <MonacoEditor
            onChange={(e)=> {
                if(typeof e === 'string') onInputChange(cell.id , e)
            }}
            onMount={(monacoEditor)=> {
                monacoEditor.updateOptions(codeEditorOptions)
                editorRef.current = monacoEditor
                // onInputChange(cell.id, cell.content)
            }}
            value={cell.content}
            language="javascript"
            height="100%"
            theme="vs-dark"
            loading={<div style={{background: 'black'}}></div>}/>
        </div>
    );
};

export default CodeEditor;