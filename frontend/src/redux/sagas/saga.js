import {call, put, takeLatest} from "redux-saga/effects";

import {LOGIN_REQUEST, LOGOUT_REQUEST, REGISTER_REQUEST} from "../auth/actionTypes";
import {
    CHANGE_PASSWORD_REQUEST, 
    GET_PROFILE_REQUEST, 
    GET_USER_PROFILE_REQUEST, 
    UPDATE_PROFILE_REQUEST,
    GET_PORTFOLIO_REQUEST,
    POST_PORTFOLIO_REQUEST,
    PUT_PORTFOLIO_REQUEST,
    DELETE_PORTFOLIO_REQUEST,
    PUT_WALLET_REQUEST,
    GET_CONVERSATIONS_REQUEST,
    GET_CONVERSATION_REQUEST,
    SEND_MESSAGE_REQUEST,
    GET_RECOMMENDED_USERS_REQUEST, 
} from "../user/actionTypes";
import { 
    CREATE_PROJECT_REQUEST, 
    EDIT_PROJECT_REQUEST, 
    DISCARD_PROJECT_REQUEST, 
    FINISH_PROJECT_REQUEST, 
    GET_PROJECTS_REQUEST, 
    GET_RECOMMENDED_PROJECTS_REQUEST, 
    SEARCH_PROJECTS_REQUEST, 
    GET_PROJECT_REQUEST, 
    GET_TAG_REQUEST, 
    DELETE_PROJECT_REQUEST, 
    GET_OWN_PROJECTS_REQUEST,
    CREATE_BID_REQUEST,
    ACCEPT_BID_REQUEST,
    DISCARD_BID_REQUEST, 
    RATE_PROJECT_REQUEST,
    CREATE_ANNOTATION_REQUEST, 
    GET_ANNOTATIONS_REQUEST, 
} from "../project/actionTypes";
import {
    getProjectsFailure, 
    getProjectsSuccess,
    getRecommendedProjectsFailure,
    getRecommendedProjectsSuccess,
    searchProjectsFailure,
    searchProjectsSuccess,
    getProjectFailure,
    getProjectSuccess, 
    createProjectSuccess, 
    createProjectFailure,
    editProjectSuccess,
    editProjectFailure,
    discardProjectSuccess,
    discardProjectFailure,
    finishProjectSuccess,
    finishProjectFailure,
    rateProjectSuccess,
    rateProjectFailure,
    deleteProjectSuccess,
    deleteProjectFailure,
    getOwnProjectsFailure, 
    getOwnProjectsSuccess,
    createBidSuccess,
    createBidFailure,
    acceptBidSuccess,
    acceptBidFailure,
    discardBidSuccess,
    discardBidFailure,
    getTagFailure,
    getTagSuccess, 
    createAnnotationSuccess,
    createAnnotationFailure,
    getAnnotationsSuccess,
    getAnnotationsFailure,
} from "../project/Actions";
import {loginSuccess, loginFailure, registerFailure, registerSuccess} from "../auth/Actions";
import {
    profileSuccess,
    profileFailure,
    userProfileSuccess,
    userProfileFailure,
    changePasswordSuccess,
    changePasswordFailure,
    updateProfileFailure,
    updateProfileSuccess,
    getPortfolioFailure,
    getPortfolioSuccess,
    postPortfolioSuccess,
    postPortfolioFailure,
    putPortfolioSuccess,
    putPortfolioFailure,
    deletePortfolioFailure,
    deletePortfolioSuccess,
    putWalletSuccess,
    putWalletFailure,
    conversationsFailure,
    conversationsSuccess,
    conversationFailure,
    conversationSuccess,
    sendMessageFailure,
    sendMessageSuccess,
    getRecommendedUsersFailure,
    getRecommendedUsersSuccess,
} from "../user/Actions";


import api from "./api";

const tryLoginSaga = function* (action) {
    const {username, password} = action.payload;

    try {
        const loginResponse = yield call(api.doLogin, username, password);

        if (loginResponse) {
            console.log("​loginResponse", loginResponse);

            if (loginResponse.status === 200) {
                yield put(loginSuccess(loginResponse.responseBody));
            } else if (loginResponse.status === 400) {
                console.log("Something wrong! Got a status 400", loginResponse.responseBody);
                yield put(loginFailure(loginResponse.responseBody));
            } else {
                console.log("Something wrong! Got an unknown status.", loginResponse);
                yield put(loginFailure({detail: ["Unknown status. Check console!"]}));
            }
        } else {
            console.log("Login failed by api. No response !");
            yield put(loginFailure({detail: ["No response fetched. Please contact the API team!"]}));
        }
    } catch (err) {
        console.log("Login failed by api. Error => ", err);
        yield put(loginFailure({detail: [err.detail]}));
    }
};

const tryRegisterSaga = function* (action) {
    const {username, email, password, full_name} = action.payload;

    try {
        const registerResponse = yield call(api.doRegister, username, email, password, full_name);

        if (registerResponse) {
            console.log("registerResponse", registerResponse);

            if (registerResponse.status === 200) {
                yield put(registerSuccess(registerResponse.responseBody));
            } else if (registerResponse.status === 400) {
                console.log("Something wrong! Got a status 400", registerResponse.responseBody);
                yield put(registerFailure(registerResponse.responseBody));
            } else {
                console.log("Something wrong! Got an unknown status.", registerResponse);
                yield put(registerFailure({detail: ["Unknown status. Check console!"]}));
            }
        } else {
            console.log("Register failed by api. No response !");
            yield put(registerFailure({detail: ["No response fetched. Please contact the API team!"]}));
        }
    } catch (err) {
        console.log("Register failed by api. Error => ", err);
        yield put(registerFailure({detail: [err.detail]}));
    }
};

