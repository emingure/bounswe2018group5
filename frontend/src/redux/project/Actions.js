import {
    GET_PROJECTS_REQUEST,
    GET_PROJECTS_SUCCESS,
    GET_PROJECTS_FAILURE,
    GET_PROJECTS_RESET,
    GET_RECOMMENDED_PROJECTS_REQUEST,
    GET_RECOMMENDED_PROJECTS_SUCCESS,
    GET_RECOMMENDED_PROJECTS_FAILURE,
    GET_RECOMMENDED_PROJECTS_RESET,
    SEARCH_PROJECTS_REQUEST,
    SEARCH_PROJECTS_SUCCESS,
    SEARCH_PROJECTS_FAILURE,
    SEARCH_PROJECTS_RESET,
    GET_PROJECT_REQUEST,
    GET_PROJECT_SUCCESS,
    GET_PROJECT_FAILURE,
    GET_PROJECT_RESET,
    GET_OWN_PROJECTS_REQUEST,
    GET_OWN_PROJECTS_SUCCESS,
    GET_OWN_PROJECTS_FAILURE,
    GET_OWN_PROJECTS_RESET,
    CREATE_PROJECT_FAILURE,
    CREATE_PROJECT_REQUEST,
    CREATE_PROJECT_RESET,
    CREATE_PROJECT_SUCCESS,
    EDIT_PROJECT_FAILURE,
    EDIT_PROJECT_REQUEST,
    EDIT_PROJECT_RESET,
    EDIT_PROJECT_SUCCESS,
    DELETE_PROJECT_FAILURE,
    DELETE_PROJECT_REQUEST,
    DELETE_PROJECT_RESET,
    DELETE_PROJECT_SUCCESS,
    DISCARD_PROJECT_FAILURE,
    DISCARD_PROJECT_REQUEST,
    DISCARD_PROJECT_RESET,
    DISCARD_PROJECT_SUCCESS,
    FINISH_PROJECT_FAILURE,
    FINISH_PROJECT_REQUEST,
    FINISH_PROJECT_RESET,
    FINISH_PROJECT_SUCCESS,
    RATE_PROJECT_FAILURE,
    RATE_PROJECT_REQUEST,
    RATE_PROJECT_RESET,
    RATE_PROJECT_SUCCESS,
    CREATE_BID_FAILURE,
    CREATE_BID_REQUEST,
    CREATE_BID_RESET,
    CREATE_BID_SUCCESS,
    DISCARD_BID_FAILURE,
    DISCARD_BID_REQUEST,
    DISCARD_BID_RESET,
    DISCARD_BID_SUCCESS,
    ACCEPT_BID_FAILURE,
    ACCEPT_BID_REQUEST,
    ACCEPT_BID_RESET,
    ACCEPT_BID_SUCCESS,
    GET_TAG_REQUEST,
    GET_TAG_SUCCESS,
    GET_TAG_FAILURE,
    GET_TAG_RESET,
    CREATE_ANNOTATION_FAILURE,
    CREATE_ANNOTATION_REQUEST,
    CREATE_ANNOTATION_RESET,
    CREATE_ANNOTATION_SUCCESS,
    GET_ANNOTATIONS_FAILURE,
    GET_ANNOTATIONS_REQUEST,
    GET_ANNOTATIONS_RESET,
    GET_ANNOTATIONS_SUCCESS,
} from "./actionTypes";

export const tryGetProjects = () => ({
    type: GET_PROJECTS_REQUEST,
    payload: {}
});
export const getProjectsSuccess = res => ({
    type: GET_PROJECTS_SUCCESS,
    payload: res
});
export const getProjectsFailure = errorData => ({
    type: GET_PROJECTS_FAILURE,
    payload: errorData
});
export const getProjectsReset = () => ({
    type: GET_PROJECTS_RESET
});

