import * as actionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return { ...state, user: action.payload.user }
        case actionTypes.CLEAR_USER:
            return { ...state }
        case actionTypes.SET_ADMIN_PAGE:
            return { ...state, page: action.payload }
        default:
            return state;
    };
};