const tryLogout = function* () {
    try {
        const logoutResponse = yield call(api.doLogout);

        if (logoutResponse) {
            console.log("logoutResponse", logoutResponse);
        } else {
            console.log("Logout failed by api. No response !");
        }
    } catch (err) {
        console.log("Logout failed by api. Error => ", err);
    }
};

const tryGetProfileSaga = function* () {
    try {
        const getProfileResponse = yield call(api.getProfile);

        if (getProfileResponse) {
            console.log("getProfileResponse", getProfileResponse);

            if (getProfileResponse.status === 200) {
                yield put(profileSuccess(getProfileResponse.responseBody));
            } else if (getProfileResponse.status === 400) {
                console.log("Something wrong! Got a status 400", getProfileResponse.responseBody);
                yield put(profileFailure(getProfileResponse.responseBody));
            } else {
                console.log("Something wrong! Got an unknown status.", getProfileResponse);
                yield put(profileFailure({detail: ["Unknown status. Check console!"]}));
            }
        } else {
            console.log("Get Profile failed by api. No response !");
            yield put(profileFailure({detail: ["No response fetched. Please contact the API team!"]}));
        }
    } catch (err) {
        console.log("Get Profile failed by api. Error => ", err);
        yield put(profileFailure({detail: [err.detail]}));
    }
};

const tryGetUserProfileSaga = function* (action) {
    try {
        const {user_id} = action.payload;

        const getUserProfileResponse = yield call(api.getUserProfile, user_id);

        if (getUserProfileResponse) {
            console.log("getUserProfileResponse", getUserProfileResponse);

            if (getUserProfileResponse.status === 200) {
                yield put(userProfileSuccess(getUserProfileResponse.responseBody));
            } else if (getUserProfileResponse.status === 400) {
                console.log("Something wrong! Got a status 400", getUserProfileResponse.responseBody);
                yield put(userProfileFailure(getUserProfileResponse.responseBody));
            } else {
                console.log("Something wrong! Got an unknown status.", getUserProfileResponse);
                yield put(userProfileFailure({ detail: ["Unknown status. Check console!"] }));
            }
        } else {
            console.log("Get Profile failed by api. No response !");
            yield put(userProfileFailure({ detail: ["No response fetched. Please contact the API team!"] }));
        }
    } catch (err) {
        console.log("Get Profile failed by api. Error => ", err);
        yield put(userProfileFailure({ detail: [err.detail] }));
    }
};

const tryUpdateProfileSaga = function* (action) {
    try {
        const {full_name, gender, bio, type} = action.payload;

        const updateProfileResponse = yield call(api.updateProfile, full_name, gender, bio, type);

        if (updateProfileResponse) {
            console.log("updateProfileResponse", updateProfileResponse);

            if (updateProfileResponse.status === 200) {
                yield put(updateProfileSuccess(updateProfileResponse.responseBody));
            } else if (updateProfileResponse.status === 400) {
                console.log("Something wrong! Got a status 400", updateProfileResponse.responseBody);
                yield put(updateProfileFailure(updateProfileResponse.responseBody));
            } else {
                console.log("Something wrong! Got an unknown status.", updateProfileResponse);
                yield put(updateProfileFailure({detail: ["Unknown status. Check console!"]}));
            }
        } else {
            console.log("Update Profile failed by api. No response !");
            yield put(updateProfileFailure({detail: ["No response fetched. Please contact the API team!"]}));
        }
    } catch (err) {
        console.log("Update Profile failed by api. Error => ", err);
        yield put(updateProfileFailure({detail: [err.detail]}));
    }
};

const tryChangePasswordSaga = function* (action) {
    try {
        const {password} = action.payload;

        const changePasswordResponse = yield call(api.changePassword, password);

        if (changePasswordResponse) {
            console.log("changePasswordResponse", changePasswordResponse);

            if (changePasswordResponse.status === 200) {
                yield put(changePasswordSuccess(changePasswordResponse.responseBody));
            } else if (changePasswordResponse.status === 400) {
                console.log("Something wrong! Got a status 400", changePasswordResponse.responseBody);
                yield put(changePasswordFailure(changePasswordResponse.responseBody));
            } else {
                console.log("Something wrong! Got an unknown status.", changePasswordResponse);
                yield put(changePasswordFailure({detail: ["Unknown status. Check console!"]}));
            }
        } else {
            console.log("Change Password failed by api. No response !");
            yield put(changePasswordFailure({detail: ["No response fetched. Please contact the API team!"]}));
        }
    } catch (err) {
        console.log("Change Password failed by api. Error => ", err);
        yield put(changePasswordFailure({detail: [err.detail]}));
    }
};

