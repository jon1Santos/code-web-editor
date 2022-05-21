import './code-cell.css';
import { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './Preview';
import Resizable from './Resizable-box'
import { useActions } from '../hooks/use-actions';
import { Cell } from '../state';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { useCumulativeCode } from '../hooks/use-cumulative-code';

interface CodeCellProps {
    cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell })=>{
    const { updateCell, createBundle } = useActions();
    const bundle = useTypedSelector((data)=> {
        if(typeof data.bundle !== 'undefined'){
            return data.bundle[cell.id]
        }
    })
    const cumulativeCode = useCumulativeCode(cell.id) as string;

    useEffect(()=>{
        if(!bundle){
            createBundle(cell.id, cumulativeCode);
            return
        }

        const timer = setTimeout(async ()=>{
            createBundle(cell.id, cumulativeCode);
        },750);

        return ()=> clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[cumulativeCode, createBundle, cell.id]);

    return (
        <Resizable direction="vertical">
            <div className="soft-apparition" style={{height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row'}}>
                <Resizable direction="horizontal">   
                    <CodeEditor cell={cell} onInputChange={updateCell} />                     
                </Resizable>
                    <div className="conditional-wrapper">
                        {
                            !bundle 
                            ? (<div className="conditional"></div>) 
                            : (<Preview code={bundle.code} err={bundle.err} />)
                        }
                    </div>   

            </div>
        </Resizable>
    );
    
}

export default CodeCell;