import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import { persistMiddleware } from './middlewares/persist-middleware';

export const store = createStore(reducers, applyMiddleware(persistMiddleware, reduxThunk))