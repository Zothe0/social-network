import { call, put, select } from 'redux-saga/effects'
import { request } from '../Api'
import {
    setLoadingFalse,
    setLoadingTrue,
    updatePostList,
    clearPostList,
} from '../postsLogic/postsActionCreators'

export function* publishPost() {
    try {
        const posts = yield select(state => state.postsReducer)
        const auth = yield select(state => state.authReducer)
        const date = Date.now()
        let body = {
            text: posts.postField,
            date: date,
            avatarUrl: auth.avatarUrl,
            author: auth.nickName,
        }
        const response = yield call(request, '/api/posts/create', 'POST', body)
        if (response.ok) {
            const nickName = yield select(state => state.authReducer.nickName)
            body = { nickName, loadedPostsQuantity: 0 }
            const update = yield call(
                request,
                '/api/posts/upload',
                'POST',
                body
            )
            yield put(clearPostList())
            yield put(updatePostList(update))
        } else {
        }
    } catch (error) {
        // throw error
    }
}

export function* uploadPosts() {
    yield put(setLoadingTrue())
    try {
        const posts = yield select(state => state.postsReducer)
        const nickName = yield select(state => state.authReducer.nickName)
        const body = {
            nickName,
            loadedPostsQuantity: posts.uploadedPosts.length,
        }
        const response = yield call(request, '/api/posts/upload', 'POST', body)
        yield put(updatePostList(response))
    } catch (error) {
        console.log(error.name)
        //    throw error
    }
    yield put(setLoadingFalse())
}

export function* likeChanging(action) {
    try {
        const body = {
            postId: action.postId,
            newLikes: action.newLikes,
        }
        const response = yield call(request, '/api/posts/like', 'PATCH', body)
        if (response.ok) {
        }
    } catch (error) {
        // throw error
    }
}

export function* checkNewPosts() {
    try {
        const currentLatestPostId = yield select(
            state => state.postsReducer.uploadedPosts[0]._id
        )
        const nickName = yield select(state => state.authReducer.nickName)
        const response = yield call(request, '/api/posts/check-new-posts')
        if (
            currentLatestPostId &&
            currentLatestPostId !== response.latestPostId
        ) {
            const body = { nickName, loadedPostsQuantity: 0 }
            const update = yield call(
                request,
                '/api/posts/upload',
                'POST',
                body
            )
            yield put(clearPostList())
            yield put(updatePostList(update))
        }
    } catch (error) {
        // throw error
    }
}
