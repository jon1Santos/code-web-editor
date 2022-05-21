import { MoveCell, DeleteCell, UpdateCell, InsertCellAfter, Direction, Action } from '../actions';
import { Dispatch } from 'redux'
import { ActionType } from '../action-types';
import { CellType } from '../cell';
import bundle from '../../bundler';
import axios from 'axios';
import { RootState } from '../reducers';

export const moveCell = (id: string, direction: Direction ): MoveCell =>{
    return {
        type: ActionType.MOVE_CELL,
        payload: {
            id,
            direction
        }
    }
};

export const deleteCell = (id: string): DeleteCell =>{
    return {
        type: ActionType.DELETE_CELL,
        payload: id
    }
};

export const updateCell = (id: string, content: string): UpdateCell =>{
    return {
        type: ActionType.UPDATE_CELL,
        payload: {
            id,
            content
        }
    }
};

export const insertCellAfter = (id: string | null, type: CellType): InsertCellAfter =>{
    return {
        type: ActionType.INSERT_CELL_AFTER,
        payload: {
            id,
            type
        }
    }
};

export const createBundle = (cellId: string, rawCode: string) => async (dispatch: Dispatch<Action>) => {
    dispatch({
        type: ActionType.START_BUNDLE_CELL,
        payload: {
            cellId,
        }
    })

    const result = await bundle(rawCode);

    dispatch({
        type: ActionType.COMPLETE_BUNDLE_CELL,
        payload: {
            cellId,
            bundle: result
        }
    })
};

export const fetchCells = () => async (dispatch: Dispatch<Action>) => {
    dispatch({
        type: ActionType.FETCH_CELLS
    })
    
    try{
        const { data } = await axios.get('/cells');

        dispatch({
            type: ActionType.FETCH_CELLS_COMPLETE,
            payload: JSON.parse(data)
        })
    }catch(err){
        dispatch({
            type: ActionType.FETCH_CELLS_ERROR,
            payload: (err as Error).message
        })
    }
};

export const saveCells = () => async (dispatch: Dispatch<Action>, getState: () => RootState ) => {
    const state = getState();
    if(typeof state.cells !== 'undefined'){
        const { cells: { data, order} } = state;

        const cells = order.map(id => data[id]);

        try{
            await axios.post('/cells', { cells });
        }catch(err){
            dispatch({
                type: ActionType.SAVE_CELLS_ERROR,
                payload: (err as Error).message
            })
        }
    }
};

