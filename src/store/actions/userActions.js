import * as actionTypes from './actionTypes';

export const setUser = user => {
    return {
        type: actionTypes.SET_USER,
        payload: {
            user: user
        }
    };
};

export const clearUser = () => {
    return {
        type: actionTypes.CLEAR_USER,
        payload: {
            user: null
        }
    };
};

export const setAdminPage = page => {
    return {
        type: actionTypes.SET_ADMIN_PAGE,
        payload: {
            page
        }
    };
};
