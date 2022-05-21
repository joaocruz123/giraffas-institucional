import { mapFetchEvidenceResponse, mapFetchHighlightsResponse } from "../mappers/ui";

export const actionTypes = {
    GET_GROUPS_HIGHLIGHTS: 'GET_GROUPS_HIGHLIGHTS',
    GET_FEED_HIGHLIGHTS: 'GET_FEED_HIGHLIGHTS',
    SET_NEW_OPEN_HOURS: 'SET_NEW_OPEN_HOURS'
}

export const fetchGroupsHighlights = () => async (dispatch, getState, api) => {
    let result = {}
    try {
        const url =`Grupos/Listar?tipoGrupo=1&tipoPlataforma=3`;
        const apiResponse = await api.get(url, {});
       
        const response = mapFetchHighlightsResponse(apiResponse.data);
        result = {
            success: true,
            data: response
        }
        dispatch({
            type: actionTypes.GET_GROUPS_HIGHLIGHTS,
            payload: response
        })
    } catch (e) {
        result = {
            error: e.message
        }
    }
    return result;
}


export const fetchFeedHighlights = () => async (dispatch, getState, api) => {
    let result = {}
    try {
        const url =`destaques/listar?tipoPlataforma=3`;
        const apiResponse = await api.get(url, {});
       
        const response = mapFetchEvidenceResponse(apiResponse.data);
        result = {
            success: true,
            data: response
        }
        dispatch({
            type: actionTypes.GET_FEED_HIGHLIGHTS,
            payload: response
        })
    } catch (e) {
        result = {
            error: e.message
        }
    }
    return result;
}