export const tryGetRecommendedProjects = (user_id) => ({
    type: GET_RECOMMENDED_PROJECTS_REQUEST,
    payload: {
        user_id
    }
});
export const getRecommendedProjectsSuccess = res => ({
    type: GET_RECOMMENDED_PROJECTS_SUCCESS,
    payload: res
});
export const getRecommendedProjectsFailure = errorData => ({
    type: GET_RECOMMENDED_PROJECTS_FAILURE,
    payload: errorData
});
export const getRecommendedProjectsReset = () => ({
    type: GET_RECOMMENDED_PROJECTS_RESET
});

export const trySearchProjects = (query) => ({
    type: SEARCH_PROJECTS_REQUEST,
    payload: {
        query
    }
});
export const searchProjectsSuccess = res => ({
    type: SEARCH_PROJECTS_SUCCESS,
    payload: res
});
export const searchProjectsFailure = errorData => ({
    type: SEARCH_PROJECTS_FAILURE,
    payload: errorData
});
export const searchProjectsReset = () => ({
    type: SEARCH_PROJECTS_RESET
});


export const tryGetProject = (project_id) => ({
    type: GET_PROJECT_REQUEST,
    payload: {
        project_id
    }
});
export const getProjectSuccess = res => ({
    type: GET_PROJECT_SUCCESS,
    payload: res
});
export const getProjectFailure = errorData => ({
    type: GET_PROJECT_FAILURE,
    payload: errorData
});
export const getProjectReset = () => ({
    type: GET_PROJECT_RESET
});

export const tryGetOwnProjects = () => ({
    type: GET_OWN_PROJECTS_REQUEST,
    payload: {}
});
export const getOwnProjectsSuccess = res => ({
    type: GET_OWN_PROJECTS_SUCCESS,
    payload: res
});
export const getOwnProjectsFailure = errorData => ({
    type: GET_OWN_PROJECTS_FAILURE,
    payload: errorData
});
export const getOwnProjectsReset = () => ({
    type: GET_OWN_PROJECTS_RESET
});

export const tryCreateProject = (title, description, project_deadline, budget, milestones, tags) => ({
    type: CREATE_PROJECT_REQUEST,
    payload: {
        title,
        description,
        project_deadline,
        budget,
        milestones,
        tags
    }
});
export const createProjectSuccess = res => ({
    type: CREATE_PROJECT_SUCCESS,
    payload: res
});
export const createProjectFailure = errorData => ({
    type: CREATE_PROJECT_FAILURE,
    payload: errorData
});
export const createProjectReset = () => ({
    type: CREATE_PROJECT_RESET
});

export const tryEditProject = (project_id, description, milestones, title, budget) => ({
    type: EDIT_PROJECT_REQUEST,
    payload: {
        project_id,
        description,
        milestones,
        title,
        budget
    }
});
export const editProjectSuccess = res => ({
    type: EDIT_PROJECT_SUCCESS,
    payload: res
});
export const editProjectFailure = errorData => ({
    type: EDIT_PROJECT_FAILURE,
    payload: errorData
});
export const editProjectReset = () => ({
    type: EDIT_PROJECT_RESET
});

export const tryDiscardProject = (project_id) => ({
    type: DISCARD_PROJECT_REQUEST,
    payload: {
        project_id
    }
});
export const discardProjectSuccess = res => ({
    type: DISCARD_PROJECT_SUCCESS,
    payload: res
});
export const discardProjectFailure = errorData => ({
    type: DISCARD_PROJECT_FAILURE,
    payload: errorData
});
export const discardProjectReset = () => ({
    type: DISCARD_PROJECT_RESET
});

export const tryFinishProject = (project_id) => ({
    type: FINISH_PROJECT_REQUEST,
    payload: {
        project_id
    }
});
export const finishProjectSuccess = res => ({
    type: FINISH_PROJECT_SUCCESS,
    payload: res
});
export const finishProjectFailure = errorData => ({
    type: FINISH_PROJECT_FAILURE,
    payload: errorData
});
export const finishProjectReset = () => ({
    type: FINISH_PROJECT_RESET
});

