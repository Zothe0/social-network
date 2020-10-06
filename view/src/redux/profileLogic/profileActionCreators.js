import * as types from './profileTypes'

export const setFileInput = (ref)=>{
    return({ type: types.SET_FILE_INPUT, ref })
}

export const setCurrentProfileAvatarUrl = (newAvatarUrl)=>{
    return({ type: types.SET_CURRENT_PROFILE_AVATAR_URL, newAvatarUrl })
}