import * as types from './postsTypes'

const initialState = {
    postField: '',
    uploadedPosts:[

    ],
    loading: false
}

export default function postsReducer(state = initialState, action){
    switch(action.type){
        case types.CHANGE_POST_FIELD:
            return({...state, postField: action.payload})

        case types.CLEAR_POST_FIELD:
            return({ ...state, postField: '' })

        case types.UPDATE_POST_LIST:
            return({ ...state, uploadedPosts: [...state.uploadedPosts, ...action.payload] })

        case types.CLEAR_POST_LIST:
            return({ ...state, uploadedPosts: []})

        case types.SET_LOADING_TRUE:
            return({ ...state, loading: true})

        case types.SET_LOADING_FALSE:
            return({ ...state, loading: false })

        default:
            return state
    }
}