const tryGetProjectsSaga = function* () {
    try {
        const getProjectsResponse = yield call(api.getProjects);

        if (getProjectsResponse) {
            console.log("getProjectsResponse", getProjectsResponse);

            if (getProjectsResponse.status === 200) {
                yield put(getProjectsSuccess(getProjectsResponse.responseBody));
            } else if (getProjectsResponse.status === 400) {
                console.log("Something wrong! Got a status 400", getProjectsResponse.responseBody);
                yield put(getProjectsFailure(getProjectsResponse.responseBody));
            } else {
                console.log("Something wrong! Got an unknown status.", getProjectsResponse);
                yield put(getProjectsFailure({detail: ["Unknown status. Check console!"]}));
            }
        } else {
            console.log("Get Projects failed by api. No response !");
            yield put(getProjectsFailure({detail: ["No response fetched. Please contact the API team!"]}));
        }
    } catch (err) {
        console.log("Get Projects failed by api. Error => ", err);
        yield put(getProjectsFailure({detail: [err.detail]}));
    }
};

const tryGetRecommendedProjectsSaga = function* (action) {
    try {
        const { user_id } = action.payload;

        const getRecommendedProjectsResponse = yield call(api.getRecommendedProjects, user_id);

        if (getRecommendedProjectsResponse) {
            console.log("getRecommendedProjectsResponse", getRecommendedProjectsResponse);

            if (getRecommendedProjectsResponse.status === 200) {
                yield put(getRecommendedProjectsSuccess(getRecommendedProjectsResponse.responseBody));
            } else if (getRecommendedProjectsResponse.status === 400) {
                console.log("Something wrong! Got a status 400", getRecommendedProjectsResponse.responseBody);
                yield put(getRecommendedProjectsFailure(getRecommendedProjectsResponse.responseBody));
            } else {
                console.log("Something wrong! Got an unknown status.", getRecommendedProjectsResponse);
                yield put(getRecommendedProjectsFailure({ detail: ["Unknown status. Check console!"] }));
            }
        } else {
            console.log("Get Projects failed by api. No response !");
            yield put(getRecommendedProjectsFailure({ detail: ["No response fetched. Please contact the API team!"] }));
        }
    } catch (err) {
        console.log("Get Projects failed by api. Error => ", err);
        yield put(getRecommendedProjectsFailure({ detail: [err.detail] }));
    }
};

const trySearchProjectsSaga = function* (action) {
    try {
        const { query } = action.payload;

        const searchProjectsResponse = yield call(api.searchProjects, query);

        if (searchProjectsResponse) {
            console.log("searchProjectsResponse", searchProjectsResponse);

            if (searchProjectsResponse.status === 200) {
                yield put(searchProjectsSuccess(searchProjectsResponse.responseBody));
            } else if (searchProjectsResponse.status === 400) {
                console.log("Something wrong! Got a status 400", searchProjectsResponse.responseBody);
                yield put(searchProjectsFailure(searchProjectsResponse.responseBody));
            } else {
                console.log("Something wrong! Got an unknown status.", searchProjectsResponse);
                yield put(searchProjectsFailure({ detail: ["Unknown status. Check console!"] }));
            }
        } else {
            console.log("Get Projects failed by api. No response !");
            yield put(searchProjectsFailure({ detail: ["No response fetched. Please contact the API team!"] }));
        }
    } catch (err) {
        console.log("Get Projects failed by api. Error => ", err);
        yield put(searchProjectsFailure({ detail: [err.detail] }));
    }
};

const tryGetProjectSaga = function* (action) {
    try {
        const { project_id } = action.payload;
        
        const getProjectResponse = yield call(api.getProject, project_id);

        if (getProjectResponse) {
            console.log("getProjectResponse", getProjectResponse);

            if (getProjectResponse.status === 200) {
                yield put(getProjectSuccess(getProjectResponse.responseBody));
            } else if (getProjectResponse.status === 400) {
                console.log("Something wrong! Got a status 400", getProjectResponse.responseBody);
                yield put(getProjectFailure(getProjectResponse.responseBody));
            } else {
                console.log("Something wrong! Got an unknown status.", getProjectResponse);
                yield put(getProjectFailure({ detail: ["Unknown status. Check console!"] }));
            }
        } else {
            console.log("Get Project failed by api. No response !");
            yield put(getProjectFailure({ detail: ["No response fetched. Please contact the API team!"] }));
        }
    } catch (err) {
        console.log("Get Project failed by api. Error => ", err);
        yield put(getProjectFailure({ detail: [err.detail] }));
    }
};

const tryGetOwnProjectsSaga = function* () {
    try {
        const getOwnProjectsResponse = yield call(api.getOwnProjects);

        if (getOwnProjectsResponse) {
            console.log("getOwnProjectsResponse", getOwnProjectsResponse);

            if (getOwnProjectsResponse.status === 200) {
                yield put(getOwnProjectsSuccess(getOwnProjectsResponse.responseBody));
            } else if (getOwnProjectsResponse.status === 400) {
                console.log("Something wrong! Got a status 400", getOwnProjectsResponse.responseBody);
                yield put(getOwnProjectsFailure(getOwnProjectsResponse.responseBody));
            } else {
                console.log("Something wrong! Got an unknown status.", getOwnProjectsResponse);
                yield put(getOwnProjectsFailure({ detail: ["Unknown status. Check console!"] }));
            }
        } else {
            console.log("Get Projects failed by api. No response !");
            yield put(getOwnProjectsFailure({ detail: ["No response fetched. Please contact the API team!"] }));
        }
    } catch (err) {
        console.log("Get Projects failed by api. Error => ", err);
        yield put(getOwnProjectsFailure({ detail: [err.detail] }));
    }
};

