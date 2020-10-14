import * as types from './profileTypes'

const initialState = {
    fileInputRef: null,
    currentProfileAvatarUrl: null,
}

export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_FILE_INPUT:
            return { ...state, fileInputRef: action.ref }

        case types.SET_CURRENT_PROFILE_AVATAR_URL:
            return { ...state, currentProfileAvatarUrl: action.newAvatarUrl }

        default:
            return state
    }
}
