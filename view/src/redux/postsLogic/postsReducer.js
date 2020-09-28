import * as types from './postsTypes'

const initialState = {
    postField: '',
    uploadedPosts:[

    ]
}

export default function postsReducer(state = initialState, action){
    switch(action.type){
        case types.CHANGE_POST_FIELD:
            return({...state, postField: action.payload})

        case types.CLEAR_POST_FIELD:
            return({ ...state, postField: '' })

        default:
            return state
    }
}