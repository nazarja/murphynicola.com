import * as actionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_DATA:
            return { ...state, ...action.payload };
        case actionTypes.UPDATE_ABOUT:
            return { ...state, about: action.payload };
        case actionTypes.UPDATE_LANDING:
            return { ...state, landing: action.payload };
            case actionTypes.UPDATE_PROJECT:
                return { ...state, projects: action.payload };
        case actionTypes.DELETE_PROJECT:
            return { ...state, projects: action.payload };
        default:
            return state;
    };
};