const tryCreateProjectSaga = function* (action) {
    try {
        const { title, description, project_deadline, budget, milestones, tags } = action.payload;

        const createProjectResponse = yield call(api.createProject, title, description, project_deadline, budget, milestones, tags);

        if (createProjectResponse) {
            console.log("createProjectResponse", createProjectResponse);

            if (createProjectResponse.status === 200) {
                yield put(createProjectSuccess(createProjectResponse.responseBody));
            } else if (createProjectResponse.status === 400) {
                console.log("Something wrong! Got a status 400", createProjectResponse.responseBody);
                yield put(createProjectFailure(createProjectResponse.responseBody));
            } else {
                console.log("Something wrong! Got an unknown status.", createProjectResponse);
                yield put(createProjectFailure({detail: ["Unknown status. Check console!"]}));
            }
        } else {
            console.log("Create Project failed by api. No response !");
            yield put(createProjectFailure({detail: ["No response fetched. Please contact the API team!"]}));
        }
    } catch (err) {
        console.log("Create Project failed by api. Error => ", err);
        yield put(createProjectFailure({detail: [err.detail]}));
    }
};

const tryEditProjectSaga = function* (action) {
    try {
        const { project_id, description, milestones, title, budget } = action.payload;

        const editProjectResponse = yield call(api.editProject, project_id, description, milestones, title, budget);

        if (editProjectResponse) {
            console.log("editProjectResponse", editProjectResponse);

            if (editProjectResponse.status === 200) {
                yield put(editProjectSuccess(editProjectResponse.responseBody));
            } else if (editProjectResponse.status === 400) {
                console.log("Something wrong! Got a status 400", editProjectResponse.responseBody);
                yield put(editProjectFailure(editProjectResponse.responseBody));
            } else {
                console.log("Something wrong! Got an unknown status.", editProjectResponse);
                yield put(editProjectFailure({ detail: ["Unknown status. Check console!"] }));
            }
        } else {
            console.log("edit Project failed by api. No response !");
            yield put(editProjectFailure({ detail: ["No response fetched. Please contact the API team!"] }));
        }
    } catch (err) {
        console.log("edit Project failed by api. Error => ", err);
        yield put(editProjectFailure({ detail: [err.detail] }));
    }
};


const tryDiscardProjectSaga = function* (action) {
    try {
        const { project_id } = action.payload;

        const discardProjectResponse = yield call(api.discardProject, project_id);

        if (discardProjectResponse) {
            console.log("discardProjectResponse", discardProjectResponse);

            if (discardProjectResponse.status === 200) {
                yield put(discardProjectSuccess(discardProjectResponse.responseBody));
            } else if (discardProjectResponse.status === 400) {
                console.log("Something wrong! Got a status 400", discardProjectResponse.responseBody);
                yield put(discardProjectFailure(discardProjectResponse.responseBody));
            } else {
                console.log("Something wrong! Got an unknown status.", discardProjectResponse);
                yield put(discardProjectFailure({ detail: ["Unknown status. Check console!"] }));
            }
        } else {
            console.log("discard Project failed by api. No response !");
            yield put(discardProjectFailure({ detail: ["No response fetched. Please contact the API team!"] }));
        }
    } catch (err) {
        console.log("discard Project failed by api. Error => ", err);
        yield put(discardProjectFailure({ detail: [err.detail] }));
    }
};

const tryFinishProjectSaga = function* (action) {
    try {
        const { project_id } = action.payload;

        const finishProjectResponse = yield call(api.finishProject, project_id);

        if (finishProjectResponse) {
            console.log("finishProjectResponse", finishProjectResponse);

            if (finishProjectResponse.status === 200) {
                yield put(finishProjectSuccess(finishProjectResponse.responseBody));
            } else if (finishProjectResponse.status === 400) {
                console.log("Something wrong! Got a status 400", finishProjectResponse.responseBody);
                yield put(finishProjectFailure(finishProjectResponse.responseBody));
            } else {
                console.log("Something wrong! Got an unknown status.", finishProjectResponse);
                yield put(finishProjectFailure({ detail: ["Unknown status. Check console!"] }));
            }
        } else {
            console.log("finish Project failed by api. No response !");
            yield put(finishProjectFailure({ detail: ["No response fetched. Please contact the API team!"] }));
        }
    } catch (err) {
        console.log("finish Project failed by api. Error => ", err);
        yield put(finishProjectFailure({ detail: [err.detail] }));
    }
};

const tryRateProjectSaga = function* (action) {
    try {
        const { project_id, comment, value } = action.payload;

        const rateProjectResponse = yield call(api.rateProject, project_id, comment, value);

        if (rateProjectResponse) {
            console.log("rateProjectResponse", rateProjectResponse);

            if (rateProjectResponse.status === 200) {
                yield put(rateProjectSuccess(rateProjectResponse.responseBody));
            } else if (rateProjectResponse.status === 400) {
                console.log("Something wrong! Got a status 400", rateProjectResponse.responseBody);
                yield put(rateProjectFailure(rateProjectResponse.responseBody));
            } else {
                console.log("Something wrong! Got an unknown status.", rateProjectResponse);
                yield put(rateProjectFailure({ detail: ["Unknown status. Check console!"] }));
            }
        } else {
            console.log("rate Project failed by api. No response !");
            yield put(rateProjectFailure({ detail: ["No response fetched. Please contact the API team!"] }));
        }
    } catch (err) {
        console.log("rate Project failed by api. Error => ", err);
        yield put(rateProjectFailure({ detail: [err.detail] }));
    }
};

