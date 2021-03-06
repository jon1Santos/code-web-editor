import './add-cell.css';
import { useActions } from '../hooks/use-actions';

interface AddCellProps {
    previousCellId: string | null;
    forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ previousCellId, forceVisible }) =>{
    const { insertCellAfter } = useActions();

    return (
        <div className={`add-cell ${forceVisible && 'force-cell'}`}>
            <div className="add-buttons">
                <button className="button is-rounded is-primary is-small" onClick={()=> insertCellAfter(previousCellId, 'code')}>
                    <span className="icon is-small">
                    <i className="fas fa-plus" />
                    </span>
                    <span>Code</span>
                </button>
                <div className="cell-divider"></div>
            </div>
        </div>
    );
};

export default AddCell;