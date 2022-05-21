import { ActionType } from '../action-types';
import { Action } from '../actions';
import produce from 'immer';

interface BundleState{
    [key: string]:{
        loading: boolean,
        err: string,
        code: string
    }
}

const initialState: BundleState = {}

export const reducer = produce((state: BundleState = initialState, action: Action): BundleState=>{
    switch(action.type){
        case ActionType.START_BUNDLE_CELL:
            state[action.payload.cellId] = {
                loading: true,
                err: '',
                code: ''
            }
            return state
        case ActionType.COMPLETE_BUNDLE_CELL:
            state[action.payload.cellId] = {
                loading: false,
                err: action.payload.bundle.err,
                code: action.payload.bundle.code
            }
            return state
        default:
            return state
    }
});

export default reducer;