const tryDeleteProjectSaga = function* (action) {
    try {
        const { project_id } = action.payload;

        const deleteProjectResponse = yield call(api.deleteProject, project_id);

        if (deleteProjectResponse) {
            console.log("deleteProjectResponse", deleteProjectResponse);

            if (deleteProjectResponse.status === 200) {
                yield put(deleteProjectSuccess(deleteProjectResponse.responseBody));
            } else if (deleteProjectResponse.status === 400) {
                console.log("Something wrong! Got a status 400", deleteProjectResponse.responseBody);
                yield put(deleteProjectFailure(deleteProjectResponse.responseBody));
            } else {
                console.log("Something wrong! Got an unknown status.", deleteProjectResponse);
                yield put(deleteProjectFailure({ detail: ["Unknown status. Check console!"] }));
            }
        } else {
            console.log("delete Project failed by api. No response !");
            yield put(deleteProjectFailure({ detail: ["No response fetched. Please contact the API team!"] }));
        }
    } catch (err) {
        console.log("delete Project failed by api. Error => ", err);
        yield put(deleteProjectFailure({ detail: [err.detail] }));
    }
};

const tryCreateBidSaga = function* (action) {
    try {
        const { project_id, freelancer_id, offer, note } = action.payload;

        const createBidResponse = yield call(api.createBid, project_id, freelancer_id, offer, note);

        if (createBidResponse) {
            console.log("createBidResponse", createBidResponse);

            if (createBidResponse.status === 200) {
                yield put(createBidSuccess(createBidResponse.responseBody));
            } else if (createBidResponse.status === 400) {
                console.log("Something wrong! Got a status 400", createBidResponse.responseBody);
                yield put(createBidFailure(createBidResponse.responseBody));
            } else {
                console.log("Something wrong! Got an unknown status.", createBidResponse);
                yield put(createBidFailure({ detail: ["Unknown status. Check console!"] }));
            }
        } else {
            console.log("Create Bid failed by api. No response !");
            yield put(createBidFailure({ detail: ["No response fetched. Please contact the API team!"] }));
        }
    } catch (err) {
        console.log("Create Bid failed by api. Error => ", err);
        yield put(createBidFailure({ detail: [err.detail] }));
    }
};

const tryAcceptBidSaga = function* (action) {
    try {
        const { bid_id } = action.payload;

        const acceptBidResponse = yield call(api.acceptBid, bid_id);

        if (acceptBidResponse) {
            console.log("acceptBidResponse", acceptBidResponse);

            if (acceptBidResponse.status === 200) {
                yield put(acceptBidSuccess(acceptBidResponse.responseBody));
            } else if (acceptBidResponse.status === 400) {
                console.log("Something wrong! Got a status 400", acceptBidResponse.responseBody);
                yield put(acceptBidFailure(acceptBidResponse.responseBody));
            } else {
                console.log("Something wrong! Got an unknown status.", acceptBidResponse);
                yield put(acceptBidFailure({ detail: ["Unknown status. Check console!"] }));
            }
        } else {
            console.log("accept Bid failed by api. No response !");
            yield put(acceptBidFailure({ detail: ["No response fetched. Please contact the API team!"] }));
        }
    } catch (err) {
        console.log("accept Bid failed by api. Error => ", err);
        yield put(acceptBidFailure({ detail: [err.detail] }));
    }
};

const tryDiscardBidSaga = function* (action) {
    try {
        const { bid_id } = action.payload;

        const discardBidResponse = yield call(api.discardBid, bid_id);

        if (discardBidResponse) {
            console.log("discardBidResponse", discardBidResponse);

            if (discardBidResponse.status === 200) {
                yield put(discardBidSuccess(discardBidResponse.responseBody));
            } else if (discardBidResponse.status === 400) {
                console.log("Something wrong! Got a status 400", discardBidResponse.responseBody);
                yield put(discardBidFailure(discardBidResponse.responseBody));
            } else {
                console.log("Something wrong! Got an unknown status.", discardBidResponse);
                yield put(discardBidFailure({ detail: ["Unknown status. Check console!"] }));
            }
        } else {
            console.log("discard Bid failed by api. No response !");
            yield put(discardBidFailure({ detail: ["No response fetched. Please contact the API team!"] }));
        }
    } catch (err) {
        console.log("discard Bid failed by api. Error => ", err);
        yield put(discardBidFailure({ detail: [err.detail] }));
    }
};

const tryGetPortfolioSaga = function* (action) {
    try {
        const { portfolio_id } = action.payload;

        const getPortfolioResponse = yield call(api.getPortfolio, portfolio_id);

        if (getPortfolioResponse) {
            console.log("getPortfolioResponse", getPortfolioResponse);

            if (getPortfolioResponse.status === 200) {
                yield put(getPortfolioSuccess(getPortfolioResponse.responseBody));
            } else if (getPortfolioResponse.status === 400) {
                console.log("Something wrong! Got a status 400", getPortfolioResponse.responseBody);
                yield put(getPortfolioFailure(getPortfolioResponse.responseBody));
            } else {
                console.log("Something wrong! Got an unknown status.", getPortfolioResponse);
                yield put(getPortfolioFailure({ detail: ["Unknown status. Check console!"] }));
            }
        } else {
            console.log("get Portfolio failed by api. No response !");
            yield put(getPortfolioFailure({ detail: ["No response fetched. Please contact the API team!"] }));
        }
    } catch (err) {
        console.log("get Portfolio failed by api. Error => ", err);
        yield put(getPortfolioFailure({ detail: [err.detail] }));
    }
};

