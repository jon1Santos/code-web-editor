import { Cell } from '../state';
import CodeCell from './code-cell';
import ActionBars from './action-bars';
import './cell-list-item.css';

interface CellListItemProps {
    cell: Cell
}

const CellListItem: React.FC<CellListItemProps> = ({cell})=>{
    let state;
    if(cell.type === "code")
        state = <>
            <div className="action-bar-wrapper">
                <ActionBars id={cell.id} />
            </div>
            <CodeCell cell={cell}/>
        </>

    return (
        <div className="cell-list-item">
            {state}
        </div>
    );
};

export default CellListItem;