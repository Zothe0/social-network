import { call, put, select } from 'redux-saga/effects'
import * as profileTypes from '../profileLogic/profileTypes'
import { request } from '../Api'
import {
    setAvatarUrl,
    setMessage,
} from '../authenticationLogic/authActionCreators'
import {
    setLoadingFalse,
    setLoadingTrue,
    updatePostList,
    clearPostList,
} from '../postsLogic/postsActionCreators'
import { setCurrentProfileAvatarUrl } from '../profileLogic/profileActionCreators'

export function* sendAvatarImage(action) {
    yield put(setLoadingTrue())
    const fileInput = yield select(state => state.profileReducer.fileInputRef)
    const nickName = yield select(state => state.authReducer.nickName)
    try {
        const response = yield call(
            request,
            '/api/profile/load-avatar',
            'POST',
            action.form,
            {}
        )
        if (response.ok) {
            yield put({
                type: profileTypes.UPLOAD_CURRENT_PROFILE_AVATAR_URL,
                nickName,
            })
            const body = {
                loadedPostsQuantity: 0,
            }
            const update = yield call(
                request,
                '/api/posts/upload',
                'POST',
                body
            )
            yield put(clearPostList())
            yield put(updatePostList(update))
        } else {
            yield put(setMessage(response.message))
        }
    } catch (error) {
        throw error
    }
    fileInput.value = null
    yield put(setLoadingFalse())
}

export function* uploadCurrentProfileAvatarUrl(action) {
    try {
        const body = {
            nickName: action.nickName,
        }
        const response = yield call(
            request,
            '/api/profile/avatar-url',
            'POST',
            body
        )
        if (response.ok) {
            const nickName = yield select(state => state.authReducer.nickName)
            if (nickName === action.nickName)
                yield put(setAvatarUrl(response.avatarUrl))
            yield put(setCurrentProfileAvatarUrl(response.avatarUrl))
        } else {
        }
    } catch (error) {
        throw error
    }
}