const tryDeletePortfolioSaga = function* (action) {
    try {
        const { portfolio_id } = action.payload;

        const deletePortfolioResponse = yield call(api.deletePortfolio, portfolio_id);

        if (deletePortfolioResponse) {
            console.log("deletePortfolioResponse", deletePortfolioResponse);

            if (deletePortfolioResponse.status === 200) {
                yield put(deletePortfolioSuccess(deletePortfolioResponse.responseBody));
            } else if (deletePortfolioResponse.status === 400) {
                console.log("Something wrong! Got a status 400", deletePortfolioResponse.responseBody);
                yield put(deletePortfolioFailure(deletePortfolioResponse.responseBody));
            } else {
                console.log("Something wrong! Got an unknown status.", deletePortfolioResponse);
                yield put(deletePortfolioFailure({ detail: ["Unknown status. Check console!"] }));
            }
        } else {
            console.log("delete Portfolio failed by api. No response !");
            yield put(deletePortfolioFailure({ detail: ["No response fetched. Please contact the API team!"] }));
        }
    } catch (err) {
        console.log("delete Portfolio failed by api. Error => ", err);
        yield put(deletePortfolioFailure({ detail: [err.detail] }));
    }
};

const tryPostPortfolioSaga = function* (action) {
    try {
        const { title, description, date, project_id, tags } = action.payload;

        const postPortfolioResponse = yield call(api.postPortfolio, title, description, date, project_id, tags);

        if (postPortfolioResponse) {
            console.log("postPortfolioResponse", postPortfolioResponse);

            if (postPortfolioResponse.status === 200) {
                yield put(postPortfolioSuccess(postPortfolioResponse.responseBody));
            } else if (postPortfolioResponse.status === 400) {
                console.log("Something wrong! Got a status 400", postPortfolioResponse.responseBody);
                yield put(postPortfolioFailure(postPortfolioResponse.responseBody));
            } else {
                console.log("Something wrong! Got an unknown status.", postPortfolioResponse);
                yield put(postPortfolioFailure({ detail: ["Unknown status. Check console!"] }));
            }
        } else {
            console.log("post Portfolio failed by api. No response !");
            yield put(postPortfolioFailure({ detail: ["No response fetched. Please contact the API team!"] }));
        }
    } catch (err) {
        console.log("post Portfolio failed by api. Error => ", err);
        yield put(postPortfolioFailure({ detail: [err.detail] }));
    }
};

const tryPutPortfolioSaga = function* (action) {
    try {
        const { portfolio_id, title, description, date, project_id } = action.payload;

        const putPortfolioResponse = yield call(api.putPortfolio, portfolio_id, title, description, date, project_id);

        if (putPortfolioResponse) {
            console.log("putPortfolioResponse", putPortfolioResponse);

            if (putPortfolioResponse.status === 200) {
                yield put(putPortfolioSuccess(putPortfolioResponse.responseBody));
            } else if (putPortfolioResponse.status === 400) {
                console.log("Something wrong! Got a status 400", putPortfolioResponse.responseBody);
                yield put(putPortfolioFailure(putPortfolioResponse.responseBody));
            } else {
                console.log("Something wrong! Got an unknown status.", putPortfolioResponse);
                yield put(putPortfolioFailure({ detail: ["Unknown status. Check console!"] }));
            }
        } else {
            console.log("put Portfolio failed by api. No response !");
            yield put(putPortfolioFailure({ detail: ["No response fetched. Please contact the API team!"] }));
        }
    } catch (err) {
        console.log("put Portfolio failed by api. Error => ", err);
        yield put(putPortfolioFailure({ detail: [err.detail] }));
    }
};

const tryPutWalletSaga = function* (action) {
    try {
        const { deposit, withdraw } = action.payload;

        const putWalletResponse = yield call(api.putWallet, deposit, withdraw);

        if (putWalletResponse) {
            console.log("putWalletResponse", putWalletResponse);

            if (putWalletResponse.status === 200) {
                yield put(putWalletSuccess(putWalletResponse.responseBody));
            } else if (putWalletResponse.status === 400) {
                console.log("Something wrong! Got a status 400", putWalletResponse.responseBody);
                yield put(putWalletFailure(putWalletResponse.responseBody));
            } else {
                console.log("Something wrong! Got an unknown status.", putWalletResponse);
                yield put(putWalletFailure({ detail: ["Unknown status. Check console!"] }));
            }
        } else {
            console.log("put Wallet failed by api. No response !");
            yield put(putWalletFailure({ detail: ["No response fetched. Please contact the API team!"] }));
        }
    } catch (err) {
        console.log("put Wallet failed by api. Error => ", err);
        yield put(putWalletFailure({ detail: [err.detail] }));
    }
};

