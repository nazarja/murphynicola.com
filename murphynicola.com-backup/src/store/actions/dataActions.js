import * as actionTypes from './actionTypes';
import * as firebase from '../../services/firebaseService';

export const getAllData = () => {
    return async dispatch => {
        const response = await firebase.getAll();
        dispatch({
            type: actionTypes.GET_ALL_DATA,
            payload: response
        });
    };
};

export const updateAbout = data => {
    return async dispatch => {
        const response = await firebase.updateAbout(data);
        dispatch({
            type: actionTypes.UPDATE_ABOUT,
            payload: response
        });
    };
};

export const updateLanding = data => {
    return async dispatch => {
        const response = await firebase.updateLanding(data);
        dispatch({
            type: actionTypes.UPDATE_LANDING,
            payload: response
        });
    };
};

export const updateProject = (item, data, index) => {
    return async dispatch => {
        const response = await firebase.updateProject(item, data, index);
        dispatch({
            type: actionTypes.UPDATE_PROJECT,
            payload: response
        });
    };
};

export const deleteProject = (data, folder) => {
    return async dispatch => {
        const response = await firebase.deleteProject(data, folder);
        dispatch({
            type: actionTypes.DELETE_PROJECT,
            payload: response
        });
    };
};
