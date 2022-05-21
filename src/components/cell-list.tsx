import './cell-list.css';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { Cell } from '../state';
import CellListItem from './cell-list-item';
import AddCell from './add-cell';
import { Fragment, useEffect } from 'react';
import { useActions } from '../hooks/use-actions';

const CellList = ()=>{
    const cellList = useTypedSelector((cellReducer)=> {
        if(typeof cellReducer.cells !== 'undefined'){ 
            const { data, order } = cellReducer.cells
            return order.map(id=> data[id])
        }
    })

    const { fetchCells } = useActions();

    useEffect(() => {
        fetchCells();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderCells = (cellList as Cell[]).map(cell => (
        <Fragment key={cell.id}>
            <CellListItem cell={cell} />
            <AddCell previousCellId={cell.id} />
        </Fragment>
    ));

    return (
        <div className="cell-list">
            <AddCell forceVisible={renderCells.length < 1 ? true : false} previousCellId={null} />
            {renderCells}
        </div>
    );
};

export default CellList;