const tryGetTagsSaga = function* (action) {
    try {
        const { tags } = action.payload;

        const getTagsResponse = yield call(api.getTags, tags);

        if (getTagsResponse) {
            console.log("getTagsResponse", getTagsResponse);

            if (getTagsResponse.status === 200) {
                yield put(getTagSuccess(getTagsResponse.responseBody));
            } else if (getTagsResponse.status === 400) {
                console.log("Something wrong! Got a status 400", getTagsResponse.responseBody);
                yield put(getTagFailure(getTagsResponse.responseBody));
            } else {
                console.log("Something wrong! Got an unknown status.", getTagsResponse);
                yield put(getTagFailure({ detail: ["Unknown status. Check console!"] }));
            }
        } else {
            console.log("Get Project failed by api. No response !");
            yield put(getTagFailure({ detail: ["No response fetched. Please contact the API team!"] }));
        }
    } catch (err) {
        console.log("Get Project failed by api. Error => ", err);
        yield put(getTagFailure({ detail: [err.detail] }));
    }
};

const tryGetConversationsSaga = function* () {
    try {
        const getConversationsResponse = yield call(api.getConversations);

        if (getConversationsResponse) {
            console.log("getConversationsResponse", getConversationsResponse);

            if (getConversationsResponse.status === 200) {
                yield put(conversationsSuccess(getConversationsResponse.responseBody));
            } else if (getConversationsResponse.status === 400) {
                console.log("Something wrong! Got a status 400", getConversationsResponse.responseBody);
                yield put(conversationsFailure(getConversationsResponse.responseBody));
            } else {
                console.log("Something wrong! Got an unknown status.", getConversationsResponse);
                yield put(conversationsFailure({ detail: ["Unknown status. Check console!"] }));
            }
        } else {
            console.log("Get Profile failed by api. No response !");
            yield put(conversationsFailure({ detail: ["No response fetched. Please contact the API team!"] }));
        }
    } catch (err) {
        console.log("Get Profile failed by api. Error => ", err);
        yield put(conversationsFailure({ detail: [err.detail] }));
    }
};

const tryGetConversationSaga = function* (action) {
    try {
        const { user_id } = action.payload;

        const getConversationResponse = yield call(api.getConversation, user_id);

        if (getConversationResponse) {
            console.log("getConversationResponse", getConversationResponse);

            if (getConversationResponse.status === 200) {
                yield put(conversationSuccess(getConversationResponse.responseBody));
            } else if (getConversationResponse.status === 400) {
                console.log("Something wrong! Got a status 400", getConversationResponse.responseBody);
                yield put(conversationFailure(getConversationResponse.responseBody));
            } else {
                console.log("Something wrong! Got an unknown status.", getConversationResponse);
                yield put(conversationFailure({ detail: ["Unknown status. Check console!"] }));
            }
        } else {
            console.log("Get Profile failed by api. No response !");
            yield put(conversationFailure({ detail: ["No response fetched. Please contact the API team!"] }));
        }
    } catch (err) {
        console.log("Get Profile failed by api. Error => ", err);
        yield put(conversationFailure({ detail: [err.detail] }));
    }
};

const trySendMessageSaga = function* (action) {
    try {
        const { user_id, message } = action.payload;

        const sendMessageResponse = yield call(api.sendMessage, user_id, message);

        if (sendMessageResponse) {
            console.log("sendMessageResponse", sendMessageResponse);

            if (sendMessageResponse.status === 200) {
                yield put(sendMessageSuccess(sendMessageResponse.responseBody));
            } else if (sendMessageResponse.status === 400) {
                console.log("Something wrong! Got a status 400", sendMessageResponse.responseBody);
                yield put(sendMessageFailure(sendMessageResponse.responseBody));
            } else {
                console.log("Something wrong! Got an unknown status.", sendMessageResponse);
                yield put(sendMessageFailure({ detail: ["Unknown status. Check console!"] }));
            }
        } else {
            console.log("Get Profile failed by api. No response !");
            yield put(sendMessageFailure({ detail: ["No response fetched. Please contact the API team!"] }));
        }
    } catch (err) {
        console.log("Get Profile failed by api. Error => ", err);
        yield put(sendMessageFailure({ detail: [err.detail] }));
    }
};

const tryCreateAnnotationSaga = function* (action) {
    try {
        const { url, motivation, targets, body } = action.payload;

        const createAnnotationResponse = yield call(api.createAnnotation, url, motivation, targets, body);

        if (createAnnotationResponse) {
            console.log("createAnnotationResponse", createAnnotationResponse);

            if (createAnnotationResponse.status === 200) {
                yield put(createAnnotationSuccess(createAnnotationResponse.responseBody));
            } else if (createAnnotationResponse.status === 400) {
                console.log("Something wrong! Got a status 400", createAnnotationResponse.responseBody);
                yield put(createAnnotationFailure(createAnnotationResponse.responseBody));
            } else {
                console.log("Something wrong! Got an unknown status.", createAnnotationResponse);
                yield put(createAnnotationFailure({ detail: ["Unknown status. Check console!"] }));
            }
        } else {
            console.log("Create Project failed by api. No response !");
            yield put(createAnnotationFailure({ detail: ["No response fetched. Please contact the API team!"] }));
        }
    } catch (err) {
        console.log("Create Project failed by api. Error => ", err);
        yield put(createAnnotationFailure({ detail: [err.detail] }));
    }
};

