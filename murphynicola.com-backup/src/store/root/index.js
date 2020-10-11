import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import dataReducer from '../reducers/dataReducer';
import userReducer from '../reducers/userReducer';

const reducers = combineReducers({
    data: dataReducer,
    user: userReducer
});

export default createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk)),
);