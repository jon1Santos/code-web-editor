import { ActionType } from '../action-types';
import { CellType, Cell } from '../cell';

export type Direction = 'up' | 'down'

export interface MoveCell {
    type: ActionType.MOVE_CELL;
    payload: {
        id: string;
        direction: Direction;
    }
}

export interface DeleteCell{
    type: ActionType.DELETE_CELL;
    payload: string;
}

export interface InsertCellAfter{
    type: ActionType.INSERT_CELL_AFTER;
    payload: {
        id: string | null;
        type: CellType
    }
}

export interface UpdateCell{
    type: ActionType.UPDATE_CELL;
    payload:{
        id: string;
        content: string;
    }
}

export interface StartBundleCell{
    type: ActionType.START_BUNDLE_CELL,
    payload: {
        cellId: string;
    }
}

export interface CompleteBundleCell{
    type: ActionType.COMPLETE_BUNDLE_CELL,
    payload: {
        cellId: string,
        bundle: {
            code: string,
            err: string
        }
    }
}

export interface FetchCells{
    type: ActionType.FETCH_CELLS;
}

export interface FetchCellsComplete{
    type: ActionType.FETCH_CELLS_COMPLETE;
    payload: Cell[]
}

export interface FetchCellsError{
    type: ActionType.FETCH_CELLS_ERROR;
    payload: string
}

export interface SaveCellsError{
    type: ActionType.SAVE_CELLS_ERROR;
    payload: string
}

export type Action = 
    MoveCell
    | DeleteCell
    | InsertCellAfter
    | UpdateCell
    | StartBundleCell
    | CompleteBundleCell
    | FetchCells
    | FetchCellsComplete
    | FetchCellsError
    | SaveCellsError;
