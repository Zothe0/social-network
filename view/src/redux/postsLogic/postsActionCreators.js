import * as types from './postsTypes'

export const changePostField= (payload)=>{
    return({ type: types.CHANGE_POST_FIELD, payload })
}
export const clearPostField = ()=>{
    return({ type: types.CLEAR_POST_FIELD })
}
export const updatePostList = (payload)=>{
    return({ type: types.UPDATE_POST_LIST, payload })
}
export const setLoadingTrue = ()=>{
    return({ type: types.SET_LOADING_TRUE })
}
export const setLoadingFalse = ()=>{
    return({ type: types.SET_LOADING_FALSE })
}