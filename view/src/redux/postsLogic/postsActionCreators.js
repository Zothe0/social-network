import * as types from './postsTypes'

export const changePostField= (payload)=>{
    return({ type: types.CHANGE_POST_FIELD, payload })
}
export const clearPostField = ()=>{
    return({ type: types.CLEAR_POST_FIELD })
}