const tryGetRecommendedUsersSaga = function* (action) {
    try {
        const { project_id } = action.payload;

        const getRecommendedUsersResponse = yield call(api.getRecommendedUsers, project_id);

        if (getRecommendedUsersResponse) {
            console.log("getRecommendedUsersResponse", getRecommendedUsersResponse);

            if (getRecommendedUsersResponse.status === 200) {
                yield put(getRecommendedUsersSuccess(getRecommendedUsersResponse.responseBody));
            } else if (getRecommendedUsersResponse.status === 400) {
                console.log("Something wrong! Got a status 400", getRecommendedUsersResponse.responseBody);
                yield put(getRecommendedUsersFailure(getRecommendedUsersResponse.responseBody));
            } else {
                console.log("Something wrong! Got an unknown status.", getRecommendedUsersResponse);
                yield put(getRecommendedUsersFailure({ detail: ["Unknown status. Check console!"] }));
            }
        } else {
            console.log("Get Projects failed by api. No response !");
            yield put(getRecommendedUsersFailure({ detail: ["No response fetched. Please contact the API team!"] }));
        }
    } catch (err) {
        console.log("Get Projects failed by api. Error => ", err);
        yield put(getRecommendedUsersFailure({ detail: [err.detail] }));
    }
};

const tryGetAnnotationsSaga = function* (action) {
    try {
        const { url } = action.payload;

        const getAnnotationsResponse = yield call(api.getAnnotations, url);

        if (getAnnotationsResponse) {
            console.log("getAnnotationsResponse", getAnnotationsResponse);

            if (getAnnotationsResponse.status === 200) {
                yield put(getAnnotationsSuccess(getAnnotationsResponse.responseBody));
            } else if (getAnnotationsResponse.status === 400) {
                console.log("Something wrong! Got a status 400", getAnnotationsResponse.responseBody);
                yield put(getAnnotationsFailure(getAnnotationsResponse.responseBody));
            } else {
                console.log("Something wrong! Got an unknown status.", getAnnotationsResponse);
                yield put(getAnnotationsFailure({ detail: ["Unknown status. Check console!"] }));
            }
        } else {
            console.log("Create Project failed by api. No response !");
            yield put(getAnnotationsFailure({ detail: ["No response fetched. Please contact the API team!"] }));
        }
    } catch (err) {
        console.log("Create Project failed by api. Error => ", err);
        yield put(getAnnotationsFailure({ detail: [err.detail] }));
    }
};


const saga = function* () {
    // AUTH
    yield takeLatest(LOGIN_REQUEST, tryLoginSaga);
    yield takeLatest(REGISTER_REQUEST, tryRegisterSaga);
    yield takeLatest(LOGOUT_REQUEST, tryLogout);

    // USER
    yield takeLatest(GET_PROFILE_REQUEST, tryGetProfileSaga);
    yield takeLatest(GET_CONVERSATIONS_REQUEST, tryGetConversationsSaga);
    yield takeLatest(GET_CONVERSATION_REQUEST, tryGetConversationSaga);
    yield takeLatest(SEND_MESSAGE_REQUEST, trySendMessageSaga);
    yield takeLatest(GET_USER_PROFILE_REQUEST, tryGetUserProfileSaga);
    yield takeLatest(UPDATE_PROFILE_REQUEST, tryUpdateProfileSaga);
    yield takeLatest(CHANGE_PASSWORD_REQUEST, tryChangePasswordSaga);
    yield takeLatest(PUT_WALLET_REQUEST, tryPutWalletSaga);

    // PROJECTS
    yield takeLatest(GET_PROJECTS_REQUEST, tryGetProjectsSaga);
    yield takeLatest(GET_RECOMMENDED_PROJECTS_REQUEST, tryGetRecommendedProjectsSaga);
    yield takeLatest(SEARCH_PROJECTS_REQUEST, trySearchProjectsSaga);
    yield takeLatest(GET_PROJECT_REQUEST, tryGetProjectSaga);
    yield takeLatest(GET_OWN_PROJECTS_REQUEST, tryGetOwnProjectsSaga);
    yield takeLatest(CREATE_PROJECT_REQUEST, tryCreateProjectSaga);
    yield takeLatest(EDIT_PROJECT_REQUEST, tryEditProjectSaga);
    yield takeLatest(DISCARD_PROJECT_REQUEST, tryDiscardProjectSaga);
    yield takeLatest(FINISH_PROJECT_REQUEST, tryFinishProjectSaga);
    yield takeLatest(RATE_PROJECT_REQUEST, tryRateProjectSaga);
    yield takeLatest(DELETE_PROJECT_REQUEST, tryDeleteProjectSaga);
    yield takeLatest(CREATE_ANNOTATION_REQUEST, tryCreateAnnotationSaga);
    yield takeLatest(GET_ANNOTATIONS_REQUEST, tryGetAnnotationsSaga);
    yield takeLatest(GET_RECOMMENDED_USERS_REQUEST, tryGetRecommendedUsersSaga);

    // TAGS
    yield takeLatest(GET_TAG_REQUEST, tryGetTagsSaga);

    // BIDS
    yield takeLatest(CREATE_BID_REQUEST, tryCreateBidSaga);
    yield takeLatest(DISCARD_BID_REQUEST, tryDiscardBidSaga);
    yield takeLatest(ACCEPT_BID_REQUEST, tryAcceptBidSaga);

    // PORTFOLIO
    yield takeLatest(GET_PORTFOLIO_REQUEST, tryGetPortfolioSaga);
    yield takeLatest(POST_PORTFOLIO_REQUEST, tryPostPortfolioSaga);
    yield takeLatest(PUT_PORTFOLIO_REQUEST, tryPutPortfolioSaga);
    yield takeLatest(DELETE_PORTFOLIO_REQUEST, tryDeletePortfolioSaga);
};

export default saga;