export const tryRateProject = (project_id, comment, value) => ({
    type: RATE_PROJECT_REQUEST,
    payload: {
        project_id,
        comment,
        value
    }
});
export const rateProjectSuccess = res => ({
    type: RATE_PROJECT_SUCCESS,
    payload: res
});
export const rateProjectFailure = errorData => ({
    type: RATE_PROJECT_FAILURE,
    payload: errorData
});
export const rateProjectReset = () => ({
    type: RATE_PROJECT_RESET
});

export const tryDeleteProject = (project_id) => ({
    type: DELETE_PROJECT_REQUEST,
    payload: {
        project_id
    }
});
export const deleteProjectSuccess = res => ({
    type: DELETE_PROJECT_SUCCESS,
    payload: res
});
export const deleteProjectFailure = errorData => ({
    type: DELETE_PROJECT_FAILURE,
    payload: errorData
});
export const deleteProjectReset = () => ({
    type: DELETE_PROJECT_RESET
});

export const tryCreateBid = (project_id, freelancer_id, offer, note) => ({
    type: CREATE_BID_REQUEST,
    payload: {
        project_id,
        freelancer_id,
        offer,
        note
    }
});
export const createBidSuccess = res => ({
    type: CREATE_BID_SUCCESS,
    payload: res
});
export const createBidFailure = errorData => ({
    type: CREATE_BID_FAILURE,
    payload: errorData
});
export const createBidReset = () => ({
    type: CREATE_BID_RESET
});

export const tryAcceptBid = (bid_id) => ({
    type: ACCEPT_BID_REQUEST,
    payload: {
        bid_id
    }
});
export const acceptBidSuccess = res => ({
    type: ACCEPT_BID_SUCCESS,
    payload: res
});
export const acceptBidFailure = errorData => ({
    type: ACCEPT_BID_FAILURE,
    payload: errorData
});
export const acceptBidReset = () => ({
    type: ACCEPT_BID_RESET
});

export const tryDiscardBid = (bid_id) => ({
    type: DISCARD_BID_REQUEST,
    payload: {
        bid_id
    }
});
export const discardBidSuccess = res => ({
    type: DISCARD_BID_SUCCESS,
    payload: res
});
export const discardBidFailure = errorData => ({
    type: DISCARD_BID_FAILURE,
    payload: errorData
});
export const discardBidReset = () => ({
    type: DISCARD_BID_RESET
});

export const tryGetTag = (tags) => ({
    type: GET_TAG_REQUEST,
    payload: {
        tags
    }
});
export const getTagSuccess = res => ({
    type: GET_TAG_SUCCESS,
    payload: res
});
export const getTagFailure = errorData => ({
    type: GET_TAG_FAILURE,
    payload: errorData
});
export const getTagReset = () => ({
    type: GET_TAG_RESET
});

export const tryCreateAnnotation = (url, motivation, targets, body) => ({
    type: CREATE_ANNOTATION_REQUEST,
    payload: {
        url,
        motivation,
        targets,
        body
    }
});
export const createAnnotationSuccess = res => ({
    type: CREATE_ANNOTATION_SUCCESS,
    payload: res
});
export const createAnnotationFailure = errorData => ({
    type: CREATE_ANNOTATION_FAILURE,
    payload: errorData
});
export const createAnnotationReset = () => ({
    type: CREATE_ANNOTATION_RESET
});


export const tryGetAnnotations = (url) => ({
    type: GET_ANNOTATIONS_REQUEST,
    payload: {
        url
    }
});
export const getAnnotationsSuccess = res => ({
    type: GET_ANNOTATIONS_SUCCESS,
    payload: res
});
export const getAnnotationsFailure = errorData => ({
    type: GET_ANNOTATIONS_FAILURE,
    payload: errorData
});
export const getAnnotationsReset = () => ({
    type: GET_ANNOTATIONS_RESET
});
