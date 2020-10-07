import { call, put, select, takeLeading } from 'redux-saga/effects'
import * as authTypes from './authenticationLogic/authTypes'
import * as postsTypes from './postsLogic/postsTypes'
import * as profileTypes from './profileLogic/profileTypes'
import {request} from './Api'
import { authentication, clearInputs, clearPasswordInput, setMessage, setOnWarning } from './authenticationLogic/authActionCreators'
import { setLoadingFalse, setLoadingTrue, updatePostList, clearPostList } from './postsLogic/postsActionCreators'
import { setCurrentProfileAvatarUrl } from './profileLogic/profileActionCreators'


export default function* Saga() {
    yield takeLeading(authTypes.SEND_FORM, fetchForm)
    yield takeLeading(authTypes.LOGIN, login)
    yield takeLeading(postsTypes.PUBLISH_POST, publishPost)
    yield takeLeading(postsTypes.UPLOAD_POSTS, fetchPosts)
    yield takeLeading(profileTypes.SEND_AVATAR_IMAGE, sendAvatarImage)
    yield takeLeading(profileTypes.UPLOAD_CURRENT_PROFILE_AVATAR_URL, uploadCurrentProfileAvatarUrl)
}

// worker Saga: будет запускаться на экшены типа `USER_FETCH_REQUESTED`
function* fetchForm(action) {
    try {
        // call первым аргументом принимает функцию, а остальные будут складываться в парамтры вызываемой функции по соответсвию
       const response = yield call(request, '/api/auth/registration', 'POST', action.body)

       if(response.ok){
            const app = yield select(state => state.authReducer)
            const body={
                mix: app.formInputs.nickName,
                password: app.formInputs.password
            }
            yield put({ type: authTypes.LOGIN, body })
            yield put(clearInputs())
            yield put(setMessage(response.message))
        }else{
            if(response.fault){
                for(let i = 0; i < response.fault.length; i++){
                    yield put(setOnWarning(response.fault[i].param))
                }
            }else{
                yield put(setMessage(response.message))
            }
        }
    } catch (e) {
       throw e
    }
 }

 function* login(action){
     try {
        const response = yield call(request, '/api/auth/login', 'POST', action.body)

        if(response.ok){
            yield put(authentication(response.token, response.nickName))
            yield put(clearInputs())
        }else{
            yield put(clearPasswordInput())
        }
        yield put(setMessage(response.message))
     } catch (e) {
       throw e
     }
 }

 function* publishPost(){
     try {
        const posts = yield select(state => state.postsReducer)
        const auth = yield select(state => state.authReducer)
        const date = Date.now()
        const body = {
            text: posts.postField,
            date: date,
            author: auth.nickName
        }
        const response = yield call(request, '/api/posts/create', 'POST', body)
        if(response.ok){
            const body = {
                loadedPostsQuantity: 0
            }
            const update = yield call(request, 'api/posts/upload', 'POST', body)
            yield put(clearPostList())
            yield put(updatePostList(update))
        }else{}
     } catch (e) {
         throw e
     }
 }

 function* fetchPosts(){
    yield put(setLoadingTrue())
    try {
        const posts = yield select(state => state.postsReducer)
        const body = {
            loadedPostsQuantity: posts.uploadedPosts.length
        }
        const response = yield call(request, 'api/posts/upload', 'POST', body)
        yield put(updatePostList(response))
        yield put(setLoadingFalse())
    } catch (error) {
        console.log(error.name)
        yield put(setLoadingFalse())
        throw error
    }
 }

function* sendAvatarImage(action){
    yield put(setLoadingTrue())
    const fileInput = yield select(state => state.profileReducer.fileInputRef)
    const nickName = yield select(state => state.authReducer.nickName)
    try {
        const response = yield call(request, '/api/profile/load-avatar', 'POST', action.form, {})
        if(response.ok){
            yield put({ type: profileTypes.UPLOAD_CURRENT_PROFILE_AVATAR_URL, nickName })
        }
        else{
            yield put(setMessage(response.message))
        }
     } catch (error) {
        throw error
     }
     fileInput.value=null
    yield put(setLoadingFalse())
}

export function* uploadCurrentProfileAvatarUrl(action){
    try {
        const body = {
            nickName: action.nickName
        }
        const response = yield call(request, '/api/profile/avatar-url', 'POST', body)
        if(response.ok){
            yield put(setCurrentProfileAvatarUrl(response.avatarUrl))
        }
        else{}
    } catch (error) {
        throw error
    }
}