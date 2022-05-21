import { useActions } from '../hooks/use-actions';
import Button from './Button';
import './action-bars.css';

interface ActionBarsProps {
    id: string
}

const ActionBars: React.FC<ActionBarsProps> = ({ id }) => {
    const { moveCell, deleteCell } = useActions();
    return (
        <div className="action-bars">
                <Button onClick={()=>moveCell(id, 'up')} nameClass="fa-arrow-up"></Button>
                <Button onClick={()=>moveCell(id, 'down')} nameClass="fa-arrow-down"></Button>
                <Button onClick={()=>deleteCell(id)} nameClass="fa-times"></Button>
        </div>
    );
};

export default ActionBars;