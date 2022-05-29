import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import { persistMiddleware } from './middlewares/persist-middleware';
import { ActionType } from './action-types';

export const store = createStore(reducers, applyMiddleware(persistMiddleware, reduxThunk));

const contentCell1: string = `
    import React from 'react';
    import ReactDOM from 'react-dom';

    const useMe = 'I was declared above';

    const App = () => {
        return (
            <h2 style={{color: '#6f4da5'}}>You can write some code, import some libraries, add some function like below, and use some features which were declared in code editors above</h2>
        );
    };

    ReactDOM.render(<App />, document.querySelector('#root'));
`;

const contentCell2: string = `
    show(<div><h1>Hi, i am a function and i was created before all the app had been rendered!</h1><br /><h2>{useMe}</h2></div>);
`;

store.dispatch({
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
        id: '1',
        type: 'code'
    },
},);


store.dispatch({
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
        id: '2',
        type: 'code'
    },
});

store.dispatch({
    type: ActionType.UPDATE_CELL,
    payload: {
        id: store.getState().cells?.order[0] as string,
        content: contentCell1.trim()
    },
},);


store.dispatch({
    type: ActionType.UPDATE_CELL,
    payload: {
        id: store.getState().cells?.order[1] as string,
        content: contentCell2.trim()
    },
});
